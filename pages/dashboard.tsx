import { NextPage } from "next";
import SideBar from "../components/Dashboard/Sidebar";
import Switcher from "../components/Dashboard/Switcher";
import { useContext } from "react";
import { GlobalContext } from "./_app";
import DeleteModal from "../components/Dashboard/Common/DeleteModal";
import useUpdateDropTypes from "../components/Dashboard/DropTypes/hooks/useUpdateDropTypes";
import useUpdateProduct from "../components/Dashboard/Inventory/hooks/useUpdateProduct";
import DeleteDrop from "../components/Dashboard/Common/DeleteDrop";
import { DashboardProps } from "../types/general.types";
import AddPricingModal from "../components/Dashboard/Common/AddPricingModal";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useRouter } from "next/router";
import DeleteAdmin from "../components/Dashboard/Common/DeleteAdmin";
import useAdmin from "../components/Dashboard/Admin/hooks/useAdmin";

const Dashboard: NextPage<DashboardProps> = ({
  handleLandTop,
}): JSX.Element => {
  const {
    deleteModal,
    setDeleteModal,
    cantDeleteDrop,
    setCantDeleteDrop,
    addPricingModal,
    setAddPricingModal,
    cantDeleteAdmin,
    setCantDeleteAdmin,
  } = useContext(GlobalContext);
  const { handleDropDelete } = useUpdateDropTypes();
  const { handleProductDelete } = useUpdateProduct();
  const { handleAdminDelete } = useAdmin();
  const userAuthenticated = useSelector(
    (state: RootState) => state.app.userReducer.value
  );
  const router = useRouter();

  if (userAuthenticated === false) {
    return (
      <div className="relative w-screen h-screen text-center text-white font-economica text-3xl grid grid-flow-col auto-cols-[auto auto]">
        <div className="relative w-fit h-fit col-start-1 place-self-center -top-20">
          Please{" "}
          <span
            className="cursor-pointer active:scale-95 hover:opacity-80 text-grayBlue"
            onClick={() => router.push("/log-in")}
          >
            Log In
          </span>{" "}
          to Access the Dashboard.
        </div>
      </div>
    );
  }

  return (
    <div className="relative grid grid-flow-col auto-cols-[auto auto] w-full h-full min-h-screen bg-shaded text-white font-economica text-xl pb-20">
      <div className="relative w-fit h-fit grid grid-flow-col auto-cols-[auto auto] gap-4">
        {deleteModal && (
          <DeleteModal
            setDeleteModal={setDeleteModal}
            handleDropDelete={handleDropDelete}
            handleProductDelete={handleProductDelete}
            handleAdminDelete={handleAdminDelete}
          />
        )}
        {cantDeleteDrop && <DeleteDrop setCantDeleteDrop={setCantDeleteDrop} />}
        {addPricingModal && (
          <AddPricingModal
            setAddPricingModal={setAddPricingModal}
            handleLandTop={handleLandTop}
          />
        )}
        {cantDeleteAdmin && (
          <DeleteAdmin setCantDeleteAdmin={setCantDeleteAdmin} />
        )}
        <SideBar />
        <Switcher handleLandTop={handleLandTop} />
      </div>
    </div>
  );
};

export default Dashboard;
