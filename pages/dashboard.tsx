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
import useAddCurrency from "../components/Dashboard/Pricing/hooks/useAddCurrency";

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
  } = useContext(GlobalContext);
  console.log(addPricingModal)
  const { handleDropDelete } = useUpdateDropTypes();
  const { handleProductDelete } = useUpdateProduct();
  const { handleDropAddPrice } = useAddCurrency();
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
        {addPricingModal && (
          <AddPricingModal
            handleDropAddPrice={handleDropAddPrice}
            setAddPricingModal={setAddPricingModal}
          />
        )}
        <SideBar />
        <Switcher handleLandTop={handleLandTop} />
      </div>
    </div>
  );
};

export default Dashboard;
