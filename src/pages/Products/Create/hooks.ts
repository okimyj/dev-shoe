import { useAlertPopupStore } from "@/common/stores/useAlertPopupStore";
import { ProductCreatePageProps } from ".";
import { useNavigate } from "react-router-dom";

const useProductCreate = ({ modelId, isEdit }: ProductCreatePageProps) => {
  console.log("useProductCreate : ", modelId, isEdit);
  const { open: openAlert } = useAlertPopupStore();
  const navigate = useNavigate();
  const addOption = (name: string, images: File[]) => {};
  const removeOption = (id: string) => {};
  const handleSubmit = () => {};
  const handleCancel = () => {
    openAlert({
      title: `상품 ${isEdit ? "수정" : "등록"}을 취소하시겠습니까?`,
      contents: "입력된 정보는 저장되지 않습니다.",
      hasCancel: true,
      onClose: (confirm) => {
        if (confirm) navigate(-1);
      },
    });
  };
  return { handleCancel, handleSubmit };
};
export default useProductCreate;
