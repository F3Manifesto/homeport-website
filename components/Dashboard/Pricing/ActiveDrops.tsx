import { FunctionComponent } from "react";
import { AiOutlineUngroup } from "react-icons/ai";
import { ActiveDropsProps, DropInterface } from "../../../types/general.types";
import { useDispatch } from "react-redux";
import { setActive } from "../../../redux/reducers/activeSlice";

const ActiveDrops: FunctionComponent<ActiveDropsProps> = ({
  data,
}): JSX.Element => {
  const dispatch = useDispatch();
  return (
    <div className="relative w-fit h-fit row-start-2 grid grid-flow-col auto-cols-[auto auto] pt-5">
      <div className="overflow-x-scroll grid grid-flow-col auto-cols-auto place-self-center gap-4 relative w-full max-h-[120vw] col-start-1">
        {data?.map((item: DropInterface, index: number) => {
          return (
            <div
              className="relative w-60 h-52 bg-grayBlue font-economica text-lg grid grid-flow-col auto-cols-[auto auto] group cursor-pointer"
              key={index}
            >
              <div className="relative w-fit h-fit place-self-center col-start-1 text-black">
                {item.title}
              </div>
              {
                <div className="absolute group-hover:visible invisible bg-black w-full h-full bg-opacity-80 grid grid-flow-col auto-cols-[auto auto]">
                  <div className="col-start-1 relative w-fit h-fit grid grid-flow-col auto-cols-[auto auto] gap-5 place-self-center">
                    <div className="relative w-fit h-fit col-start-1 place-self-center">
                      <AiOutlineUngroup
                        size={25}
                        color="white"
                        className="hover:scale-90 active:scale-90"
                        onClick={() => dispatch(setActive(item.title))}
                      />
                    </div>
                  </div>
                </div>
              }
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActiveDrops;
