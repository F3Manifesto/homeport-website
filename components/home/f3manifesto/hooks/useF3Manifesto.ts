import { useState } from "react";
import { UseF3ManifestoResults } from "../../../../types/general.types";
import shuffle from "shuffle-array";

const useF3Manifesto = (): UseF3ManifestoResults => {
  const [newImages, setNewImages] = useState<string[] | undefined>([
    "main20",
    "main19",
    "main3",
    "main23",
    "main12",
  ]);
  const [newImagesURI, setNewImagesURI] = useState<string[]>([
    "bafybeiatntwh6s3tljzqza7oigcp6r33zabaihfnbnhyykwroob7dkcfai",
    "bafybeideh7fcwexbilzdrowh65x5nlc7wy3e5242hyqj4afjpc6n3ott4y",
    "bafybeibyoeyov2cfamxr2cj6dznec2vygjsxoczinwp6q2fufwypv5jyru",
    "bafybeigw5ojalpbjl7h4ltlfx35ej7mg5wzxvzk7squwfnfteucivoxvpa",
    "bafybeie2x3ag2hdeazuzq43tnuo4yasjbhyqtvndwxkkxoumzd4pz7qrj4",
  ]);
  const [mainImage, setMainImage] = useState<string>("14");
  const images: string[] = [
    "main1",
    "main2",
    "main3",
    "main4",
    "main5",
    "main6",
    "main7",
    "main8",
    "main9",
    "main10",
    "main11",
    "main12",
    "main13",
    "main14",
    "main15",
    "main16",
    "main17",
    "main18",
    "main19",
    "main20",
    "main21",
    "main22",
    "main23",
    "main24",
  ];

  const imagesURI: string[] = [
    "bafybeibkrioxv5ixbar4bfbp4ebebgmzyan7hir6y3ewoagncnw5oeb46m",
    "bafybeiblkvqvyyatjfbfl55o3clu7a5qki6lqkzbnxbhwm6tyyczxwgxeu",
    "bafybeibyoeyov2cfamxr2cj6dznec2vygjsxoczinwp6q2fufwypv5jyru",
    "bafybeibuccupnqpihgjvofbmqtwujmexrur5eo4eaiw7jyeq2ma7h2wjra",
    "bafybeihfzvrfco7ptmko7ob7ev3dk5w5d3da6au5g4zdyehlft5ypt55qi",
    "bafybeiekvycjplspjyozmhdbf3xzbpt6pbyx2lwq5huofqc4m766nsiyaq",
    "bafybeiejaqhqrxlrmclj3d6qxbm5mqxily7whsmxre6deprnxmj2v2jf4y",
    "bafybeiarvypfoa3hotrp7c6mxe2culdyzduufg5xxmdlvcx2chtprxdelu",
    "bafybeibxskghv2s624farpmq3toleagsm53ur66ozjafqzmznwkna6kjra",
    "bafybeif6xz42hva4li7t7br2nvhf4l3hpoabmgtdhybbkdkveo37fndr54",
    "bafybeibjrx6fl7zknyuvirnmjzvyiqexz2xgvir2ykzerf3oquhr4vnksm",
    "bafybeie2x3ag2hdeazuzq43tnuo4yasjbhyqtvndwxkkxoumzd4pz7qrj4",
    "bafybeibjg4xfoqed7sashhshbpub54fsvmixbuqcg7gerpfdgdrj7mz43q",
    "bafybeihiaamv25qz2z42x5p3aq2acvbinysmlpucaeadb4nr7gya4uzcsy",
    "bafybeiawxuc6e4aakmxujjxyscykplffnmr2kvnpndnfoixvf4yq6t7xby",
    "bafybeibifdoh4c4k4d52727iwzd3ryf6lhsbha5sng7p4udkjensukxhd4",
    "bafybeibcit3fxw26ufiwfbzugpgbslfxasxf4wg6txufiiq434573vlwwa",
    "bafybeid53vh52kal3sta33nxwmpf4ujhrudzuefs54vcllb356uwqntgpm",
    "bafybeideh7fcwexbilzdrowh65x5nlc7wy3e5242hyqj4afjpc6n3ott4y",
    "bafybeiatntwh6s3tljzqza7oigcp6r33zabaihfnbnhyykwroob7dkcfai",
    "bafybeifcendjrudop32iwbfyebq2yckj7xbrbwxum6fe2e2bwilh22kely",
    "bafybeiec25hefq3rrg5eecsphexmhvzqeyd5muse6drwosq7lhgw5zueie",
    "bafybeigw5ojalpbjl7h4ltlfx35ej7mg5wzxvzk7squwfnfteucivoxvpa",
    "bafybeihapfukzaurgb6rcv2fa3jthczwujqzzxrt5m26zyhoorqfawkkam",
  ];

  const blurred: string[] = [
    "bafybeiafft325s7mbx4y3dxqj2a3hl2okzwyq7tlwwvd6r34nn7chgtq4m",
    "bafybeigpdpshhdcpnabyemmegqggt4svtkbgedhdqiirkk74e56elhxyqm",
    "bafybeifml4jmvdjj6kahmqnuuorv473w7yi3lvdwflphepogjjv4fcjhtu",
    "bafybeibsx5md4ouqgxcwrcs546qptxck6kt4l7eb6in4ngdynf6psz3rwy",
    "bafybeigd2cm5isc5rp24zpzywramdaxsmxg2uxlpbg5uq6n4pef7iiue7u",
    "bafybeidj3tbpggsdnjcfdnnvqd7davs2qoacef3fb4ut36sjsl5gkb637u",
    "bafybeibqhmghgx2th53rztdtxcvctu46mlt65pgzzwdes5p5h2mwsaecoe",
    "bafybeicf25gxxkmzkvd5sqrboiamlz3qejggmzlofjggq6wlwgrz6ezzte",
    "bafybeiffbumautoadyywbuvheoreg3ld45thclawlcwkrqxn6x3f4asn6a",
    "bafybeif6xeoimhr2bmw4fhbchxdut6e3ia5pohju7nihdt23je7xsbpnfu",
    "bafybeidckzxr3mxwodwm4e2obdwleqynycghho74fh5smy5cfvlzduvppi",
    "bafybeibg7ogfmzgrxsv42jlxx4bc6vkj6givm3v6trfobc6j7qcq6gatbe",
    "bafybeifqt7ghwft3q4dq6fb3kf6ziapu3bi7ghvexzivfocsyhiqlj2ega",
    "bafybeifrk4r6aiwpflze7mkkvo3dar2d7dansskrxpkfjvpgvm6putjgrq",
    "bafybeicbc57tb44qdcwws7ryszhm4vd3iudjpe6dpbjrubujfhuyq5t3si",
    "bafybeigmnaca4dvzdb4m4yrfg4x47fdy2mnnuze2mymsptnq7xjqds356i",
    "bafybeibwils533ehxkt4zz4j7obbomcn5iulghunpnuxly5i46anvbyr74",
    "bafybeihl5p6qxez6i4eyn7vdr3esxrrxk3bmw6p5agx7hdwmtqbcf6unmq",
    "bafybeihjjr7omi33tarp7vqvzjs56u35gzdesaxz4ytxhon4cqkh4ybtei",
    "bafybeidod24hstfoxovsvjht66fkrmphka6wi6rsrmy2r6wn3dpzqj2fwu",
    "bafybeiaiywchi4alycaztbzg5sm47xn7vxhggy5lbzcxlugbaxw22gogpy",
    "bafybeiavsdbqngvvu7dgxfqm6tmbcqiq7vh56ripx2wgoxusb2ejx62mkq",
    "bafybeidezeuppyfcnuuwdct6xk6uetbnnr3hcfembdi5omasvxdlywtwum",
    "bafybeiac53b5fmjl7enefxvjsbusmoqa2hjg2yeb6nvs76r6d4jqije7c4",
  ];

  const refreshImages = (): void => {
    let newImages: string[] = [];
    let newImagesURI: string[] = [];
    const AllNumbers: number[] = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23,
    ];
    shuffle<number>(AllNumbers);
    for (let i = 0; i < 5; i++) {
      newImages.push(images[AllNumbers[i]]);
      newImagesURI.push(imagesURI[AllNumbers[i]]);
    }
    setNewImages(newImages);
    setNewImagesURI(newImagesURI);
  };

  const viewMainImage = (e: any): void => {
    let src: string = e.target.src;
    if (src.split("main")[1].charAt(1) === ".") {
      src = src.split("main")[1].charAt(0);
    } else {
      src = src.split("main")[1].charAt(0) + src.split("main")[1].charAt(1);
    }
    setMainImage(src);
  };

  return {
    refreshImages,
    viewMainImage,
    newImages,
    mainImage,
    blurred,
    imagesURI,
    newImagesURI,
  };
};

export default useF3Manifesto;
