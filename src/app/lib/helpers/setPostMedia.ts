import { ChangeEvent, SetStateAction } from "react";

const setPostMedia = async (
  e: ChangeEvent<HTMLInputElement>,
  setMakePostComment: (
    e: SetStateAction<{
      content: string;
      images: string[];
    }>
  ) => void,
  setContentLoading: (e: SetStateAction<boolean>) => void
) => {
  if (!e.target.files) return;
  setContentLoading(true);
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
    setMakePostComment((prev) => ({
      ...prev,
      images: [...(prev?.images || []), ...newImages],
    }));
  });
  setContentLoading(false);
};

export default setPostMedia;
