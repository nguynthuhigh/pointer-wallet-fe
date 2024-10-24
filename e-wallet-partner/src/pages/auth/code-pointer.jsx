import { useQuery } from "@tanstack/react-query";
import React from "react";
import API from "../../api/auth.api";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const CodePointer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code");
  const { isSuccess, isError, isLoading } = useQuery({
    queryFn: async () => {
      return await API.signInWithPointer(code);
    },
    queryKey: ["access_token"],
  });
  if (isSuccess) {
    navigate("/dashboard");
  }
  if (isError) {
    return <h1>Oops!, something went wrong</h1>;
  }
  if (isLoading) return <h1>In progress...</h1>;
  return <div>CodePointer</div>;
};

export default CodePointer;
