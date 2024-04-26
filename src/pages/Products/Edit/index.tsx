import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InnerBody from "@/pages/layout/body/inner/InnerBody";
import useProductEdit from "./hooks";
import SubModelList from "./Form/SubModelList";
import ErrorLabel from "@/components/form/ErrorLabel";

const ProductEditPage = () => {
  const { form, isEdit, handleCancel, handleSubmit } = useProductEdit();

  return (
    <InnerBody>
      <form className="min-w-450pxr max-w-750pxr" onSubmit={form.handleSubmit(handleSubmit)}>
        <input {...form.register("id")} />
        <h1 className="text-left">상품 등록</h1>
        <div className="my-10pxr flex-col space-y-10pxr">
          <div className="flex w-full flex-col items-start space-y-5pxr">
            <div className="flex items-center space-x-10pxr">
              <Label className="text-lg">상품명</Label>{" "}
              <ErrorLabel error={form.formState.errors.name?.message} />
            </div>
            <Input
              isError={Boolean(form.formState.errors.name?.message)}
              placeholder="Enter Product Name.."
              {...form.register("name")}
              formNoValidate={true}
            />
          </div>
          <div>
            <div className="flex items-center space-x-10pxr">
              <Label className="text-lg">카테고리</Label>{" "}
              <ErrorLabel error={form.formState.errors.category?.message} />
            </div>
            <Input
              isError={Boolean(form.formState.errors.category?.message)}
              placeholder="Enter Category Name.."
              {...form.register("category")}
            />
          </div>
        </div>

        <h2 className="text-left">옵션</h2>
        <SubModelList form={form} />

        <div className="mt-10pxr flex w-full justify-end space-x-10pxr">
          <Button className="w-100pxr" variant={"outline"} onClick={handleCancel}>
            취소
          </Button>
          <Button className="w-100pxr" type="submit">
            {isEdit ? "수정" : "등록"}
          </Button>
        </div>
      </form>
    </InnerBody>
  );
};

export default ProductEditPage;
