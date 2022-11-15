import { NextPage } from "next";
import SideBar from "../components/Dashboard/Sidebar";
import Switcher from "../components/Dashboard/Switcher";
import { useContext } from "react";
import { GlobalContext } from "./_app";
import DeleteModal from "../components/Dashboard/Common/DeleteModal";
import useUpdateDropTypes from "../components/Dashboard/DropTypes/hooks/useUpdateDropTypes";
import useUpdateProduct from "../components/Dashboard/Inventory/hooks/useUpdateProduct";
import DeleteDrop from "../components/Dashboard/Common/DeleteDrop";

const Dashboard: NextPage = (): JSX.Element => {
  const { deleteModal, setDeleteModal, cantDeleteDrop, setCantDeleteDrop } =
    useContext(GlobalContext);
  const { handleDropDelete } = useUpdateDropTypes();
  const { handleProductDelete } = useUpdateProduct();
  return (
    <div className="relative grid grid-flow-col auto-cols-[auto auto] w-full h-full min-h-screen bg-shaded text-white font-economica text-xl pb-20">
      <div className="relative w-fit h-fit grid grid-flow-col auto-cols-[auto auto] gap-4">
        {deleteModal && (
          <DeleteModal
            setDeleteModal={setDeleteModal}
            handleDropDelete={handleDropDelete}
            handleProductDelete={handleProductDelete}
          />
        )}
        {cantDeleteDrop && <DeleteDrop setCantDeleteDrop={setCantDeleteDrop} />}
        <SideBar />
        <Switcher />
      </div>
    </div>
  );
};

export default Dashboard;
