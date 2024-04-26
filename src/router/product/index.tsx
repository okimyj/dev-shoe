import ProductEditPage from "@/pages/Products/Edit";
import { Outlet, RouteObject } from "react-router-dom";
import { withPrivateRoute } from "../withAuthorityRoute";
import ProductDetailPage from "@/pages/Products/Detail";

export const ProductRouter: RouteObject[] = [
  {
    path: "product",
    element: <div>상품 리스트</div>,
  },
  {
    path: "product/create",
    element: withPrivateRoute(<ProductEditPage />),
  },
  {
    path: "product/:id",
    element: <ProductDetailPage />,
  },
  {
    path: "product/:id/edit",
    element: withPrivateRoute(<ProductEditPage />),
  },
];
