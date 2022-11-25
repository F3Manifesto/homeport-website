import Image from "next/image";
import { FunctionComponent, useState } from "react";

const Poster: FunctionComponent = (): JSX.Element => {
  const [blur, setBlur] = useState<boolean>(true);
  return (
    <div className="relative w-full min-h-[275vh] h-[275vh] relative flex bg-offWhite">
      <div
        className={`w-full h-full absolute top-10 ${
          blur && "blur-sm animate-unblur"
        }`}
      >
        <Image
          src={`https://bafybeigwgu5p5oxsdhm2lybi7fvfjnvhulcn6qcxb7lte3hyr2ekb6i4xy.ipfs.w3s.link/poster.png`}
          priority
          placeholder="blur"
          blurDataURL={`https://bafybeihktytzbsre6xpfcat6bl6rcymthzqyaflpil3n34ds43jqdfsriu.ipfs.w3s.link/poster.png`}
          layout="fill"
          objectFit="cover"
          objectPosition={"left"}
          onLoadingComplete={() => setBlur(false)}
        />
      </div>
      <div className="relative w-full h-full min-h-full">
        <div className="absolute bottom-20 right-10">
          <div className="w-full min-h-fit h-fit min-w-full relative justify-items-end justify-content-end grid auto-rows-auto grid-flow-col gap-6">
            <div className="relative col-start-1 md:col-start-2 md:row-start-2 row-start-3 w-fit h-fit self-end">
              <div
                className={`w-40 h-40 galaxy:h-80 galaxy:w-80 border border-lightYellow relative ${
                  blur && "blur-sm animate-unblur"
                }`}
              >
                <Image
                  src={`https://bafybeifgpmfcfihd4ytk7cs24b7nghrnwhwzookxi6lwvk6bsztbnncotq.ipfs.w3s.link/croq2.png`}
                  priority
                  placeholder="blur"
                  blurDataURL={`https://bafybeiabb4mip7b4d4lnnaf5oe7grl7xd6ogxecek7lsit45ugz5lj4u4y.ipfs.w3s.link/croq2.png`}
                  objectFit="cover"
                  layout="fill"
                  onLoadingComplete={() => setBlur(false)}
                />
              </div>
            </div>
            <div className="relative col-start-1 row-start-2 w-fit h-fit self-end">
              <div
                className={`w-40 h-40 galaxy:h-80 galaxy:w-80 border border-lightYellow relative ${
                  blur && "blur-sm animate-unblur"
                }`}
              >
                <Image
                  src={`https://bafybeiaw7bfnwo5fog5yacnl6l4h53tpeqyulh4mb5qxiqoyviwyrpcppe.ipfs.w3s.link/croq1.png`}
                  priority
                  placeholder="blur"
                  blurDataURL={`https://bafybeihccr2koswczllxtlbavbpso7jqnqdtxngvp2qw7gojb3ix3lkpbu.ipfs.w3s.link/croq1.png`}
                  objectFit="cover"
                  layout="fill"
                  onLoadingComplete={() => setBlur(false)}
                />
              </div>
            </div>
            <div className="relative col-start-1 md:col-start-2 row-start-1 w-fit h-fit self-end">
              <div
                className={`w-40 h-40 galaxy:h-80 galaxy:w-80 border border-lightYellow relative ${
                  blur && "blur-sm animate-unblur"
                }`}
              >
                <Image
                  src={`https://bafybeiewgiuqvm3epddoe4is5c63n323vyiygeytmuzm3g2yvsk5plpwce.ipfs.w3s.link/croq3.png`}
                  priority
                  placeholder="blur"
                  blurDataURL={`https://bafybeibsjouddrarutkyrzmqmr2uoqeijlkbwn5mphrgz3rjoaendzz7oy.ipfs.w3s.link/croq3.png`}
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
