import React, { FC } from "react";
import { Navigate, Route } from "react-router-dom";
import { useUserAuth } from "./UserAuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }): React.ReactElement => {
  const { user } = useUserAuth();

  return user ? <>{ children }</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
