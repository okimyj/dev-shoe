import uuid from "react-uuid";
import {
  ImageStorageData,
  ModelDocumentData,
  ProductDocumentData,
  SubModelDocumentData,
} from "./types";
import useFirebaseDB from "../firebase/useFirebaseDB";
import useFirebaseStorage from "../firebase/useFirebaseStorage";
import { AddDocResponse, UploadDataURLData } from "../firebase/types";
import {
  MODEL_FORM_DEFAULT_VALUE,
  ModelFormValue,
  ProductFormValue,
  SubModelFormValue,
} from "@/pages/Products/Edit/Form/types";
import { DBTypes } from "../firebase/constants";
import { where } from "firebase/firestore";

const useProductAPI = () => {
  const { uploadDataURLs } = useFirebaseStorage();
  const { addData, getDatas, getDataByDocId } = useFirebaseDB();
  const addProduct = async (formData: ModelFormValue, sellerId: string) => {
    // images upload.
    const modelId = formData.id || uuid();
    const uploadPromises = formData.subModels.map(async (subModel) => {
      const imageDatas: UploadDataURLData[] = [];
      subModel.images.forEach((el, index) => {
        if (el.src.startsWith("data:")) {
          imageDatas.push({ name: index.toString(), dataURL: el.src });
        }
      });
      if (!subModel.id) subModel.id = uuid();
      const res = await uploadDataURLs(`products/${subModel.id}`, imageDatas);
      res.forEach((el) => {
        subModel.images[Number(el.data?.name)] = {
          storePath: el.data?.storePath ?? "",
          src: el.data?.downloadURL ?? "",
        };
      });
    });
    await Promise.all(uploadPromises);

    const modelImage: ImageStorageData = {
      storePath: formData.subModels[0].images[0].storePath,
      downloadURL: formData.subModels[0].images[0].src,
    };

    // form value to db data.
    const modelData: ModelDocumentData = {
      sellerId,
      id: modelId,
      name: formData.name,
      category: formData.category,
      image: modelImage,
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
    };
    const subModelDatas: SubModelDocumentData[] = [];
    const productDatas: ProductDocumentData[] = [];
    formData.subModels.forEach((subModel) => {
      const subModelId = subModel.id ?? uuid();
      subModelDatas.push({
        id: subModelId,
        modelId: modelId,
        name: subModel.name,
        createdAt: Date.now().toString(),
        updatedAt: Date.now().toString(),
        images:
          subModel.images?.map((el) => {
            return { storePath: el.storePath, downloadURL: el.src };
          }) ?? [],
      });
      subModel.products.forEach((product) => {
        productDatas.push({
          id: product.id || uuid(),
          modelId: modelId,
          subModelId: subModelId,
          name: product.name,
          desc: "",
          price: product.price,
          quantity: product.quantity,
          createdAt: Date.now().toString(),
          updatedAt: Date.now().toString(),
        });
      });
    });
    // send db.
    console.log("---- finalData ----- ");
    console.log("---- modelData : ", modelData);
    console.log("---- modelData : ", subModelDatas);
    console.log("---- modelData : ", productDatas);
    const promises: Promise<AddDocResponse>[] = [];
    promises.push(addData(DBTypes.MODELS, modelData));
    subModelDatas.forEach((subModelData) => {
      promises.push(addData(DBTypes.SUB_MODELS, subModelData));
    });
    productDatas.forEach((productData) => {
      promises.push(addData(DBTypes.PRODUCTS, productData));
    });
    await Promise.all(promises);
  };
  const editProduct = async (formData: ModelFormValue) => {
    console.log("editProduct : ", formData);
  };
  const deleteProduct = () => {};
  const updateProduct = () => {};

  const getProducts = () => {};
  const getModelData = async (modelId: string) => {
    return (await getDataByDocId<ModelDocumentData>(DBTypes.MODELS, modelId)).data;
  };
  const getSubModelData = async (subModelId: string) => {
    return (await getDataByDocId<ModelDocumentData>(DBTypes.SUB_MODELS, subModelId)).data;
  };

  const getProductData = async (productId: string) => {
    return (await getDataByDocId<ProductDocumentData>(DBTypes.PRODUCTS, productId)).data;
  };
  const getModelFormData = async (modelId: string): Promise<ModelFormValue> => {
    const formValue: ModelFormValue = { ...MODEL_FORM_DEFAULT_VALUE };
    const modelDocData = await getModelData(modelId);
    formValue.id = modelDocData?.id ?? "";
    formValue.name = modelDocData?.name ?? "";
    formValue.category = modelDocData?.category ?? "";
    formValue.subModels = [];

    const subModelRes = await getDatas(DBTypes.SUB_MODELS, where("modelId", "==", modelId));
    const productRes = await getDatas(DBTypes.PRODUCTS, where("modelId", "==", modelId));

    const productsMap = new Map<string, ProductFormValue[]>();
    productRes.forEach((productDoc) => {
      const productData = productDoc.data();
      const productForm: ProductFormValue = {
        id: productData.id,
        name: productData.name,
        price: productData.price,
        quantity: productData.quantity,
      };
      if (productsMap.has(productData.subModelId)) {
        productsMap.get(productData.subModelId)?.push(productForm);
      } else {
        productsMap.set(productData.subModelId, [productForm]);
      }
    });

    subModelRes.forEach((subModelDoc) => {
      const subModelData = subModelDoc.data();
      const subModelForm: SubModelFormValue = {
        id: subModelData.id,
        name: subModelData.name,
        images: subModelData.images.map((el: ImageStorageData) => {
          return { src: el.downloadURL, storePath: el.storePath };
        }),
        products: productsMap.get(subModelData.id) ?? [],
      };

      formValue.subModels.push(subModelForm);
    });
    return formValue;
  };
  const getModelDataByProductId = async (productId: string) => {
    const product = await getProductData(productId);
    if (product) {
      return await getModelData(product.modelId);
    }
  };

  return { addProduct, editProduct, deleteProduct, updateProduct, getModelFormData };
};
export default useProductAPI;
