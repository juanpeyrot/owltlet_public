'use client';

import { withoutAuth } from "@/components/auth/withoutAuth";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default withoutAuth(AuthLayout);