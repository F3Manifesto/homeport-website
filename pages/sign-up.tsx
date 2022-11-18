import { NextPage } from "next";
import { useRouter } from "next/router";
import { FormEvent } from "react";
import useConnect from "../components/Connect/hooks/useConnect";

const SignUp: NextPage = (): JSX.Element => {
  const { handleSignUp, success } = useConnect();
  const router = useRouter();
  return (
    <div className="relative grid grid-flow-col auto-cols-[auto auto] w-full max-h-screen h-screen min-h-screen justify-center text-black font-animosaR bg-shaded">
      <form
        className="relative w-fit h-fit grid grid-flow-row auto-rows-[auto auto] col-start-1 place-self-center gap-4"
        onSubmit={(e: FormEvent) => handleSignUp(e)}
      >
        <input
          placeholder="username"
          type={"text"}
          required
          name="username"
          className="relative w-fit h-fit place-self-center border-white border-2 row-start-1 px-10 text-lg rounded-md py-2 -top-24 cursor-pointer2"
        />
        <input
          placeholder="password"
          type="password"
          name="password"
          required
          className="relative w-fit h-fit place-self-center border-white border-2 row-start-2 px-10 text-lg rounded-md py-2 -top-24 cursor-pointer"
        />
        <input
          placeholder="confirm password"
          type="password"
          required
          name="confirmPassword"
          className="relative w-fit h-fit place-self-center border-white border-2 row-start-3 px-10 text-lg rounded-md py-2 -top-24 cursor-pointer"
        />
        {!success ? (
          <button
            className="relative w-full h-fit bg-lBlue border-2 border-white text-white rounded-md row-start-4 -top-24 py-2 cursor-pointer hover:bg-lBlue active:scale-95 active:bg-lBlue"
            type="submit"
          >
            Merchant Sign Up
          </button>
        ) : (
          <div
            className="relative w-full h-fit bg-lBlue border-2 border-white text-white text-center rounded-md row-start-4 -top-24 py-2 cursor-pointer hover:bg-lBlue active:scale-95 active:bg-lBlue"
            onClick={() => router.push("/log-in")}
          >
            Success! Head to Merchant Log In ...
          </div>
        )}
      </form>
    </div>
  );
};

export default SignUp;
