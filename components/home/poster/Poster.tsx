import Image from "next/image";
import { FunctionComponent, useState } from "react";

const Poster: FunctionComponent = (): JSX.Element => {
  const [blur, setBlur] = useState<boolean>(true);
  return (
    <div className="relative w-full min-h-[275vh] h-[275vh] relative flex bg-offWhite">
      <div className={`w-full h-full absolute top-10 ${blur && "blur-sm animate-unblur"}`}>
        <Image
          src="/images/poster.png"
          priority
          height={768}
          width={512}
          placeholder="blur"
          blurDataURL="base64"
          layout="fill"
          objectFit="cover"
          objectPosition={"left"}
          onLoadingComplete={() => setBlur(false)}
        />
      </div>
      <div className="relative w-full h-full min-h-full">
        <div className="absolute bottom-20 right-10">
          <div className="w-full min-h-fit h-fit min-w-full relative justify-items-end justify-content-end grid auto-rows-[auto auto] grid-flow-col gap-6">
            <div className="relative col-start-1 md:col-start-2 md:row-start-2 row-start-3 w-fit h-fit self-end">
              <div className={ `h-80 w-80 border border-lightYellow relative ${blur && "blur-sm animate-unblur"}`}>
                <Image
                  src="/images/croquis/croq2.png"
                  priority
                  placeholder="blur"
                  blurDataURL="base64"
                  objectFit="cover"
                  layout="fill"
                  onLoadingComplete={() => setBlur(false)}
                />
              </div>
            </div>
            <div className="relative col-start-1 row-start-2 w-fit h-fit self-end">
              <div className={`h-80 w-80 border border-lightYellow relative ${blur && "blur-sm animate-unblur"}`}>
                <Image
                  src="/images/croquis/croq1.png"
                  priority
                  placeholder="blur"
                  blurDataURL="base64"
                  objectFit="cover"
                  layout="fill"
                  onLoadingComplete={() => setBlur(false)}
                />
              </div>
            </div>
            <div className="relative col-start-1 md:col-start-2 row-start-1 w-fit h-fit self-end">
              <div className={`h-80 w-80 border border-lightYellow relative ${blur && "blur-sm animate-unblur"}`}>
                <Image
                  src="/images/croquis/croq3.png"
                  priority
                  placeholder="blur"
                  blurDataURL="base64"
                  objectFit="cover"
                  layout="fill"
                  onLoadingComplete={() => setBlur(false)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Poster;
