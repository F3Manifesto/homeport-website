import { FunctionComponent, useContext, useMemo } from "react";
import { ImCross } from "react-icons/im";
import { CollectContext } from "../../../pages/collect/[name]";
import useDropStatus from "./hooks/useDropStatus";
import Link from "next/link";

const DropStatus: FunctionComponent = (): JSX.Element => {
  const { setShowDropStatusModal, showDropStatusModal } =
    useContext(CollectContext);
  const { setSubmitSuccess, handleSubmitForm, submitSuccess } = useDropStatus();
  useMemo(() => {
    if (submitSuccess) {
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 4000);
    }
  }, [submitSuccess]);
  return (
    <form
      className="relative w-full galaxy:w-96 h-fit bg-offBlack grid grid-flow-row auto-rows-auto col-start-1 p-4 gap-4"
      onSubmit={(e: any) => handleSubmitForm(e)}
    >
      <div
        className="relative place-self-end w-10 h-10 row-start-1 cursor-empireS hover:opacity-80 active:scale-95 grid grid-flow-row auto-rows-auto"
        onClick={() => {
          setShowDropStatusModal({
            open: false,
            type: "",
            name: "",
          });
        }}
      >
        <ImCross
          color="white"
          className="place-self-center w-fit h-fit relative row-start-1"
        />
      </div>

      {showDropStatusModal?.type === "chromadin" ? (
        <div className="relative w-full h-full flex flex-col gap-2 items-center justify-center">
          <div className="relative w-fit h-fit justify-center flex items-center text-white text-2xl font-jacklane text-center pb-4">
            This drop is live on Chromadin.
          </div>
          <div className="relative w-fit h-fit justify-center flex items-center text-white text-base font-jacklane text-center pb-4">
            www.chromadin.xyz
          </div>
          <Link
            className="relative h-fit w-fit justify-center flex items-center"
            target="_blank"
            rel="noreferrer"
            href={`https://www.chromadin.xyz/autograph/f3manifesto/collection/${showDropStatusModal.name
              ?.toLowerCase()
              ?.replaceAll(" ", "_")}`}
          >
            <button
              type="submit"
              className="relative font-firaB w-24 h-fit p-2 border-2 border-offWhite cursor-empireS rounded-full text-offBlack bg-lightYellow text-xs hover:mix-blend-color-dodge active:bg-grayBlue justify-center flex items-center"
            >
              COLLECT
            </button>
          </Link>
        </div>
      ) : (
        <>
          <div className="relative w-fit h-fit place-self-center row-start-2 text-white text-2xl font-jacklane text-center pb-4">
            This drop is not yet live.
          </div>
          <div className="relative w-fit h-fit place-self-center row-start-3 text-white text-base font-jacklane text-center pb-4">
            Join the waitlist
          </div>
          <input
            placeholder="ens / twitter / lens"
            className="rounded-lg w-full h-12 p-2 border border-offBlack bg-offWhite caret-offBlue focus:caret-offBlue font-fira text-center place-self-center row-start-4"
            type="text"
            name="whitelistContact"
            required
            onChange={() => setSubmitSuccess(false)}
          />
          <div className="relative h-fit w-fit row-start-5 place-self-center">
            <button
              type="submit"
              className="relative font-firaB w-24 h-fit p-2 border-2 border-offWhite cursor-empireS rounded-full text-offBlack bg-lightYellow text-xs hover:mix-blend-color-dodge active:bg-grayBlue"
            >
              SUBMIT
            </button>
          </div>
          <div className="relative h-fit w-fit row-start-6 pb-8 place-self-center">
            {submitSuccess && (
              <div className="text-offWhite font-firaB relative place-self-center">
                Thank you! We'll be in touch.
              </div>
            )}
          </div>
        </>
      )}
    </form>
  );
};

export default DropStatus;
