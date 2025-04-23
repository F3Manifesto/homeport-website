import { INFURA_GATEWAY, GROVE_GATEWAY } from "../constants";

export const handleProfilePicture = (pic: string): string => {
  if (pic?.includes("https://")) {
    return pic;
  } else if (pic?.includes("ipfs://")) {
    return `${INFURA_GATEWAY}/ipfs/${pic?.split("ipfs://")?.[1]}`;
  } else if (pic?.includes("lens://")) {
    return `${GROVE_GATEWAY}${pic?.split("lens://")?.[1]}`;
  }

  return `${INFURA_GATEWAY}/ipfs/QmX5Uk9WeqsVHoNQhUP3fzTasv3J6zuat4L5L6zmaTVzBW`;
};
