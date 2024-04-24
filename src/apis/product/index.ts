import uuid from "react-uuid";
import {
  ModelDocumentData,
  ProductDocumentData,
  SubModelDocumentData,
} from "./types";
import useFirebaseDB from "../firebase/useFirebaseDB";
import useFirebaseStorage from "../firebase/useFirebaseStorage";
import { AddDocResponse, UploadFileResponse } from "../firebase/types";
import { ModelFormValue } from "@/pages/Products/Create/Form/types";
import { promise } from "zod";

const useProductAPI = () => {
  const { uploadMultipleFiles, uploadDataURLs } = useFirebaseStorage();
  const { addData } = useFirebaseDB();
  const addProduct = async (formData: ModelFormValue, sellerId: string) => {
    // images upload.

    formData.subModels.map(async (subModel) => {
      const images = subModel.images.map((el) => el.src);
      const res = await uploadDataURLs(images, "products", `${subModel.id}`);
      subModel.images = res.map((el) => {
        return { src: el.data?.downloadURL ?? "" };
      });
    });
    const modelImage = formData.subModels[0].images[0].src;

    // form value to db data.
    const modelData: ModelDocumentData = {
      sellerId,
      id: formData.id,
      name: formData.name,
      category: formData.category,
      image: modelImage,
    };
    const subModelDatas: SubModelDocumentData[] = [];
    const productDatas: ProductDocumentData[] = [];
    formData.subModels.forEach((subModel) => {
      subModelDatas.push({
        id: subModel.id,
        modelId: modelData.id ?? "",
        name: subModel.name,
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
        images: subModel.images?.map((el) => el.src) ?? [],
      });
      subModel.products.forEach((product) => {
        productDatas.push({
          id: product.id,
          modelId: modelData.id ?? "",
          subModelId: subModel.id,
          name: product.name,
          desc: "",
          price: product.price,
          quantity: product.quantity,
          createdAt: new Date().toString(),
          updatedAt: new Date().toString(),
        });
      });
    });
    // send db.
    const promises: Promise<AddDocResponse>[] = [];
    promises.push(addData("models", modelData));
    subModelDatas.forEach((subModelData) => {
      promises.push(addData("models", subModelData));
    });
    productDatas.forEach((productData) => {
      promises.push(addData("models", productData));
    });
    await Promise.all(promises);
  };

  const deleteProduct = () => {};
  const updateProduct = () => {};

  // firebase가 query 로 필드 하나만 가져올 수 있나?
  const getProducts = () => {};
  const getProductDetail = () => {};
  return { addProduct, deleteProduct, updateProduct };
};
export default useProductAPI;
