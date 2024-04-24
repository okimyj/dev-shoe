import { useAlertPopupStore } from "@/common/stores/useAlertPopupStore";
import { ProductCreatePageProps } from ".";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useCallback, useState } from "react";
import { ProductSubModelData } from "@/apis/product/types";
import useProductAPI from "@/apis/product";
import useAuth from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { MODEL_FORM_DEFAULT_VALUE, ModelFormValue, modelSchema } from "./Form/types";
import { zodResolver } from "@hookform/resolvers/zod";

const useProductCreate = ({ productId, isEdit }: ProductCreatePageProps) => {
  const form = useForm<ModelFormValue>({
    defaultValues: MODEL_FORM_DEFAULT_VALUE,
    resolver: zodResolver(modelSchema),
    mode: "onChange",
  });

  const { open: openAlert } = useAlertPopupStore();
  const { addProduct } = useProductAPI();
  const { userData } = useAuth();
  const [name, setName] = useState<string>();
  const [category, setCategory] = useState<string>();
  const [options, setOptions] = useState<ProductSubModelData[]>([]);
  const [testFiles, setTestFiles] = useState<File[]>();

  const navigate = useNavigate();

  const handleApplyOption = useCallback(
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
  const handleRemoveOption = useCallback((id: string) => {
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
  }, []);
  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) setTestFiles([...e.currentTarget.files]);
  };

  const handleSubmit = useCallback((data: ModelFormValue) => {
    console.log("handleSubmit - ", data);
    addProduct(data, userData?.email ?? "");
    // const products: ProductData[] = [
    //   {
    //     id: uuid(),
    //     name: "testProduct1",
    //     desc: "testProductDesc",
    //     price: 189000,
    //     quantity: 120,
    //   },
    // ];
    // const subModels: ProductSubModelData[] = [
    //   { id: uuid(), name: "testSubModel1", imageFiles: testFiles, products: products },
    // ];
    // const model: ProductModelData = {
    //   id: uuid(),
    //   name: "testModel",
    //   category: "여성 신발",
    //   subModels: subModels,
    // };
    // addProduct(model, userData?.email ?? "");
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
    form,
    name,
    category,
    options,
    handleChangeName,
    handleChangeCategory,
    handleAddOption,
    handleApplyOption,
    handleRemoveOption,
    handleCancel,
    handleSubmit,
    onChangeFile,
  };
};
export default useProductCreate;
