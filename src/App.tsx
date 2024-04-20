import "./App.css";
import { Outlet } from "react-router-dom";
import Body from "./pages/layout/body/Body";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AlertPopup from "@/pages/_shared/modal/AlertPopup";
import DialogPopup from "./pages/_shared/modal/DialogPopup";
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen w-full flex-col items-center">
        <Body>
          <Outlet />
          <AlertPopup />
          <DialogPopup />
        </Body>
      </div>
    </QueryClientProvider>
  );
}

export default App;
