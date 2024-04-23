import uuid from "react-uuid";
import { create } from "zustand";
interface ProductModelData {
  id: string;
  name: string;
  category: string;
}
export interface ProductSubModelDatas {
  [key: string]: ProductSubModelData;
}
interface ProductSubModelData {
  id: string;
  name: string;
  productDatas: ProductDatas;
  imageFiles?: File[];
  images?: string[];
}
interface ProductDatas {
  [key: string]: ProductData;
}
interface ProductData {
  id: string;
  name: string;
  desc: string;
  quantity: number;
  price: number;
}

interface State {
  modelData: ProductModelData | null;
  subModelDatas: ProductSubModelDatas;
  productDatas: ProductDatas;

  init: (
    model: ProductModelData | null,
    subModels?: ProductSubModelDatas,
    products?: ProductDatas,
  ) => void;
  addSubModelData: () => ProductSubModelData | null;
  addProductData: (subModelId: string) => ProductData | null;
  // applyOption: () => void;
  // deleteOption: (id: string) => void;
}
const TEMP_ID_PREFIX = "tem_";
const getTempID = () => `${TEMP_ID_PREFIX}${uuid()}`;
export const useProductEditingStore = create<State>((set, get) => ({
  modelData: null,
  subModelDatas: {},
  productDatas: {},
  init(
    modelData: ProductModelData | null,
    subModelDatas?: ProductSubModelDatas,
    productDatas?: ProductDatas,
  ) {
    if (!modelData) modelData = { id: getTempID(), category: "", name: "" };
    console.log(" productStore init ");
    set({ modelData, subModelDatas, productDatas });
  },
  addSubModelData: () => {
    console.log("addSubModelData - this.subModelDatas : ", get().subModelDatas);
    if (!get().subModelDatas) get().subModelDatas = {};
    const newSubModel: ProductSubModelData = {
      id: getTempID(),
      name: "",
      productDatas: {},
    };
    set({ subModelDatas: Object.assign(get().subModelDatas, { newSubModel }) });
    return newSubModel;
  },
  addProductData(subModelId: string) {
    console.log("addProductData - ");
    if (!this.subModelDatas || this.subModelDatas[subModelId] === null) return null;

    const newProduct: ProductData = {
      id: getTempID(),
      name: "",
      desc: "",
      price: 0,
      quantity: 0,
    };
    Object.assign(this.subModelDatas.products, { newProduct });
    set((state) => ({
      productDatas: Object.assign(state.productDatas, { newProduct }),
    }));
    return newProduct;
  },
}));
