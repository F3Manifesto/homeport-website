import { useRouter } from "next/router";
import { FunctionComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setItem } from "../../redux/reducers/itemSlice";
import { RootState } from "../../redux/store";
import { PaymentButtonProps } from "../../types/general.types";

const PaymentButton: FunctionComponent<PaymentButtonProps> = ({
  setPurchase,
  payment,
  setPayment,
  clickedToken,
  item,
  quantity,
}): JSX.Element => {
  const router = useRouter();
  const itemPrice = useSelector((state: RootState) => state.app.priceReducer);
  let action = "BUY_NOW";
  const dispatch = useDispatch();
  useEffect(() => {
    if (clickedToken !== "") {
      setPayment("selected");
    }
  }, [clickedToken]);

  const decideStringAction = () => {
    if (payment === "order") {
      action = "ORDER_SHOW";
    }

    if (payment === "unselected" && clickedToken === "") {
      action = "SELECT_CURRENCY";
    }

    if (payment === "selected" && clickedToken !== "") {
      action = "BUY_NOW";
    }

    return action;
  };

  switch (decideStringAction()) {
    case "ORDER_SHOW":
      return (
        <div className="relative w-full h-full row-start-3 grid grid-flow-col auto-cols-[auto auto] cursor-pointer">
          <div
            className="relative w-full h-fit col-start-1 border-2 border-white grid grid-flow-col auto-cols-[auto auto] hover:opacity-70 active:scale-95 hover:bg-lBlue active:bg-lBlue"
            onClick={
              clickedToken !== ""
                ? () => {
                    setPurchase("crypto");
                    router.push("/crypto");
                  }
                : () => {
                    setPayment("unselected");
                  }
            }
          >
            <button
              className="relative w-fit h-fit p-3 place-self-center col-start-1 text-white font-economicaB text-[1.3vw]"
              type="submit"
            >
              CRYPTO
            </button>
          </div>
          <div
            className="relative w-full h-fit col-start-2 border-2 border-white grid grid-flow-col auto-cols-[auto auto] hover:opacity-70 active:scale-95 hover:bg-lBlue active:bg-lBlue"
            onClick={() => {
              setPurchase("fiat");
              router.push("/fiat");
            }}
          >
            <button
              className="relative w-fit h-fit p-3 place-self-center col-start-1 text-white font-economicaB text-[1.3vw]"
              type="submit"
            >
              FIAT
            </button>
          </div>
        </div>
      );

    case "SELECT_CURRENCY":
      return (
        <div className="relative w-full h-fit row-start-3 grid grid-flow-col auto-cols-[auto auto] bg-red-600 cursor-pointer hover:opacity-70 active:scale-95">
          <button
            className="relative w-fit h-fit p-3 place-self-center col-start-1 text-black font-economicaB text-[1.3vw]"
            type="submit"
          >
            SELECT CRYPTO TOKEN
          </button>
        </div>
      );

    default:
      return (
        <div
          className="relative w-full h-fit row-start-3 grid grid-flow-col auto-cols-[auto auto] bg-red-600 cursor-pointer hover:opacity-70 active:scale-95"
          onClick={() => {
            setPayment("order");
            dispatch(
              setItem({
                actionName: item.name,
                actionDescription: item.description,
                actionMainImage: item.mainImage,
                actionQuantity: quantity,
                actionPrice: itemPrice.price,
                actionToken: itemPrice.token,
              })
            );
          }}
        >
          <button
            className="relative w-fit h-fit p-3 place-self-center col-start-1 text-black font-economicaB text-[1.3vw]"
            type="submit"
          >
            BUY NOW
          </button>
        </div>
      );
  }
};

export default PaymentButton;
