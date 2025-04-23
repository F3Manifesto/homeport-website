import { useContext, useState } from "react";
import { evmAddress } from "@lens-protocol/client";
import { createWalletClient, custom } from "viem";
import { chains } from "@lens-chain/sdk/viem";
import {
  createAccountWithUsername,
  fetchAccount,
} from "@lens-protocol/client/actions";
import pollResult from "@/app/lib/helpers/pollResult";
import { immutable } from "@lens-chain/storage-client";
import { ModalContext } from "@/app/providers";
import { account as accountMeta } from "@lens-protocol/metadata";
import { useAccount } from "wagmi";

const useCrearCuenta = (dict: any) => {
  const { address } = useAccount();
  const contexto = useContext(ModalContext);
  const [account, setAccount] = useState<{
    localname: string;
    bio: string;
    username: string;
    pfp?: Blob;
  }>({
    localname: "",
    bio: "",
    username: "",
  });
  const [accountLoading, setAccountLoading] = useState<boolean>(false);

  const handleCreateAccount = async () => {
    if (!address || !contexto?.lensConectado?.sessionClient) return;
    setAccountLoading(true);
    try {
      const signer = createWalletClient({
        chain: chains.mainnet,
        transport: custom(window.ethereum!),
        account: address,
      });

      let picture = undefined;
      const acl = immutable(chains.mainnet.id);
      if (account?.pfp) {
        const res = await fetch("/api/ipfs", {
          method: "POST",
          body: account?.pfp,
        });

        const json = await res.json();

        picture = "ipfs://" + json?.cid;
      }

      const { uri } = await contexto?.storageClient?.uploadAsJson(
        accountMeta({
          name: account?.localname,
          bio: account?.bio,
          picture,
        }),

        { acl }
      );

      const authenticatedOnboarding = await contexto?.lensClient?.login({
        onboardingUser: {
          wallet: signer.account.address,
        },
        signMessage: (message) => signer.signMessage({ message }),
      });

      if (!authenticatedOnboarding?.isOk()) {
        console.error((authenticatedOnboarding as any)?.error);
        contexto?.setNotification?.(dict?.common?.error);

        setAccountLoading(false);
        return;
      }

      const accountResponse = await createAccountWithUsername(
        authenticatedOnboarding?.value,
        {
          accountManager: [evmAddress(signer.account.address)],
          username: {
            localName: account?.username,
          },
          metadataUri: uri,
        }
      );
      if (accountResponse.isErr()) {
        setAccountLoading(false);
        contexto?.setNotification(dict?.common?.error);
        return;
      }

      if (
        (accountResponse.value as any)?.reason?.includes(
          "Username already taken"
        )
      ) {
        contexto?.setNotification(dict?.common?.taken);
        setAccountLoading(false);
        return;
      }

      if ((accountResponse.value as any)?.hash) {
        const res = await pollResult(
          (accountResponse.value as any)?.hash,
          contexto?.lensConectado?.sessionClient
        );
        if (res) {
          const newAcc = await fetchAccount(
            contexto?.lensConectado?.sessionClient,
            {
              username: {
                localName: account?.username,
              },
            }
          );
          if (newAcc.isErr()) {
            setAccountLoading(false);
            return;
          }
          if (newAcc.value?.address) {
            const ownerSigner =
              await contexto?.lensConectado?.sessionClient?.switchAccount({
                account: newAcc.value?.address,
              });
            if (ownerSigner?.isOk()) {
              contexto?.setLensConectado?.({
                ...contexto?.lensConectado,
                profile: newAcc.value,
                sessionClient: ownerSigner?.value,
              });
              contexto?.setCreateAccount(false);
              setAccount({
                localname: "",
                bio: "",
                username: "",
              });
            }
          } else {
            console.error(accountResponse);
            contexto?.setNotification?.(dict?.common?.fetch);
            setAccountLoading(false);
            return;
          }
        } else {
          console.error(accountResponse);
          contexto?.setNotification?.(dict?.common?.createAccount);
          setAccountLoading(false);
          return;
        }
      } else {
        console.error(accountResponse);
        contexto?.setNotification?.(dict?.common?.createAccount);
        setAccountLoading(false);
        return;
      }
    } catch (err: any) {
      console.error(err.message);
    }
    setAccountLoading(false);
  };

  return {
    account,
    setAccount,
    accountLoading,
    handleCreateAccount,
  };
};

export default useCrearCuenta;
