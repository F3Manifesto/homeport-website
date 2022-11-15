import { NextPage } from "next";
import Demand from "../components/Home/Demand";
import Featured from "../components/Home/Featured";
import Gallery from "../components/Home/Gallery";
import Grid from "../components/Home/Grid";
import LargeText from "../components/Home/LargeText";
import Prompt from "../components/Home/Prompt";

const Success: NextPage = (): JSX.Element => {
  return (
    <div className="relative grid grid-flow-row auto-rows-[auto auto] w-full h-full min-h-screen justify-center gap-20 pt-20 text-white font-economica text-center pb-20">
      <div className="relative w-fit h-fit row-start-1 text-7xl text-center place-self-center">
        Thank you for Shopping!
        <br />
        <br />
        Explore other styles...
      </div>
      <Gallery />
      <Demand />
      <Grid />
      <Prompt />
    </div>
  );
};

export default Success;
