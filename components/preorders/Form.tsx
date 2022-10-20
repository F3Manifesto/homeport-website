import { FunctionComponent, useMemo } from "react";
import { FormProps } from "../../types/general.types";
import useForm from "./hooks/useForm";

const Form: FunctionComponent<FormProps> = ({ orderIRL }): JSX.Element => {
  const { setSubmitSuccess, handleSubmitForm, submitSuccess } = useForm();
  useMemo(() => {
    if (submitSuccess) {
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 4000);
    }
  }, [submitSuccess]);
  console.log(orderIRL)
  return (
    <form
      onSubmit={(e) => handleSubmitForm(e)}
      className="relative h-fit w-fit"
    >
      <div className="relative grid auto-rows-[auto auto] grid-flow-row gap-10">
        <div className="relative h-fit w-fit col-start-1 row-start-1">
          <div className="relative col-start-1 row-start-1">
            <input name="orderIRL" className="hidden" defaultValue={orderIRL} />
            <div className="text-offWhite m-2 font-firaL">
              What do you like most about this item?
            </div>
            <input
              className="rounded-lg w-5/6 h-12 p-2 border border-offBlack bg-offWhite caret-offBlue focus:caret-offBlue font-fira"
              type="text"
              name="itemFeatures"
              required
              onChange={() => setSubmitSuccess(false)}
            />
          </div>
        </div>
        <div className="relative h-fit w-fit col-start-1 row-start-2 md:col-start-2 md:row-start-1">
          <div className="relative h-fit w-fit col-start-2 row-start-1">
            <div className="text-offWhite m-2 font-firaL">
              Would this be made for you or as a gift?
            </div>
            <input
              className="rounded-lg w-5/6 h-12 p-2 border border-offBlack bg-offWhite caret-offBlue focus:caret-offBlue font-fira"
              type="text"
              name="buyType"
              required
              onChange={() => setSubmitSuccess(false)}
            />
          </div>
        </div>
        <div className="relative h-fit w-fit col-start-1 row-start-3 md:row-start-2">
          <div className="relative col-start-1 row-start-2">
            <div className="text-offWhite m-2 font-firaL">
              How would you like to be contacted?
            </div>
            <input
              className="rounded-lg w-5/6 h-12 p-2 border border-offBlack bg-offWhite caret-offBlue focus:caret-offBlue font-fira"
              type="text"
              name="contactType"
              required
              onChange={() => setSubmitSuccess(false)}
            />
          </div>
        </div>
        <div className="relative h-fit w-fit col-start-1 row-start-4 md:row-start-3">
          <button
            type="submit"
            className="relative font-firaB w-24 h-fit p-2 border-2 border-offWhite cursor-empireS rounded-full text-offBlack bg-lightYellow text-xs hover:mix-blend-color-dodge active:bg-grayBlue"
          >
            SUBMIT
          </button>
        </div>
        <div className="relative h-fit w-fit col-start-1 row-start-5 md:row-start-4">
          {submitSuccess && (
            <div className="text-offWhite font-firaB relative">
              Thank you! We'll be in touch.
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default Form;
