import { FunctionComponent, useState } from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { INFURA_GATEWAY } from "../../../lib/constants";

const Slider: FunctionComponent = (): JSX.Element => {
  const [blur, setBlur] = useState<boolean>(true);

  const imagesURI: string[] = [
    "QmSpAEvvmncSdFgksWikcNt4uYxmD7g7op3Yoq9PgPKMWC",
    "Qme8vMm6zfkXVctNLZh9zUdH7UYy8B27dnhr2YC6uvPL5H",
    "QmPbun9L5he9sC5PQRubbjyxbsG7AAcYFfVgbLR3eRCybC",
    "QmW3f3J9bMf3C1Qoh9V5kfXHYSscMivt4xyXzwGacQkrht",
    "Qmc2od1UCGKczWWmCTFx8DFpjXrdysrhugEdtHPbg6Synq",
    "QmVyej68mhdBbXqStcygmbigHYLUCQHVw7kQAWnFKs9kho",
    "QmbgGwV6vUpMxtL26w3br3UJx2t4tzw5yL3DL14zV7RjSV",
    "QmYqbX8gNkWBoauWJCyBqo6JD6tmK2JsJzM3fmRaEf2GxC",
    "QmYKGL47zbGqbiipdS3W8tNxbPLa7Qbdwgk4wM2jrsKaZ2",
    "QmY5911kd9hUoJyPJiiooVShdbXk8UV6P7gAEds9SjWq5h",
    "QmeBPwPQEZ7ETkPETUsnX7xArfCH8WTbK3cPgMmq1nv6at",
    "QmZwbm3DY7gKnrEX8e17n5N9MYexUqhqPLk6jfeacRbohk",
    "QmPo3ScRPcMGKKMJCKnk3stdXwVyvN2RJiDunwmbajrj2D",
    "QmP2ZZsbGanCjbAFVC58y36nVEndfDoP7LENrED1Z1pQoU",
    "QmfBjRYBFHcUHY5WzoHWX6cZP4Fw21p79EbT3cVVkRTQkU",
    "QmP2ZZsbGanCjbAFVC58y36nVEndfDoP7LENrED1Z1pQoU",
    "QmUiERxhe8dVEocNouyhKSYi9GSt4DdairR3rfWPGBhCJC",
    "QmSpAEvvmncSdFgksWikcNt4uYxmD7g7op3Yoq9PgPKMWC",
    "QmVyej68mhdBbXqStcygmbigHYLUCQHVw7kQAWnFKs9kho",
    "QmbgGwV6vUpMxtL26w3br3UJx2t4tzw5yL3DL14zV7RjSV",
    "QmdtU33FTK1nmsUYW1iWFG3ciHZq55jdPi5zb6zUhHURUC",
    "QmRF1ae8FVRsdQVneqydtXrgpVchJEaiYBn1ydXRFg42rT",
    "QmeTAqn6L59xmRtD7ZKGVuDzS23B3UvYJ2oj3mH51UcPKG",
    "QmWgn7f56SzJSSKcLuTTFj8FgBWHNeQPEwgkLkBzDmwnu4",
    "QmThXdUrEGu2RnmTMRUC7o4AEQvEMx5bJGeSCbvrfnq45R",
    "QmbLcV81vukDgUb1RRk5wndmWkpZyu9eZukEhgfRWrUxXS",
    "QmTEVMaauThwVq8NZD7oXJPGGPm5w47ZC5i2dXCNo2sgXi",
    "QmYKGL47zbGqbiipdS3W8tNxbPLa7Qbdwgk4wM2jrsKaZ2",
    "QmPo3ScRPcMGKKMJCKnk3stdXwVyvN2RJiDunwmbajrj2D",
    "QmNeX9SfEpxy8CEKc9sz8ezG4GL4HFwQe8FSGY5rYbwmcJ",
    "QmXEYb1NJWx988xdotU74PDPMWFPTb8rBv2PYDusp4GTdF",
    "QmXzJRJe6ZabKdDN63euBgrePVRMhNeHXAk6SfC9uVmZbo",
    "QmUKSxtvRxvQFrrCdT94qb94PPmm7arvF6kbArvioEWyy1",
    "QmPWLAXYvtAFJXeSumhEj3EzdRwb2xjYUvHmFPyR1ejDki",
    "QmYfj3sW4ztNkragTXcJzX1DJtUjj6U3RqVBSkAybgdnHg",
    "QmQKqHTTEH51FHs5vXxHmdkZDp7oSmGsfb6eshuyTQKQK3",
    "QmR711GNLhMV6cUnQ8stJuqV29TMhGQSqevPZ4toCoYc2N",
    "QmVmbM4TYSREZppbkZ8YAzXuUHCTKr7VWWJu9UjHLiccqK",
    "QmSmJoPmZWGRVsXQAvTJfkUH8kB9rZKZEFnAWN1xjPKLXP",
    "QmcMBbwnjytJuySyLrHj7Zf5p4KJaSpAUDz2YKCmCsUUsv",
    "QmcsDBggaiScuNWCcHJK9eksg1X4Edm85z65ppgv8PSRvm",
    "QmPRMRuoCiS7VzdUVNDFk8KhwjvBSmSCLSpoAb2S47b31R",
    "Qmap2Ti5g3me1iQMACwb4qqjJYMCRqtV1kQQ9TVoQscKoM",
    "QmbXKuZ5nSrXsnojuSPtBABLWXYa2VuQhP29vGKxhYPG9y",
    "Qmcwq7kzWLd2tLzPmvEuHSE6ubG7Pi9mbw2aYSyC1sg2g4",
    "QmaL1vCxU7GHqTcs7eL4xSS5dwBhs4eceVPf3rGfn6wphu",
    "QmXJibjQPgtZk8R4FmCRYd7dcbLkd2BkaxvLq9quY1yynj",
    "Qma11Vwn7Lzb26faiBhiQkkC5UDxC2pujg8LQgwp5J7qhR",
    "QmSJcXqmS63qnHXC47kJtj91cAZkV92b4pDZ2W8hJ35Vnv",
    "QmNmCfABKCpqjkDq2iuFwNYMcZdY8ihWSCJw67Ss6S14Ag",
    "Qma4zWy3ynGjiCDiAheY3JvLgqZdqgGrQ7k4rtLJ5DJajL",
    "QmT58dcrK9e4iNabNr9r4z1HohJKcDVX9kH1eQVFTiVnJe",
    "Qmej1BMpLDmXVGhbyvmd6jCnFdSmU8dtQACzDx82ct64D4",
    "QmSPuvRKfwNvmVwufHHpkStULSA5oXCbh5fStErUCUzc5u",
    "QmTtHDysQtuK9SRzwQA6iD6YYmqDPfw97q48T6xrEheqHJ",
    "QmXWBpn3xuJfEEznsLU8s5ZFeMfh8wqH44EC53rtwexELu",
    "Qmd9zZTVuc1ZjFLoJb7DFYU8BMvXGbC6z8HGtaZm5ALv4G",
    "Qmb7Nfsio4cWX48QjXXZQGtVwtT5H3SSKN3eCp8W1p7VZV",
    "QmayX1iJ4SFHC7Dc55K8MB9SCCBR5CDjGQwfdLDw5rym9b",
    "Qmc5iPKMVAXHVJ255USERmKjxe22d1yJ3MYRCJqJXyYc4g",
    "Qmd2TFqmoZVBzSzkH6KKoq4TueQERCRkMqkcush3vffJVJ",
    "QmYRetZwWFnSvRm43dngNUTfkovU8dCxpB5xaj4tWto6Ci",
    "QmNb4PsxKpatjtyzeScEg8WF2qL33X6Q3uqodfN7kVvVJt",
    "QmSkcLcrcrbZKMzkpmxkN1QmzJpPkWWxU6V6pMfDqS4NHg",
    "QmcrZA6FPB6SskQjRWMVCNYQnATMKZiHtGdbdLwAryXs3S",
    "QmNXkBDtKV25wScdxTqwvgT3GcUPHnQLb3XZ85aQuWjGxA",
    "QmZCi5rKoJCFPe1HupatmCPsNLKBtiiLXtizHnx2w8w8A1",
    "QmXze68kuD9VP3u7pXBxrj7NbV2td3jEVCzF5mxWmyTzLu",
    "QmdHwyuXr1WReAUaKNutG2TyxLuBNDmY1LQQ7RhxUrf9NQ",
    "QmcgNRB6CjCWVDxXEig1PpjPYiFMUip2Y88t6zFnkFNCVe",
    "QmZTFQsnyXejSkyGrFTZm8J32JcZKs2btaZddeo7n3QmCE",
    "Qme8uowSGSx3uU3BLxiiZMHasiQv7veywiWYGi8eQUoBmQ",
    "Qmcnj6oJRJMUPNEJvdVPiLfFXctDKsNT8EPiNbMMpRk6NS",
    "QmYwCMdsedbZ3SRtCCEqUYBJn2Lcdf2vABQhm7ScxUoUHd",
    "QmNvDugwUQ6BQTdSD6AXGNJBmomUxibxG7dKz1QTCtqK9D",
    "QmP1f9jSctxnRKwMaLP3LKFo23VQFoxjemrnjhAmNaaGZN",
    "QmWon4BEPF5b3mDfg9rSRs1sWsr2QbXweXDRvGPmTeh2kT",
    "QmWX3kETxRsW7Vx3yM9M7Sq7Uqg8Pz7ysymyYz1UmTJna4",
    "QmRKuE4MUo9dHS7GDzdpUky7SmtvsgR4Cc9TL2jkGeUm6r",
    "QmQurcZ2NSyVEasPEQ4YjyYJa89rPhLxeCArYNUugnSpBD",
    "QmX92wybeKHqqgL9jHgfwVMwvUHnwgHTwgkvSxcgzCHweh",
    "QmVjyPqXCaBF37fAj7BQQwjGx9FEtXW3B4E11NxHPDvVob",
    "QmVFBj9iJGjTxtz471x8NncDdt4rJpkSmRCevkuLDXZy5F",
    "QmY2d9PnioNiE2JbJCRWdmJAvoEVdNTeKCPXXrpQRxpJhs",
    "Qmc3H4HkmGrPQs845fhDf8WfSc2T86ynCYP7eREXv6fVJg",
    "QmSVHwLmkzvXp68nHv7rbwoYfNj6LxCz7BhmZfDS6pAxWo",
    "QmQh4Dubk6S6hC2KKTdLxj67sepa6ZDin8Qh6HRshgvj2E",
    "QmTYsxh1g9jzGEdGg54B9921jtMwuXJjtyjibtP4h4i5h9",
    "QmVa254PKH4mMVvo8U81F6fej9oWbaX2cSeX3NDAYPKXDV",
    "QmTeyvsFPW7GUkUSPWzrT7kBGLrp6ANPnmE9RmzK5VkGT3",
  ];

  return (
    <div className="min-h-72 h-72 flex relative w-full bg-offWhite cursor-empireA overflow-hidden pb-10">
      <Marquee className="flex" pauseOnHover pauseOnClick direction="right">
        {imagesURI.map((uri: string, index: number) => {
          return (
            <div
              key={index}
              className={`min-h-60 min-w-60 h-60 w-60 relative mr-4 bg-lightYellow ${
                blur && "blur-sm animate-unblur"
              }`}
            >
              <Image
                src={`${INFURA_GATEWAY}/ipfs/${uri}`}
                objectFit="cover"
                layout="fill"
                priority
                draggable={false}
                onLoadingComplete={() => setBlur(false)}
              />
            </div>
          );
        })}
      </Marquee>
    </div>
  );
};

export default Slider;
