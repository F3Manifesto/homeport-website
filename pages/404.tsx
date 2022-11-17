import { NextPage } from "next";
import Link from "next/link";

const Custom404: NextPage = (): JSX.Element => {
  return (
    <div className="relative min-h-screen min-w-screen h-screen w-screen grid grid-flow-col auto-cols-[auto auto] bg-shaded">
      <div className="relative w-fit h-fit place-self-center text-yellowTheme font-economica p-6 text-center text-3xl">
        There&apos;s been a glitch in the fabric. Find your way back{" "}
        <Link legacyBehavior href="/">
          <a className="hover:opacity-80 cursor-pointer">home.</a>
        </Link>
      </div>
    </div>
  );
};

export default Custom404;
