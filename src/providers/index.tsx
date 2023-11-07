'use client'

import { ReactNode } from "react";
import { AuthProvider } from "./auth/AuthProvider";
import { StateGlobalProvider } from "./stateGlobal/StateGlobalProvider";

const AllProviders = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <StateGlobalProvider>{children}</StateGlobalProvider>
    </AuthProvider>
  );
};

export default AllProviders;
