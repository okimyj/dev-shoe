import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SquarePlus } from "lucide-react";

const OptionAdd = () => {
  return (
    <div>
      <h1>옵션 추가</h1>
      <div className="flex">
        <Label>이름</Label>
        <Input />
      </div>
      <div className="flex">
        <Label>설명</Label>
        <Input />
      </div>
      <div>
        <Label>상품 이미지</Label>
        <SquarePlus className="w-20pxr h-20pxr" />
      </div>
      <div>
        <Label>사이즈</Label>
      </div>
    </div>
  );
};
export default OptionAdd;
