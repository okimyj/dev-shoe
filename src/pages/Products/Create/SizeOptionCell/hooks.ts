import { ChangeEvent, useState } from "react";

const useSizeOptionCell = ({
  initOptName,
  initPrice,
  initQuantity,
}: {
  initOptName: string;
  initPrice: number;
  initQuantity: number;
}) => {
  const [optName, setOptName] = useState<string>(initOptName);
  const [price, setPrice] = useState<number>(initPrice);
  const [quantity, setQuantity] = useState<number>(initQuantity);
  const handleChangeOptName = (e: ChangeEvent<HTMLInputElement>) => {
    setOptName(e.currentTarget.value);
  };
  const handleChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.currentTarget.value));
  };
  return { optName, price, quantity, handleChangeOptName, handleChangePrice };
};

export default useSizeOptionCell;
