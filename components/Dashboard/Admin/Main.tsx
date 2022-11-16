import { FunctionComponent, useContext } from "react";
import { GlobalContext } from "../../../pages/_app";
import { AdminMainProps } from "../../../types/general.types";
import useAdmin from "./hooks/useAdmin";
import PaymentInfo from "./PaymentInfo";
import UserInfo from "./UserInfo";

const Main: FunctionComponent<AdminMainProps> = ({
  handleModalTop,
}): JSX.Element => {
  const { admins, show, setShow } = useAdmin();
  const { setDeleteModal, setCantDeleteAdmin } = useContext(GlobalContext);
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
      <PaymentInfo />
    </div>
  );
};

export default Main;
