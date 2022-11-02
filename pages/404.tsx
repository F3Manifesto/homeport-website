import { NextPage } from "next";
import Link from "next/link";
import Sidebar from "../components/layout/Sidebar";

const Custom404: NextPage = (): JSX.Element => {
  return (
    <div className="relative min-h-screen min-w-scree h-screen w-screen grid grid-flow-col auto-cols-[auto auto] cursor-empireA">
      <Sidebar />
      <div className="relative w-fit h-fit place-self-center text-lightYellow font-fira p-6 text-center">
        There's been a glitch in the fabric. Find your way back{" "}
        <Link href="/">
          <a className="hover:opacity-80 cursor-empireS">home.</a>
        </Link>
      </div>
    </div>
  );
};

export default Custom404;
