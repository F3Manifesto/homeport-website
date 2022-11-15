import { useQuery } from "react-query";
import { useMutation } from "react-query";
import {
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../../../../lib/helpers";
import { FormEvent, useContext, useState } from "react";
import {
  ProductInterface,
  UseUpdateProductResult,
} from "../../../../types/general.types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { GlobalContext } from "../../../../pages/_app";
import { useQueryClient } from "react-query";
import { setDropFormat } from "../../../../redux/reducers/dropFormatSlice";
import { setDropType } from "../../../../redux/reducers/dropTypeSlice";
import { setProduct } from "../../../../redux/reducers/productSlice";

const useUpdateProduct = (): UseUpdateProductResult => {
  const dispatch = useDispatch();
  const dropTypeName = useSelector(
    (state: RootState) => state.app.dropTypeReducer.value
  );
  const dropFormatArray = useSelector(
    (state: RootState) => state.app.dropFormatReducer.value
  );
  const productSlug = useSelector(
    (state: RootState) => state.app.productReducer.slug
  );
  const { setDeleteModal } = useContext(GlobalContext);
  const { data } = useQuery(["products", productSlug], () =>
    getProduct(productSlug as string)
  );
  const [success, setSuccess] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const updatedMutation = useMutation(
    (updatedData: ProductInterface) =>
      updateProduct(productSlug as string, updatedData),
    {
      onSuccess: async () => {
        setSuccess(true);
        queryClient.prefetchQuery("products", getProducts);
      },
    }
  );

  const handleProductSubmitUpdate = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const productData: ProductInterface = {
      name: (e.target as HTMLFormElement).productName.value,
      description: (e.target as HTMLFormElement).productDescription.value,
      dropType:
        dropTypeName === "Select Drop Type"
          ? (data?.dropType as string)
          : dropTypeName,
      dropFormat:
        dropFormatArray.length === 0
          ? (data?.dropFormat as string[])
          : dropFormatArray,
      // mainImage: mainFile,
      // featuredImages: ["asdf", "sadf", "asdfda"],
      slug: (e.target as HTMLFormElement).productName.value
        .replace(/ /g, "-")
        .replace(/[^\w-/]+/g, "")
        .toLowerCase(),
    };
    try {
      updatedMutation.mutate(productData);
    } catch (err: any) {
      console.error(err.message);
    }
    (e.target as HTMLFormElement).reset();
    dispatch(setProduct({ actionValue: "INVENTORY_ADD", actionId: undefined }));
    dispatch(setDropFormat([]));
    dispatch(setDropType("Select Drop Type"));
  };

  const handleProductDelete = async (): Promise<void> => {
    try {
      await deleteProduct(productSlug as string);
      await queryClient.prefetchQuery("products", getProducts);
      setDeleteModal(false);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  let newDropFormatArray: string[] = data?.dropFormat as string[];

  const handleExistingDropFormatArray = (form: string): void => {
    if (newDropFormatArray.includes(form)) {
      newDropFormatArray = newDropFormatArray.filter((value) => form !== value);
      dispatch(setDropFormat(newDropFormatArray));
    } else {
      newDropFormatArray = newDropFormatArray.concat(form);
      dispatch(setDropFormat(newDropFormatArray));
    }
  };

  const handleDispatchFormatArray = (form: string): void => {
    if (dropFormatArray.includes(form)) {
      newDropFormatArray = dropFormatArray.filter((value) => form !== value);
      dispatch(setDropFormat(newDropFormatArray));
    } else {
      newDropFormatArray = dropFormatArray.concat(form);
      dispatch(setDropFormat(newDropFormatArray));
    }
  };

  return {
    data,
    handleProductSubmitUpdate,
    updatedMutation,
    success,
    setSuccess,
    handleProductDelete,
    handleExistingDropFormatArray,
    newDropFormatArray,
    handleDispatchFormatArray,
  };
};

export default useUpdateProduct;
