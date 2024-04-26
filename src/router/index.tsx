import App from "@/App";
import SigninPage from "@/pages/Auth/Signin";
import SignupPage from "@/pages/Auth/Signup";
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
          path: "",
          element: <MainPage />,
          // children: [...ProductRouter],
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
