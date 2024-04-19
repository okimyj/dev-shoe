import { RouteObject } from "react-router-dom";

export const ProductRouter: RouteObject[] = [
  {
    path: "product",
    element: <div>상품 리스트</div>,
    children: [
      {
        path: ":id",
        element: <div>상품 상세</div>,
      },
      {
        path: "create",
        element: <div>상품 등록</div>,
      },
      {
        path: "update",
        element: <div>상품 수정</div>,
      },
    ],
  },
];
