import { encode } from "blurhash";
import { useEffect } from "react";

const useBlurHash = () => {
  
    const loadImage = async (src: any): Promise<string> =>
    new Promise( (resolve, reject) => {
      const img: any =  new Image();
      img.onload = () => resolve(img);
      img.onerror = (...args: any) => reject(args);
      img.src = src;
    });

  const getImageData = (image: any) => {
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext("2d");
    context?.drawImage(image, 0, 0);
    return context?.getImageData(0, 0, image.width, image.height);
  };

  const encodeImageToBlurhash = async (imageUrl: any): Promise<string> => {
    const image = await loadImage(imageUrl);
    const imageData: any = getImageData(image);
    return encode(imageData.data, imageData.width, imageData.height, 4, 4);
  };

  return {encodeImageToBlurhash}
};

export default useBlurHash;
