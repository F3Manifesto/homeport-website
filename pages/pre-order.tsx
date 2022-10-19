import type { NextPage } from "next";
import { AiFillBackward } from "react-icons/ai";
import Link from "next/link";
import Form from "../components/preorders/Form";
import { useSelector } from "react-redux";

const PreOrder: NextPage = (): JSX.Element => {
  const orderIRL = useSelector((state: any) => state.orderObject?.order);

  return (
    <div className="min-h-auto h-auto min-w-screen bg-black relative cursor-empire overflow-x-hidden selection:bg-lightYellow selection:text-lightYellow bg-offBlack cursor-empireA">
      <Link href={"/"}>
        <div className="text-offWhite font-fira left-7 absolute top-7 opacity-80 hover:opacity-20 cursor-empireS">
          <AiFillBackward
            color="#F2F2F2"
            size={25}
            className="float-left mr-2"
          />{" "}
          Return
        </div>
      </Link>
      <div className="relative h-auto w-auto top-32 left-20">
        <div className="w-2/3 text-offWhite font-firaB text-3xl leading-relaxed">
          Thank you for expressing interest in more of <br />
          this item being made IRL.
          <br />
          <b className="font-fira text-base leading-snug w-1/2 absolute mt-3">
            {" "}
            Before we commit to a new limited run, each of you who take the time
            to tell us a bit about what you want goes along way in our decision
            of what to work on.
          </b>
        </div>
        {orderIRL ? (
          <Form orderIRL={orderIRL} />
        ) : (
          <Link href={"/#shopping"}>
            <div className="relative text-offWhite font-fira text-lg top-40 cursor-empireS hover:text-lightYellow">
              Please Select the Outfit you'd like to pre-order.
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default PreOrder;
