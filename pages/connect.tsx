import { NextPage } from "next";
import { useRouter } from "next/router";

const Connect: NextPage = (): JSX.Element => {
  const router = useRouter();
  return (
    <div className="relative grid grid-flow-col auto-cols-[auto auto] w-full max-h-screen h-screen min-h-screen justify-center text-white font-animosaR bg-shaded">
      <div className="relative w-fit h-fit grid grid-flow-row auto-rows-[auto auto] col-start-1 place-self-center gap-4">
        <div
          className="relative w-fit h-fit place-self-center border-white border-2 row-start-1 px-12 py-2 text-lg rounded-md -top-24 cursor-pointer hover:bg-lBlue active:scale-95 active:bg-lBlue"
          onClick={() => router.push("/log-in")}
        >
          <div>Merchant Log In</div>
        </div>
        {/* <div
          className="relative w-fit h-fit place-self-center border-white border-2 row-start-2 px-10 text-lg rounded-md py-2 -top-24 cursor-pointer hover:bg-lBlue active:scale-95 active:bg-lBlue row-start-3"
          onClick={() => router.push("/sign-up")}
        >
          <div>Merchant Sign Up</div>
        </div> */}
      </div>
    </div>
  );
};

export default Connect;
