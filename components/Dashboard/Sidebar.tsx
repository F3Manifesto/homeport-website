import { FunctionComponent } from "react";
import useDashBoard from "./hooks/useDashboard";

const SideBar: FunctionComponent = (): JSX.Element => {
  const { sidebar, setSection } = useDashBoard();
  return (
    <div className="relative col-start-1 w-fit h-fit grid grid-flow-row auto-rows-[auto auto] gap-6 px-10 py-16">
      {sidebar.map((item: string, index: number) => {
        return (
          <div
            key={index}
            className={`row-start-${
              index + 1
            } relative w-fit h-fit grid grid-flow-row auto-rows-[auto auto]`}
          >
            <div
              className="relative w-16 h-16 bg-grayBlue rounded-xl row-start-1 hover:scale-105 active:scale-95 cursor-pointer"
              onClick={() =>
                setSection(item.toUpperCase().replaceAll(" ", "_"))
              }
            ></div>
            <div className="relative row-start-2 text-center">{item}</div>
          </div>
        );
      })}
    </div>
  );
};

export default SideBar;
