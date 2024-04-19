import App from "@/App";
import SigninPage from "@/pages/Auth/Signin";
import SignupPage from "@/pages/Auth/Siginup";
import MainPage from "@/pages/Main";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProductRouter } from "./product";

const RootRouter = () => {
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
};
export default RootRouter;
