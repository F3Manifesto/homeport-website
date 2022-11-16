import { FunctionComponent, useContext } from "react";
import { GlobalContext } from "../../../pages/_app";
import { AdminMainProps } from "../../../types/general.types";
import useAdmin from "./hooks/useAdmin";
import useAdminPayment from "./hooks/useAdminPayment";
import PaymentInfo from "./PaymentInfo";
import UserInfo from "./UserInfo";

const Main: FunctionComponent<AdminMainProps> = ({
  handleModalTop,
}): JSX.Element => {
  const {
    admins,
    show,
    setShow,
    showSecretPassword,
    setShowSecretPassword,
    showPublishPassword,
    setShowPublishPassword,
  } = useAdmin();
  const { setDeleteModal, setCantDeleteAdmin } = useContext(GlobalContext);
  const { handleAdminPayment, data, handleAdminUpdate, success, setSuccess } =
    useAdminPayment();
  return (
    <div className="relative col-start-2 w-full h-fit grid grid-flow-row auto-rows-[auto auto] py-8 pr-10">
      <UserInfo
        admins={admins}
        show={show}
        setShow={setShow}
        setDeleteModal={setDeleteModal}
        setCantDeleteAdmin={setCantDeleteAdmin}
        handleModalTop={handleModalTop}
      />
      <PaymentInfo
        handleAdminPayment={handleAdminPayment}
        data={data}
        handleAdminUpdate={handleAdminUpdate}
        setShowSecretPassword={setShowSecretPassword}
        showSecretPassword={showSecretPassword}
        showPublishPassword={showPublishPassword}
        setShowPublishPassword={setShowPublishPassword}
        success={success}
        setSuccess={setSuccess}
      />
    </div>
  );
};

export default Main;
