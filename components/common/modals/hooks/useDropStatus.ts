import { useState } from "react";
import { useDropStatusResults } from "../../../../types/general.types";
import emailjs from "@emailjs/browser";

const useDropStatus = (): useDropStatusResults => {
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  const handleSubmitForm = async (e: any): Promise<void> => {
    e.preventDefault();
    try {
      await emailjs.sendForm(
        "service_f7x2sjb",
        "template_d52wkoc",
        e.target,
        "fvUz2_RQo7oeFreDc"
      );
      setSubmitSuccess(true);
    } catch (err: any) {
      console.error(err.message);
    }
    e.target.reset();
  };

  return {
    submitSuccess,
    setSubmitSuccess,
    handleSubmitForm,
  };
};

export default useDropStatus;
