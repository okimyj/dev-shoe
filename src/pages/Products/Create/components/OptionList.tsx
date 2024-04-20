import OptionListCell from "./OptionListCell";

interface IOptionListProps {
  name: string;
}
const OptionList = () => {
  return (
    <div>
      <OptionListCell name="서밋화이트" image="" isNew={false} isEdit={false} />
      <OptionListCell name="서밋화이트" image="" isNew={false} isEdit={true} />
      <OptionListCell name="서밋화이트" image="" isNew={true} isEdit={false} />
    </div>
  );
};
export default OptionList;
