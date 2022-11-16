import { useContext, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { deleteUser, getUsers } from "../../../../lib/helpers";
import { GlobalContext } from "../../../../pages/_app";
import { RootState } from "../../../../redux/store";
import { UseAdminResults } from "../../../../types/general.types";

const useAdmin = (): UseAdminResults => {
  const [show, setShow] = useState<boolean>();
  const { data: admins } = useQuery("users", getUsers);
  const queryClient = useQueryClient();
  const { setDeleteModal } = useContext(GlobalContext);
  const adminId = useSelector((state: RootState) => state.app.dropReducer.id);
  const [showSecretPassword, setShowSecretPassword] = useState<boolean>();
  const [showPublishPassword, setShowPublishPassword] = useState<boolean>();

  const handleAdminDelete = async (): Promise<void> => {
    try {
      await deleteUser(adminId as string);
      await queryClient.prefetchQuery("users", getUsers);
      setDeleteModal(false);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return {
    admins,
    show,
    setShow,
    handleAdminDelete,
    showSecretPassword,
    setShowSecretPassword,
    showPublishPassword,
    setShowPublishPassword,
  };
};

export default useAdmin;
