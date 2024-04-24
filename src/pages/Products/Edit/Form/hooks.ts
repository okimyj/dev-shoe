import { useFieldArray, useForm } from "react-hook-form";
import { ModelFormValue, SubModelFormValue } from "./types";

const useProductCreateForm = () => {
  const form = useForm<ModelFormValue>({
    defaultValues: {
      name: "",
      category: "",
      subModels: [{ name: "", products: [{ name: "", price: 0, quantity: 0 }] }],
    },
  });
  const {
    fields: subModelFields,
    append: appendSubModel,
    remove: removeSubModel,
  } = useFieldArray<ModelFormValue>({ name: "subModels", control: form.control });

  // const {
  //   fields: productFields,
  //   append: appendProduct,
  //   remove: removeProduct,
  // } = useFieldArray<ModelFormValue>({ name: `subModels.${0}.products`, control: form.control });
  return {
    subModelFields,
    appendSubModel,
    removeSubModel,
  };
};

export default useProductCreateForm;
