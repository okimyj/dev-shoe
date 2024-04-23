import { useAlertPopupStore } from "@/common/stores/useAlertPopupStore";
import { ProductCreatePageProps } from ".";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { ProductData, ProductModelData, ProductSubModelData } from "@/apis/product/types";
import uuid from "react-uuid";
import useProductAPI from "@/apis/product";
import useFirebaseStorage from "@/apis/firebase/useFirebaseStorage";
import useAuth from "@/hooks/useAuth";

const useProductCreate = ({ modelId, isEdit }: ProductCreatePageProps) => {
  console.log("useProductCreate : ", modelId, isEdit);
  const { open: openAlert } = useAlertPopupStore();
  const { addProduct } = useProductAPI();
  const { userData } = useAuth();
  const [originData, setOriginData] = useState<ProductModelData | null>();
  const [name, setName] = useState<string>();
  const [category, setCategory] = useState<string>();
  const [options, setOptions] = useState<ProductSubModelData[]>([]);
  const [testFiles, setTestFiles] = useState<File[]>();
  const [imageUrl, setImageUrl] = useState<string>();
  // useEffect(() => {
  //   // TODO : request product Data.
  // }, []);
  const navigate = useNavigate();

  const applyOption = useCallback(
    (option: ProductSubModelData) => {
      const copy = [...options];
      const idx = copy.findIndex((el) => el.id === option.id);
      if (idx !== -1) {
        copy[idx] = option;
        setOptions(copy);
      }
    },
    [options],
  );
  const removeOption = useCallback((id: string) => {
    setOptions(options.filter((el) => el.id !== id));
  }, []);
  const handleChangeName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  }, []);
  const handleChangeCategory = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCategory(e.currentTarget.value);
  }, []);
  const handleAddOption = useCallback(() => {
    // 임시로 id 부여. store에 add 할 때 바뀐다.
    const option: ProductSubModelData = {
      id: `temp_${uuid()}`,
      images: [],
      name: "",
      products: [],
    };

    setOptions((prev) => [...prev, option]);
  }, []);
  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) setTestFiles([...e.currentTarget.files]);
  };
  const handleSubmit = useCallback(() => {
    console.log("handleSubmit - ");
    const products: ProductData[] = [
      {
        id: uuid(),
        name: "testProduct1",
        desc: "testProductDesc",
        price: 189000,
        quantity: 120,
      },
    ];
    const subModels: ProductSubModelData[] = [
      { id: uuid(), name: "testSubModel1", imageFiles: testFiles, products: products },
    ];
    const model: ProductModelData = {
      id: uuid(),
      name: "testModel",
      category: "여성 신발",
      subModels: subModels,
    };
    addProduct(model, userData?.email ?? "");
  }, []);
  const handleCancel = useCallback(() => {
    openAlert({
      title: `상품 ${isEdit ? "수정" : "등록"}을 취소하시겠습니까?`,
      contents: "입력된 정보는 저장되지 않습니다.",
      hasCancel: true,
      onClose: (confirm) => {
        if (confirm) navigate(-1);
      },
    });
  }, []);
  return {
    name,
    category,
    options,
    handleChangeName,
    handleChangeCategory,
    handleAddOption,
    handleCancel,
    handleSubmit,
    onChangeFile,
  };
};
export default useProductCreate;
