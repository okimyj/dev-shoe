import App from "@/App";
import SigninPage from "@/pages/auth/signin";
import SignupPage from "@/pages/auth/signup";
import MainPage from "@/pages/main";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProductRouter } from "./product";
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
        path: "cart",
        element: <div>장바구니</div>,
      },
      ...ProductRouter,
    ],
  },
]);
const RootRouter = () => {
  console.log(router);
  return <RouterProvider router={router} />;
};
export default RootRouter;
