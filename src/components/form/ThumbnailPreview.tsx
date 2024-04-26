import { CircleMinus, CircleX, SquareMinusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
interface ThumbnailPreviewProps<T> {
  data: T;
  src: string;
  className: string;
  onDelete?: (data: T) => void;
}
const ThumbnailPreview = <T extends unknown>({
  data,
  src,
  className,
  onDelete,
}: ThumbnailPreviewProps<T>) => {
  return (
    <div className={cn("relative", className)}>
      <img src={src} />
      {onDelete && (
        <SquareMinusIcon
          className="absolute -right-5pxr -top-5pxr"
          onClick={() => {
            onDelete(data);
          }}
        />
      )}
    </div>
  );
};

export default ThumbnailPreview;
