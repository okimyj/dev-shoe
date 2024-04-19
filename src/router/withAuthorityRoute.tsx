import { useLoginToLocation } from "@/common/stores/useLoginToLocation";
import useAuth from "@/hooks/useAuth";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export const withPrivateRoute = (InnerComponent: React.ReactNode): React.ReactNode => {
  const WrappedComponent = () => {
    const navigate = useNavigate();
    const { userInfo } = useAuth();
    const { pathname: curPathName } = useLocation();
    const { setPath } = useLoginToLocation();

    useEffect(() => {
      if (userInfo === null) {
        // 로그인 되어있지 않은 상태 로그인 페이지로 이동.
        setPath(curPathName);
        if (!userInfo) navigate("/signin");
      }
    }, [userInfo]);
    return InnerComponent;
  };
  return <WrappedComponent />;
};
