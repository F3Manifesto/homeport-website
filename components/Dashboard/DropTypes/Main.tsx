import { FunctionComponent } from "react";
import { DropInterface, MainDropTypeProps } from "../../../types/general.types";
import { useDispatch } from "react-redux";
import { setDisplay } from "../../../redux/reducers/displaySlice";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdModeEdit } from "react-icons/md";

const Main: FunctionComponent<MainDropTypeProps> = ({
  isLoading,
  isError,
  data,
}): JSX.Element => {
  const dispatch = useDispatch();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }
  return (
    <div className="relative col-start-2 w-full h-fit grid grid-flow-row auto-rows-[auto auto] py-8">
      <div className="relative w-fit h-fit row-start-1 grid grid-cols-4 auto-rows-auto place-self-center pt-10 gap-4">
        {data?.map((item: DropInterface, index: number) => {
          return (
            <div
              className="relative w-80 h-60 bg-grayBlue font-economica text-lg grid grid-flow-col auto-cols-[auto auto] group cursor-pointer"
              key={index}
            >
              <div className="relative w-fit h-fit place-self-center col-start-1 text-black">
                {item.title}
              </div>
              {
                <div className="absolute group-hover:visible invisible bg-black w-full h-full bg-opacity-80 grid grid-flow-col auto-cols-[auto auto]">
                  <div className="col-start-1 relative w-fit h-fit grid grid-flow-col auto-cols-[auto auto] gap-5 place-self-center">
                    <div className="relative w-fit h-fit col-start-1 place-self-center">
                      <MdModeEdit
                        size={25}
                        color="white"
                        className="hover:scale-90 active:scale-90"
                        onClick={() =>
                          dispatch(
                            setDisplay({
                              actionValue: "DROP_TYPES_UPDATE",
                              actionId: item._id,
                            })
                          )
                        }
                      />
                    </div>
                    <div className="relative w-fit h-fit col-start-2 place-self-center">
                      <RiDeleteBin5Fill
                        size={25}
                        color="white"
                        className="hover:scale-90 active:scale-90"
                      />
                    </div>
                  </div>
                </div>
              }
            </div>
          );
        })}
        <span className="relative w-80 h-60 font-economica text-lg grid grid-flow-col auto-cols-[auto auto] border-white/50 border-2 border-dashed">
          <div
            className="relative w-fit h-fit col-start-1 grid grid-flow-col auto-cols-[auto auto] bg-grayBlue place-self-center px-10 py-1 cursor-pointer hover:scale-105 active:scale-95"
            onClick={() =>
              dispatch(setDisplay({ actionValue: "DROP_TYPES_ADD" }))
            }
          >
            <div className="relative w-fit h-fit col-start-1 place-self-center text-black">
              new drop type
            </div>
          </div>
        </span>
      </div>
    </div>
  );
};

export default Main;
