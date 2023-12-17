import { AnyAction, Dispatch } from "redux";
import { setInteractError } from "../../redux/reducers/interactErrorSlice";
import { setIndexer } from "../../redux/reducers/indexerSlice";

const errorChoice = async (
  err: any,
  runner: (() => Promise<void>) | (() => void),
  dispatch: Dispatch<AnyAction>
) => {
  if (err?.message?.includes("User rejected the request")) return;
  if (
    !err?.messages?.includes("Block at number") &&
    !err?.message?.includes("could not be found")
  ) {
    dispatch(setInteractError(true));
    console.error(err.message);
  } else {
    dispatch(
      setIndexer({
        actionOpen: true,
        actionMessage: "Successfully Indexed",
      })
    );

    if (runner() instanceof Promise) {
      await runner();
    } else {
      runner();
    }

    setTimeout(() => {
      dispatch(
        setIndexer({
          actionOpen: false,
          actionMessage: undefined,
        })
      );
    }, 3000);
  }
};

export default errorChoice;
