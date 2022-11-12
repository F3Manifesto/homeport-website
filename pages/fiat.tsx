import { NextPage } from "next";
import StripeCheckout from "../components/Fiat/StripeCheckout";

const Fiat: NextPage = (): JSX.Element => {
    return (
        <div className="relative grid grid-flow-col auto-cols-[auto auto] w-screen h-screen justify-center grid grid-flow-row auto-rows-[auto auto]">
            <StripeCheckout />
        </div>
    )
}

export default Fiat;