import Image from "next/legacy/image";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { BsSearch } from "react-icons/bs";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  return (
    <div className="bg-black relative w-full h-auto grid grid-flow-col auto-cols-[auto auto] p-10 pb-4">
      <div className="relative w-fit h-fit col-start-1 grid grid-flow-col auto-cols-[auto auto] font-awkward text-white gap-4">
        <Link
          href="/"
          className="relative w-fit h-fit col-start-1 place-self-center grid grid-flow-col auto-cols-[auto auto]"
        >
          <Image
            src={"/images/logo.png"}
            width={50}
            height={50}
            className="relative w-fit h-fit col-start-1 cursor-pointer"
          />
        </Link>
        <div className="relative w-fit h-fit col-start-2 place-self-center grid grid-flow-col auto-cols-[auto auto] pl-10">
          <div className="relative w-fit h-fit col-start-1 place-self-center text-4xl cursor-pointer">
            DROP
          </div>
        </div>
        <div className="relative w-fit h-fit col-start-3 place-self-center grid grid-flow-col auto-cols-[auto auto] cursor-pointer">
          <div className="relative w-fit h-fit col-start-1 place-self-center text-4xl">
            MERCHANTS
          </div>
        </div>
        <div className="relative w-fit h-fit col-start-4 place-self-center grid grid-flow-col auto-cols-[auto auto] cursor-pointer">
          <div className="relative w-fit h-fit col-start-1 place-self-center text-4xl">
            SUPPLY
          </div>
        </div>
        {router.asPath === "/dashboard" ? (
          <div className="relative w-fit h-fit col-start-5 place-self-center grid grid-flow-col auto-cols-[auto auto] pl-5 pt-2 grid grid-flow-col auto-cols-[auto auto] gap-2">
            <div className="relative w-0.5 h-6 col-start-1 place-self-center grid grid-flow-col auto-cols-[auto auto] bg-white"></div>
            <div className="relative w-fit h-fit col-start-2 place-self-center grid grid-flow-col auto-cols-[auto auto] cursor-pointer font-economica text-xl">
              Product Planning
            </div>
          </div>
        ) : (
          <div className="relative w-fit h-fit col-start-5 place-self-center grid grid-flow-col auto-cols-[auto auto] pl-5 pt-2 grid grid-flow-col auto-cols-[auto auto] gap-4">
            <div className="relative w-fit h-fit col-start-1 place-self-center grid grid-flow-col auto-cols-[auto auto] pl-5 pt-2">
              <BsSearch
                className="relative w-fit h-fit place-self-center cursor-pointer"
                color="white"
                size={15}
              />
            </div>
            <div className="relative w-fit h-fit col-start-2 place-self-center grid grid-flow-col auto-cols-[auto auto] pt-1 cursor-pointer">
              <Image src="/images/cart.png" height={20} width={20} />
            </div>
          </div>
        )}
      </div>
      <div className="relative w-fit h-fit col-start-2 justify-self-end">
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            authenticationStatus,
            mounted,
          }: any) => {
            const ready = mounted && authenticationStatus !== "loading";
            const connected =
              ready &&
              account &&
              chain &&
              (!authenticationStatus ||
                authenticationStatus === "authenticated");

            return (
              <div
                {...(!ready && {
                  "aria-hidden": true,
                  style: {
                    opacity: 0,
                    pointerEvents: "none",
                    userSelect: "none",
                    zIndex: "0",
                  },
                })}
              >
                {(() => {
                  if (!connected) {
                    return (
                      <p
                        onClick={openConnectModal}
                        className="font-awkward text-white cursor-pointer border-2 border-white p-2 text-[1.3em]"
                      >
                        CONNECT WALLET
                      </p>
                    );
                  }

                  if (chain.unsupported) {
                    return (
                      <p
                        onClick={openChainModal}
                        className="font-awkward text-white cursor-pointer border-2 border-white p-2 text-[1.3em]"
                      >
                        SWITCH NETWORK
                        <span className="relative h-4 w-4 -top-4">
                          <span className="animate-ping absolute h-4 w-4 rounded-full opacity-75 bg-red-600"></span>
                          <span className="absolute inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                        </span>
                      </p>
                    );
                  }

                  return (
                    <div
                      style={{ display: "flex", gap: 1, zIndex: "30" }}
                      className="font-awkward text-white cursor-pointer border-2 border-white p-2 text-[1.3em]"
                    >
                      <p onClick={openAccountModal}>{account.displayName}</p>
                    </div>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>
      </div>
    </div>
  );
};

export default Header;
