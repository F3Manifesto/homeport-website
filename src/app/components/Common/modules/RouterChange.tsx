import { FunctionComponent, JSX } from "react";
import Image from "next/image";
import { INFURA_GATEWAY_INTERNAL } from "@/app/lib/constants";

const RouterChange: FunctionComponent = (): JSX.Element => {
  return (
    <div className="relative w-screen h-screen flex justify-center items-center selection:bg-lightYellow selection:text-lightYellow bg-gradient-to-b from-lightY via-white to-lightPurple">
      <div className="relative flex justify-center items-center flex-col gap-4">
        <div className="w-12 h-12 relative flex items-center justify-center animate-spin">
          <Image
            alt="loader"
            layout="fill"
            draggable={false}
            src={`${INFURA_GATEWAY_INTERNAL}QmWcaVfpqyRB2BQ9swPHBB85fBTQSjQgoh4LNt1tWTXPmU`}
          />
        </div>
      </div>
    </div>
  );
};

export default RouterChange;
