import App from "@/App";
import SigninPage from "@/pages/Signin";
import SignupPage from "@/pages/Signup";
import MainPage from "@/pages/MainPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "signin",
        element: <SigninPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "product",
        element: <div>상품 리스트</div>,
      },
      {
        path: "product/:id",
        element: <div>상품 상세</div>,
      },
      {
        path: "product/register",
        element: <div>상품 등록</div>,
      },
      {
        path: "product/update",
        element: <div>상품 수정</div>,
      },
      {
        path: "cart",
        element: <div>장바구니</div>,
      },
    ],
  },
]);
const RootRouter = () => {
  console.log(router);
  return <RouterProvider router={router} />;
};
export default RootRouter;
