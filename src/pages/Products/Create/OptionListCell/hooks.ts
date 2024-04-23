import { ChangeEvent, useState } from "react";

const useOptionListCell = () => {
  const [name, setName] = useState<string>();
  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };
  const handleConfirm = () => {};
  const handleDelete = () => {};
  return { handleChangeName, handleConfirm, handleDelete };
};

export default useOptionListCell;
