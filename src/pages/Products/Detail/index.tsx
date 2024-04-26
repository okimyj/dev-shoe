import { useLocation, useNavigate } from "react-router-dom";

const ProductDetailPage = () => {
  const loc = useLocation();
  console.log("ProductDetailPage - pathname : ", loc);
  return <div>Product Detail Page</div>;
};

export default ProductDetailPage;
