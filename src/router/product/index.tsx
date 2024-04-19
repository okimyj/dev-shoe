import ProductCreatePage from "@/pages/Products/Create";
import { Outlet, RouteObject } from "react-router-dom";

export const ProductRouter: RouteObject[] = [
  {
    path: "product",
    element: <div>상품 리스트</div>,
  },
  {
    path: "product/create",
    element: <ProductCreatePage />,
  },
  {
    path: "product/:id",
    element: <div>상품 상세</div>,
  },
  {
    path: "product/:id/update",
    element: <div>상품 수정</div>,
  },
];
