import { ProductSubModelData } from "@/apis/product/types";
import OptionListCell from "../OptionListCell";

interface OptionListProps {
  list: ProductSubModelData[];
}
const OptionList = ({ list }: OptionListProps) => {
  return (
    <div>
      {list.map((el) => (
        <OptionListCell key={el.id} {...el} isEdit={false} />
      ))}
    </div>
  );
};
export default OptionList;
