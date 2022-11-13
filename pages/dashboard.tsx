import { NextPage } from "next";
import SideBar from "../components/Dashboard/Sidebar";
import Switcher from "../components/Dashboard/Switcher";

const Dashboard: NextPage = (): JSX.Element => {
  return (
    <div className="relative grid grid-flow-col auto-cols-[auto auto] w-full h-full min-h-screen bg-shaded text-white font-economica text-xl pb-20">
      <div className="relative w-fit h-fit grid grid-flow-col auto-cols-[auto auto] gap-4">
        <SideBar />
        <Switcher />
      </div>
    </div>
  );
};

export default Dashboard;
