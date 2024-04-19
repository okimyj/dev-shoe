import App from "@/App";
import SigninPage from "@/pages/Auth/Signin";
import SignupPage from "@/pages/Auth/Signup";
import MainPage from "@/pages/Main";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import { ProductRouter } from "./product";
import { useState } from "react";
import SellerRouter from "./seller";
import CustomerRouter from "./customer";

const RootRouter = () => {
  // 나중에 전역 상태관리로 하던 .. 우선은 테스트용.
  // const [isSeller, setIsSeller] = useState<boolean>(true);
  // 아 뭐가 맞는지 모르겠다.
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      // errorElement: <App outlet={<Error />} />,
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
        ...ProductRouter,
      ],
    },
  ]);
  return <RouterProvider router={router} />;
  // const router = createBrowserRouter(
  //   createRoutesFromElements(
  //     <Route path="/" element={<App />}>
  //       <Route index={true} element={<MainPage />} />
  //       <Route path="signin" element={<SigninPage />} />
  //       <Route path="signup" element={<SignupPage />} />
  //       {isSeller ? SellerRouter : CustomerRouter}
  //     </Route>,
  //   ),
  // );
};

export default RootRouter;
