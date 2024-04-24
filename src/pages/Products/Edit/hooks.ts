import { useAlertPopupStore } from "@/common/stores/useAlertPopupStore";
import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import useProductAPI from "@/apis/product";
import useAuth from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { MODEL_FORM_DEFAULT_VALUE, ModelFormValue, modelSchema } from "./Form/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ALL } from "dns";

const useProductEdit = () => {
  const { pathname } = useLocation();
  console.log("useProductCreate - pathname : ", pathname);
  const { addProduct, editProduct, getModelFormData } = useProductAPI();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { open: openAlert } = useAlertPopupStore();
  const { userData } = useAuth();
  const navigate = useNavigate();
  const form = useForm<ModelFormValue>({
    defaultValues: MODEL_FORM_DEFAULT_VALUE,
    resolver: zodResolver(modelSchema),
    mode: "onChange",
  });
  useEffect(() => {
    const split = pathname.split("/");
    if (split.length > 3) {
      fetchFormValue(split[2]);
    }
  }, [pathname]);
  const fetchFormValue = useCallback(async (modelId: string) => {
    const formValue = await getModelFormData(modelId);
    console.log("fetachFormValue- formValue: ", formValue);
    form.reset(formValue);
    setIsEdit(true);
  }, []);

  const handleSubmit = useCallback((data: ModelFormValue) => {
    console.log("handleSubMit : ", data, "isEdit : ", isEdit);
    addProduct(data, userData?.uid ?? "");
    // if (isEdit) editProduct(data);
    // else addProduct(data, userData?.uid ?? "");
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
    isEdit,
    handleCancel,
    handleSubmit,
  };
};
export default useProductEdit;
