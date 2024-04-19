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
          {/* <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="mt-5">
                버튼을 눌러주세요.
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent >
              <AlertDialogHeader>
                <AlertDialogTitle>프로젝트 셋팅을 완료하셨습니다.</AlertDialogTitle>
                <AlertDialogDescription>
                  이제 1주차 기능 구현 과제들을 구현해주세요. 화이팅입니다!
                  <input type="text" />
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>취소</AlertDialogCancel>
                <AlertDialogAction>완료</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog> */}
        </Body>
      </div>
    </QueryClientProvider>
  );
}

// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";

// import { Button } from "@/components/ui/button";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import Body from "./pages/layout/body/Body";
// import { Outlet } from "react-router-dom";
// function App() {
//   return (
//     <Body>
//       <Outlet />
//       <Alert>
//         <AlertTitle>안녕하세요 수강생 여러분 반갑습니다.</AlertTitle>
//         <AlertDescription>항해99 취업 리부트 프로그램에 오신걸 환영합니다.</AlertDescription>
//       </Alert>

//       <AlertDialog>
//         <AlertDialogTrigger asChild>
//           <Button variant="outline" className="mt-5">
//             버튼을 눌러주세요.
//           </Button>
//         </AlertDialogTrigger>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>프로젝트 셋팅을 완료하셨습니다.</AlertDialogTitle>
//             <AlertDialogDescription>
//               이제 1주차 기능 구현 과제들을 구현해주세요. 화이팅입니다!
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>취소</AlertDialogCancel>
//             <AlertDialogAction>완료</AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </Body>
//   );
// }
export default App;
