import { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addPaymentAdmin,
  getPaymentAdmins,
  updatePaymentAdmin,
} from "../../../../lib/helpers";
import {
  PaymentInterface,
  UseAdminPaymentResults,
} from "../../../../types/general.types";

const useAdminPayment = (): UseAdminPaymentResults => {
  const queryClient = useQueryClient();
  const [success, setSuccess] = useState<boolean>();

  const addMutation = useMutation(addPaymentAdmin, {
    onSuccess: async () => {
      setSuccess(true);
    },
  });

  const { data } = useQuery("payments", getPaymentAdmins);

  const handleAdminPayment = (e: FormEvent) => {
    e.preventDefault();
    const adminPaymentType: PaymentInterface = {
      wallet: (e.target as HTMLFormElement).wallet.value,
      stripeSecret: (e.target as HTMLFormElement).stripeSecret.value,
      stripePublish: (e.target as HTMLFormElement).stripePublish.value,
    };
    addMutation.mutate(adminPaymentType);
  };

  const updatedMutation = useMutation(
    (updatedData: PaymentInterface) =>
      updatePaymentAdmin(data[0]._id as string, updatedData),
    {
      onSuccess: async () => {
        setSuccess(true);
        queryClient.prefetchQuery("payments", getPaymentAdmins);
      },
    }
  );

  const handleAdminUpdate = async (e: FormEvent) => {
    e.preventDefault();
    const adminPaymentType: PaymentInterface = {
      wallet: (e.target as HTMLFormElement).wallet.value,
      stripeSecret: (e.target as HTMLFormElement).stripeSecret.value,
      stripePublish: (e.target as HTMLFormElement).stripePublish.value,
    };
    try {
      await updatedMutation.mutate(adminPaymentType);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return { handleAdminPayment, success, data, handleAdminUpdate, setSuccess };
};

export default useAdminPayment;
