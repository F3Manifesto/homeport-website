import { NextPage } from "next";
import { FormEvent } from "react";
import useConnect from "../components/Connect/hooks/useConnect";

const LogIn: NextPage = (): JSX.Element => {
  const { handleLogIn, foundUser, setFoundUser } = useConnect();
  return (
    <div className="relative grid grid-flow-col auto-cols-[auto auto] w-full max-h-screen h-screen min-h-screen justify-center text-black font-animosaR bg-shaded">
      <form
        className="relative w-fit h-fit grid grid-flow-row auto-rows-[auto auto] col-start-1 place-self-center gap-4"
        onSubmit={(e: FormEvent) => handleLogIn(e)}
      >
        <input
          placeholder="username"
          onChange={() => setFoundUser(true)}
          type={"text"}
          name="username"
          required
          className="relative w-fit h-fit place-self-center border-white border-2 row-start-1 px-10 text-lg rounded-md py-2 -top-24 cursor-pointer2"
        />
        <input
          onChange={() => setFoundUser(true)}
          placeholder="password"
          type="password"
          required
          name="password"
          className="relative w-fit h-fit place-self-center border-white border-2 row-start-2 px-10 text-lg rounded-md py-2 -top-24 cursor-pointer"
        />
        {
          <button
            className="relative w-full text-center h-fit bg-lBlue border-2 border-white text-white rounded-md -top-24 py-2 cursor-pointer hover:bg-lBlue active:scale-95 active:bg-lBlue"
            type="submit"
          >
            {foundUser ? "Merchant Log In" : "Wrong User or Password, Try Again"}
          </button>
        }
      </form>
    </div>
  );
};

export default LogIn;
