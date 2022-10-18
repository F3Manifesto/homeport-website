import Image from "next/image";
import { FunctionComponent } from "react";

const Poster: FunctionComponent = (): JSX.Element => {
  return (
    <div className="relative w-full h-[275vh] relative flex bg-offWhite">
      <div className="w-full h-full absolute top-10">
        <Image
          src="/images/poster.png"
          priority
          height={768}
          width={512}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="w-fit h-fit absolute bottom-20 right-20 grid grid-rows-2 grid-flow-col gap-6">
        <div className="h-80 w-80 border border-lightYellow relative col-start-2 row-start-2">
          <Image
            src="/images/croquis/croq2.png"
            priority
            objectFit="cover"
            layout="fill"
          />
        </div>
        <div className="h-80 w-80 border border-lightYellow relative col-start-1 row-start-2">
          <Image
            src="/images/croquis/croq1.png"
            priority
            objectFit="cover"
            layout="fill"
          />
        </div>
        <div className="h-80 w-80 border border-lightYellow relative col-start-2 row-start-1">
          <Image
            src="/images/croquis/croq3.png"
            priority
            objectFit="cover"
            layout="fill"
          />
        </div>
      </div>
    </div>
  );
};

export default Poster;
