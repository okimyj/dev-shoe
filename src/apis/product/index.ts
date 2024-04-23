import uuid from "react-uuid";
import {
  ProductData,
  ProductModelData,
  ProductSubModelData,
  convertClientToDBData,
  convertModelDBData,
} from "./types";
import useFirebaseDB from "../firebase/useFirebaseDB";
import useFirebaseStorage from "../firebase/useFirebaseStorage";
import { UploadFileResponse } from "../firebase/types";

const useProductAPI = () => {
  const { uploadMultipleFiles } = useFirebaseStorage();
  const { addData } = useFirebaseDB();
  const addProduct = async (model: ProductModelData, sellerId: string) => {
    model.id = `product_${uuid()}`;
    const promises = model.subModels.map(async (subModel) => {
      subModel.id = uuid();
      if (subModel.imageFiles) {
        const res = await uploadMultipleFiles(
          subModel.imageFiles,
          ["products", model.id, subModel.id].join("/"),
        );
        subModel.images = res.map((el) => el.data?.downloadURL ?? "");
        console.log("subModel Image upload res : ", res);
      }
    });
    await Promise.all(promises);
    // await model.subModels.forEach(async (subModel) => {
    //   subModel.id = uuid();
    //   if (subModel.imageFiles) {
    //     const res = await uploadMultipleFiles(
    //       subModel.imageFiles,
    //       ["products", model.id, subModel.id].join("/"),
    //     );
    //     subModel.images = res.map((el) => el.data?.downloadURL ?? "");
    //     console.log("subModel Image upload res : ", res);
    //   }
    // });

    const { modelDBData, subModelDBDatas, productDBDatas } = convertClientToDBData(model, sellerId);
    const res = await addData("models", modelDBData);
  };

  const deleteProduct = () => {};
  const updateProduct = () => {};

  // firebase가 query 로 필드 하나만 가져올 수 있나?
  const getProducts = () => {};
  const getProductDetail = () => {};
  return { addProduct, deleteProduct, updateProduct };
};
export default useProductAPI;
