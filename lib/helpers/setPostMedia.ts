import { ChangeEvent, SetStateAction } from "react";
import { MakePostComment } from "../../types/general.types";

const setPostMedia = async (
  e: ChangeEvent<HTMLInputElement>,
  setMakePostComment: (e: SetStateAction<MakePostComment[]>) => void,
  setContentLoading: (e: SetStateAction<boolean[]>) => void,
  index: number
) => {
  if (!e.target.files) return;

  setContentLoading((prev) => {
    const arr = [...prev];
    arr[index] = true;
    return arr;
  });
  let types: string[] = [];
  const imageReaders = Array.from(e.target.files).map((file) => {
    types.push(file.type);
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    });
  });

  await Promise.all(imageReaders).then((newImages: string[]) => {
    setMakePostComment((prev) => {
      const arr = [...(prev || [])];
      arr[index] = {
        ...(arr[index] || {}),
        images: [...(prev[index]?.images || []), ...newImages],
      };
      return arr;
    });
  });
  setContentLoading((prev) => {
    const arr = [...(prev || [])];
    arr[index] = false;
    return arr;
  });
};

export default setPostMedia;
