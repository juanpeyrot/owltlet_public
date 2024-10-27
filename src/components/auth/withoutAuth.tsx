"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export const withoutAuth = (WrappedComponent: any) => {
  return function WithAuth(props: any) {
    const { isLogged } = useSelector((state: RootState) => state.user);
    useEffect(() => {
      if (isLogged) {
        return redirect('/');
      }
    }, []);

    if (isLogged) {
      return null;
    }
    return <WrappedComponent {...props} />;
  };
};