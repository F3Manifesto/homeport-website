import { NextPage } from "next";
import { FormEvent } from "react";

const SignUp: NextPage = (): JSX.Element => {
  return (
    <div className="relative grid grid-flow-col auto-cols-[auto auto] w-full max-h-screen h-screen min-h-screen justify-center text-black font-animosaR bg-shaded">
      <form
        className="relative w-fit h-fit grid grid-flow-row auto-rows-[auto auto] col-start-1 place-self-center gap-4"
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
        }}
      >
        <input
          placeholder="username"
          type={"text"}
          name="username"
          className="relative w-fit h-fit place-self-center border-white border-2 row-start-1 px-10 text-lg rounded-md py-2 -top-24 cursor-pointer2"
        />
        <input
          placeholder="password"
          type={"text"}
          name="password"
          className="relative w-fit h-fit place-self-center border-white border-2 row-start-2 px-10 text-lg rounded-md py-2 -top-24 cursor-pointer"
        />
        <input
          placeholder="confirm password"
          type={"text"}
          name="confirmPassword"
          className="relative w-fit h-fit place-self-center border-white border-2 row-start-3 px-10 text-lg rounded-md py-2 -top-24 cursor-pointer"
        />
        <button
          className="relative w-full h-fit bg-lBlue border-2 border-white text-white rounded-md row-start-4 -top-24 py-2 cursor-pointer hover:bg-lBlue active:scale-95 active:bg-lBlue"
          type="submit"
        >
          Seller Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
