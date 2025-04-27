import { ModalContext } from "@/app/providers";
import Image from "next/image";
import { FunctionComponent, JSX, useContext } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import useCrearCuenta from "../hooks/useCrearCuenta";

const CrearCuenta: FunctionComponent<{ dict: any }> = ({
  dict,
}): JSX.Element => {
  const contexto = useContext(ModalContext);
  const { account, accountLoading, setAccount, handleCreateAccount } =
    useCrearCuenta(dict);
  return (
    <div
      className="inset-0 justify-center fixed z-20 bg-opacity-50 backdrop-blur-sm overflow-y-hidden grid grid-flow-col auto-cols-auto w-full h-auto cursor-empireS"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        contexto?.setCreateAccount(false);
      }}
    >
      <div
        className="relative w-[90vw] sm:w-[70vw] half:w-[60vw] min-w-fit md:w-[40vw] lg:w-[40vw] h-fit col-start-1 place-self-center bg-lightWhite border border-black font-din text-black"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-fit flex flex-col gap-3 items-center justify-center p-3">
          <div className="relative w-fit pb-3 h-fit flex items-center justify-center">
            {dict?.common?.createLens}
          </div>
          <div className="relative w-full h-fit flex flex-col gap-3 items-center justify-center">
            <div className="relative items-center justify-center flex w-fit h-fit">
              <label
                className="relative w-20 rounded-full h-20 flex items-center justify-center border border-black cursor-empireS"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {account?.pfp && (
                  <Image
                    alt="pfp"
                    src={URL.createObjectURL(account.pfp)}
                    objectFit="cover"
                    layout="fill"
                    draggable={false}
                    className="rounded-full"
                  />
                )}
                <input
                  type="file"
                  accept="image/png,image/jpeg"
                  hidden
                  required
                  id="files"
                  multiple={false}
                  name="pfp"
                  disabled={accountLoading}
                  onChange={(e) => {
                    e.stopPropagation();
                    if (!e.target.files || e.target.files.length === 0) return;
                    setAccount({
                      ...account,
                      pfp: e?.target?.files?.[0],
                    });
                  }}
                />
              </label>
            </div>
            <div className="relative w-full h-fit flex items-start justify-between flex-row gap-3">
              <div className="relative w-full h-fit flex flex-col gap-1.5 items-start justify-start">
                <div className="relative w-fit h-fit flex">
                  {dict?.common?.username}
                </div>
                <input
                  disabled={accountLoading}
                  onChange={(e) =>
                    setAccount({
                      ...account,
                      username: e.target.value,
                    })
                  }
                  className="relative w-full h-8 border border-black focus:outline-none p-1"
                  value={account?.username}
                />
              </div>
              <div className="relative w-full h-fit flex flex-col gap-1.5 items-start justify-start">
                <div className="relative w-fit h-fit flex">
                  {dict?.common?.localname}
                </div>
                <input
                  disabled={accountLoading}
                  onChange={(e) =>
                    setAccount({
                      ...account,
                      localname: e.target.value,
                    })
                  }
                  className="relative w-full h-8 border border-black focus:outline-none p-1"
                  value={account?.localname}
                />
              </div>
            </div>
            <div className="relative w-full h-fit flex flex-col gap-1.5 items-start justify-start">
              <div className="relative w-fit h-fit flex">Bio</div>
              <textarea
                disabled={accountLoading}
                onChange={(e) =>
                  setAccount({
                    ...account,
                    bio: e.target.value,
                  })
                }
                className="relative w-full h-14 overflow-y-scroll border border-black focus:outline-none p-1"
                value={account?.bio}
                style={{
                  resize: "none",
                }}
              ></textarea>
            </div>
          </div>
          <div className="relative w-fit h-fit flex">
            <div
              className={`relative px-3 py-1 flex items-center justify-center rounded-md border border-black w-28 h-8 ${
                !accountLoading &&
                "cursor-empireS active:scale-95 hover:opacity-70"
              }`}
              onClick={() => !accountLoading && handleCreateAccount()}
            >
              {accountLoading ? (
                <AiOutlineLoading
                  className="animate-spin"
                  color="white"
                  size={15}
                />
              ) : (
                dict?.common?.create
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrearCuenta;
