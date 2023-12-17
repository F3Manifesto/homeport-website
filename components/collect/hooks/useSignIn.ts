import { useEffect, useState } from "react";
import { useSignMessage } from "wagmi";
import getDefaultProfile from "../../../graphql/lens/queries/default";
import generateChallenge from "../../../graphql/lens/queries/challenge";
import authenticate from "../../../graphql/lens/mutations/authenticate";
import { Dispatch } from "redux";
import { Profile } from "../../../graphql/generated";
import {
  getAuthenticationToken,
  isAuthExpired,
  refreshAuth,
  removeAuthenticationToken,
  setAuthenticationToken,
} from "../../../lib/utils";
import { setLensConnected } from "../../../redux/reducers/lensConnectedSlice";
import { setOracleData } from "../../../redux/reducers/oracleDataSlice";
import { getOracleData } from "../../../graphql/subgraph/queries/getOracleData";
import { setWalletConnected } from "../../../redux/reducers/walletConnectedSlice";
import { OracleData } from "../../../types/general.types";

const useSignIn = (
  address: `0x${string}` | undefined,
  isConnected: boolean,
  dispatch: Dispatch,
  oracleData: OracleData[],
  lensConnected: Profile | undefined,
  openAccountModal: (() => void) | undefined
) => {
  const { signMessageAsync } = useSignMessage();
  const [loginLoading, setLoginLoading] = useState<boolean>(false);

  const handleLensSignIn = async () => {
    setLoginLoading(true);
    try {
      const profile = await getDefaultProfile(
        {
          for: address,
        },
        lensConnected?.id
      );
      const challengeResponse = await generateChallenge({
        for: profile?.data?.defaultProfile?.id,
        signedBy: address,
      });
      const signature = await signMessageAsync({
        message: challengeResponse.data?.challenge.text!,
      });
      const accessTokens = await authenticate({
        id: challengeResponse.data?.challenge.id,
        signature: signature,
      });
      if (accessTokens) {
        setAuthenticationToken({ token: accessTokens.data?.authenticate! });
        dispatch(setLensConnected(profile?.data?.defaultProfile as Profile));
      }
    } catch (err: any) {
      console.error(err.message);
    }
    setLoginLoading(false);
  };

  const handleRefreshProfile = async (): Promise<void> => {
    try {
      const profile = await getDefaultProfile(
        {
          for: address,
        },
        lensConnected?.id
      );
      if (profile?.data?.defaultProfile) {
        dispatch(setLensConnected(profile?.data?.defaultProfile as Profile));
      } else {
        removeAuthenticationToken();
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    const handleAuthentication = async () => {
      const token = getAuthenticationToken();
      if (isConnected && !token) {
        dispatch(setLensConnected(undefined));
        removeAuthenticationToken();
      } else if (isConnected && token) {
        if (isAuthExpired(token?.exp)) {
          const refreshedAccessToken = await refreshAuth();
          if (!refreshedAccessToken) {
            removeAuthenticationToken();
          }
        }
        await handleRefreshProfile();
      }
    };

    handleAuthentication();
    dispatch(setWalletConnected(isConnected));
  }, [isConnected, address]);

  const handleOracles = async (): Promise<void> => {
    try {
      const data = await getOracleData();

      dispatch(setOracleData((data as any)?.data?.currencyAddeds));
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const handleLogout = () => {
    if (openAccountModal) {
      openAccountModal();
    }
    dispatch(setLensConnected(undefined));
    removeAuthenticationToken();
  };

  useEffect(() => {
    if (!oracleData || oracleData?.length < 1) {
      handleOracles();
    }
  }, []);

  useEffect(() => {
    if (!isConnected) {
      dispatch(setLensConnected(undefined));
    }
  }, [isConnected]);

  return {
    handleLensSignIn,
    loginLoading,
    handleLogout,
  };
};

export default useSignIn;
