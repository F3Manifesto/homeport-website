import { useQuery, useQueryClient } from "react-query";
import { addProduct, getProducts } from "../../../../lib/helpers";
import { useMutation } from "react-query";
import { FormEvent, useContext, useState } from "react";
import {
  ProductInterface,
  UseAddProductResult,
} from "../../../../types/general.types";
import { useDispatch, useSelector } from "react-redux";
import { setDropType } from "../../../../redux/reducers/dropTypeSlice";
import { RootState } from "../../../../redux/store";
import { setDropFormat } from "../../../../redux/reducers/dropFormatSlice";
import { GlobalContext } from "../../../../pages/_app";

const useAddProduct = (): UseAddProductResult => {
  const dispatch = useDispatch();
  const [imageUploading, setImageUploading] = useState<boolean>(false);
  const dropTypeName = useSelector(
    (state: RootState) => state.app.dropTypeReducer.value
  );
  const dropFormatArray = useSelector(
    (state: RootState) => state.app.dropFormatReducer.value
  );
  const { isLoading, isError, data } = useQuery("products", getProducts);
  const [productSuccess, setProductSuccess] = useState<boolean>(false);
  const dropFormat: string[] = [
    "Poster",
    "Shirt",
    "Glyphs",
    "Hoodie",
    "Sticker Pack",
    "Backpack",
    "Shoes",
    "Jacket",
    "Tote Bag",
    "Art Canvas",
    "Game Assets",
    "Record Cover",
    "Zine",
  ];

  const [openDropDown, setOpenDropDown] = useState<boolean>(false);
  const [mappedMainFile, setMappedMainFile] = useState<string | undefined>();
  const { setFeaturedFiles, setMainFile } = useContext(GlobalContext);
  const [mappedFeaturedFiles, setMappedFeaturedFiles] = useState<string[]>([]);
  let newDropFormatArray: string[] = [];

  const handleDropFormatArray = (e: FormEvent): void => {
    if (dropFormatArray.includes((e.target as HTMLFormElement).value)) {
      newDropFormatArray = dropFormatArray.filter(
        (value) => (e.target as HTMLFormElement).value !== value
      );
      dispatch(setDropFormat(newDropFormatArray));
    } else {
      newDropFormatArray = dropFormatArray.concat(
        (e.target as HTMLFormElement).value
      );
      dispatch(setDropFormat(newDropFormatArray));
    }
  };
  const queryClient = useQueryClient();
  const addMutation = useMutation(addProduct, {
    onSuccess: async () => {
      setProductSuccess(true);
      queryClient.prefetchQuery("products", getProducts);
    },
  });

  const handleProductSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (dropTypeName === "Select Drop Type") {
      alert("Please select drop type");
      return;
    } else if (dropFormatArray?.length === 0) {
      alert("Please select one or multiple drop formats");
      return;
    } else {
      const productTypeData: ProductInterface = {
        name: (e.target as HTMLFormElement).productName.value,
        description: (e.target as HTMLFormElement).productDescription.value,
        dropType: dropTypeName,
        dropFormat: dropFormatArray,
        quantity: (e.target as HTMLFormElement).quantity.value,
        mainImage: mappedMainFile,
        featuredImages: mappedFeaturedFiles,
        slug: (e.target as HTMLFormElement).productName.value
          .replace(/ /g, "-")
          .replace(/[^\w-/]+/g, "")
          .toLowerCase(),
      };
      addMutation.mutate(productTypeData);
      setMainFile(undefined);
      setFeaturedFiles([]);
      (e.target as HTMLFormElement).reset();
      dispatch(setDropFormat([]));
      dispatch(setDropType("Select Drop Type"));
    }
  };

  const showFileMainImage = (e: FormEvent, name: string): void => {
    if (name === "MainImage") {
      setMainFile((e.target as HTMLFormElement).files[0]);
    } else if (name === "FeaturedImages") {
      if ((e.target as HTMLFormElement).files?.length > 4) {
        alert("Max 4 Featured Images");
      } else {
        let featuredFilesArray: string[] = [];
        for (let i = 0; i < (e.target as HTMLFormElement).files?.length; i++) {
          const file = (e.target as HTMLFormElement).files[i];
          featuredFilesArray.push(
            (window.URL || window.webkitURL).createObjectURL(file)
          );
        }
        setFeaturedFiles(featuredFilesArray);
      }
    }
  };

  const hashImageStringOne = async (e: FormEvent): Promise<any> => {
    let imageData = new FormData();
    let finalImages: any[] = [];
    setImageUploading(true);
    imageData.append("image", (e.target as HTMLFormElement).files[0]);
    try {
      const response = await fetch("/api/ipfs", {
        method: "POST",
        body: imageData,
      });
      if (response.status !== 200) {
        console.log("ERROR", response);
        setImageUploading(false);
      } else {
        let responseJSON = await response.json();
        finalImages.push(responseJSON.cid);
        setImageUploading(false);
        setMappedMainFile(finalImages[0]);
        return finalImages;
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const hashImageStringMultiple = async (e: FormEvent): Promise<any> => {
    let finalImages: any[] = [];
    setImageUploading(true);
    Array.from((e.target as HTMLFormElement).files).map(
      async (file: any, index: number) => {
        let imageData = new FormData();
        imageData.append(
          `image${index}`,
          (e.target as HTMLFormElement).files[index]
        );
        try {
          const response = await fetch("/api/ipfs", {
            method: "POST",
            body: imageData,
          });
          if (response.status !== 200) {
            console.log("ERROR", response);
            setImageUploading(false);
          } else {
            let responseJSON = await response.json();
            finalImages.push(responseJSON.cid);
            if (
              finalImages?.length === (e.target as HTMLFormElement).files?.length
            ) {
              setImageUploading(false);
            }
            return finalImages;
          }
        } catch (err: any) {
          console.error(err.message);
        }
      }
    );
    setMappedFeaturedFiles(finalImages);
  };

  return {
    data,
    isLoading,
    isError,
    handleProductSubmit,
    addMutation,
    productSuccess,
    setProductSuccess,
    dropFormat,
    openDropDown,
    setOpenDropDown,
    showFileMainImage,
    handleDropFormatArray,
    hashImageStringOne,
    imageUploading,
    hashImageStringMultiple,
  };
};

export default useAddProduct;
