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
  return (
    <form
      onSubmit={(e) => handleSubmitForm(e)}
      className="relative h-fit w-fit top-32 grid grid-rows-2 grid-flow-col gap-10 w-2/3"
    >
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
      <button
        type="submit"
        className="absolute -bottom-20 font-firaB w-24 h-fit p-2 border-2 border-offWhite cursor-empireS rounded-full text-offBlack bg-lightYellow text-xs hover:mix-blend-color-dodge active:bg-grayBlue"
      >
        SUBMIT
      </button>
      {submitSuccess && (
        <div className="text-offWhite font-firaB absolute left-40 -bottom-20">
          Thank you! We'll be in touch.
        </div>
      )}
    </form>
  );
};

export default Form;
