import { useDialogPopupStore } from "@/common/stores/useDialogPopupStore";
import InputField from "@/components/form/InputField";
import { Button } from "@/components/ui/button";
import InnerBody from "@/pages/layout/body/inner/InnerBody";

const ProductCreatePage = () => {
  const { open: dialogOpen } = useDialogPopupStore();
  const optionAddTest = () => {
    dialogOpen({ title: "dialog", subTitle: "test", children: "dialog children" });
  };
  return (
    <InnerBody>
      <div className="w-700pxr border">
        <h1>상품 등록</h1>
        <div className="flex">
          <img src="" className="h-120pxr w-120pxr" />
          <div className="w-full flex-col space-y-5pxr border">
            <InputField title="상품명" placeHolder="Enter Product Name..." inputType="text" />
            <InputField title="가 격" placeHolder="Enter Product Price..." inputType="text" />
          </div>
        </div>
        <div>
          <h2>옵션</h2>
          <div className="flex items-start space-x-5pxr">
            <InputField title="옵션명" placeHolder="Enter Option Name..." inputType="text" />
            <InputField
              title="옵션 이미지"
              placeHolder="Enter Option Name..."
              inputType="file"
              multiple
            />
            <Button onClick={optionAddTest}>+</Button>
          </div>
        </div>
        <div>
          <h2>사이즈</h2>
        </div>
        <div>
          <h2>재고수량</h2>
        </div>
      </div>
    </InnerBody>
  );
};

export default ProductCreatePage;
