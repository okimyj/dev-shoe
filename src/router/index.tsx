import App from "@/App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);
const RootRouter = () => {
  return <RouterProvider router={router} />;
};
export default RootRouter;
