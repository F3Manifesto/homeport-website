import { FunctionComponent } from "react";
import { SpecificationsProps } from "../../types/general.types";

const Specifications: FunctionComponent<SpecificationsProps> = ({item}): JSX.Element => {
  return (
    <div className="relative w-full h-full grid grid-flow-rows auto-rows-[auto auto]">
      <div className="row-start-1 relative w-full h-full text-white pt-28 pb-10 px-10 grid grid-flow-rows auto-rows-[auto auto]">
        <div className="relative w-fit h-fit row-start-1 font-libB pb-10">
          UNIT SPECIFICATIONS
        </div>
        <div className="relative w-fit h-fit row-start-2 font-libR pb-6">
          {item.name}
        </div>
        <div className="relative w-full h-full row-start-3 font-libR grid grid-flow-col auto-cols-[auto auto] gap-36 pb-12">
          <div className="relative w-fit h-fit col-start-1">
            SOURCE PERSISTENCE
          </div>
          <div className="relative w-fit h-fit col-start-2 pl-1.5">
            SYNTH TRAITS
          </div>
        </div>
        <div className="relative w-full h-full row-start-4 grid grid-flow-col auto-cols-[auto auto]">
          <div className="relative w-full h-full col-start-1 grid grid-flow-row auto-rows-[auto auto] gap-4">
            <div className="relative w-full h-full row-start-1 grid grid-flow-row auto-rows-[auto auto]">
              <div className="relative w-fit h-fit row-start-1 font-libB">
                universal resource identifier
              </div>
              <div className="relative w-fit h-fit row-start-2 font-libR">
                ipfs.pixura.io/ipfs/QmUyARmq5RUJk5zt7KUeaMLYB8SQbKHp3Gdqy5WSxRtPNa/ReplaceThis.jpg
              </div>
            </div>
            <div className="relative w-full h-full row-start-2 grid grid-flow-row auto-rows-[auto auto]">
              <div className="relative w-fit h-fit row-start-1 font-libB">
                dimensions
              </div>
              <div className="relative w-fit h-fit row-start-2 font-libR">
                7200 x 10800
              </div>
            </div>
            <div className="relative w-full h-full row-start-3 grid grid-flow-row auto-rows-[auto auto]">
              <div className="relative w-fit h-fit row-start-1 font-libB">
                dpi
              </div>
              <div className="relative w-fit h-fit row-start-2 font-libR">
                300
              </div>
            </div>
            <div className="relative w-full h-full row-start-4 grid grid-flow-row auto-rows-[auto auto]">
              <div className="relative w-fit h-fit row-start-1 font-libB">
                mimeType
              </div>
              <div className="relative w-fit h-fit row-start-2 font-libR">
                image/jpeg
              </div>
            </div>
            <div className="relative w-full h-full row-start-5 grid grid-flow-row auto-rows-[auto auto]">
              <div className="relative w-fit h-fit row-start-1 font-libB">
                license
              </div>
              <div className="relative w-fit h-fit row-start-2 font-libR">
                cc0
              </div>
            </div>
          </div>
          <div className="relative w-full h-full col-start-2 grid grid-flow-row auto-rows-[auto auto] font-libR">
            <div className="relative w-fit h-fit row-start-1 pb-10">PROPS</div>
            <div className="relative w-fit h-fit row-start-2 text-xs">
              Futuristic city, machine illustration,
            </div>
            <div className="relative w-fit h-fit row-start-3 text-xs">
              Neon lights, lucid oscillator,
            </div>
            <div className="relative w-fit h-fit row-start-4 text-xs">
              Young adult female streetwear fashion model,
            </div>
            <div className="relative w-fit h-fit row-start-5 text-xs">
              Epic scale, reflective surfaces,
            </div>
            <div className="relative w-fit h-fit row-start-6 text-xs">
              Soft gradient background,
            </div>
            <div className="relative w-fit h-fit row-start-7 text-xs">
              Scientific astronomy futuristic oscilloscope
            </div>
            <div className="relative w-fit h-fit row-start-8 text-xs">
              1970s lo-fi sci-fi hyperrealist,
            </div>
            <div className="relative w-fit h-fit row-start-9 text-xs">
              Neopunk, holographic,
            </div>
            <div className="relative w-fit h-fit row-start-10 text-xs">
              New merchant class,
            </div>
            <div className="relative w-fit h-fit row-start-11 text-xs">
              Futurism, concept art
            </div>
          </div>
          <div className="relative w-full h-full col-start-3 grid grid-flow-row auto-rows-[auto auto] font-libR">
            <div className="relative w-fit h-fit row-start-1 pb-10">
              COMPARATIVE WEIGHTS
            </div>
            <div className="relative w-fit h-fit row-start-2 text-xs">1:1</div>
            <div className="relative w-fit h-fit row-start-3 text-xs">1:1</div>
            <div className="relative w-fit h-fit row-start-4 text-xs">1:1</div>
            <div className="relative w-fit h-fit row-start-5 text-xs">1:1</div>
            <div className="relative w-fit h-fit row-start-6 text-xs">1:1</div>
            <div className="relative w-fit h-fit row-start-7 text-xs">1:1</div>
            <div className="relative w-fit h-fit row-start-8 text-xs">1:1</div>
            <div className="relative w-fit h-fit row-start-9 text-xs">1:1</div>
            <div className="relative w-fit h-fit row-start-10 text-xs">1:1</div>
            <div className="relative w-fit h-fit row-start-11 text-xs">1:1</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Specifications;
