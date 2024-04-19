import ValidationField from "@/components/form/ValidationField";
import InnerBody from "@/pages/layout/body/inner/InnerBody";
import { useForm } from "react-hook-form";

const ProductCreatePage = () => {
  const { register } = useForm();
  return (
    <InnerBody>
      <div>
        <h1>상품 등록</h1>
        {/* <ValidationField /> */}
      </div>
    </InnerBody>
  );
};

export default ProductCreatePage;
