import { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setType } from "../../redux/reducers/dashSlice";
import { RootState } from "../../redux/store";

const SideBar: FunctionComponent = (): JSX.Element => {
  const sidebar: string[] = [
    "drafts",
    "drop types",
    "inventory",
    "pricing",
    "fulfillment",
    "admin"
  ];
  const dispatch = useDispatch();
  const dashSection = useSelector(
    (state: RootState) => state.app.dashReducer.value
  );
  return (
    <div className="relative col-start-1 w-fit h-fit grid grid-flow-row auto-rows-[auto auto] gap-6 px-10 py-16">
      {sidebar.map((item: string, index: number) => {
        const itemDispatch = item?.toUpperCase().replaceAll(" ", "_");
        return (
          <div
            key={index}
            className={`row-start-${
              index + 1
            } relative w-fit h-fit grid grid-flow-row auto-rows-[auto auto]`}
          >
            <div
              className={`relative w-16 h-12 rounded-xl row-start-1 hover:scale-105 active:scale-95 cursor-pointer hover:bg-grayPink ${
                dashSection === itemDispatch ? "bg-grayPink" : "bg-grayBlue"
              }`}
              onClick={() => dispatch(setType(itemDispatch))}
            ></div>
            <div className="relative row-start-2 text-center">{item}</div>
          </div>
        );
      })}
    </div>
  );
};

export default SideBar;
