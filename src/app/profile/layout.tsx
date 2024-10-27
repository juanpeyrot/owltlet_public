'use client';

import { withAuth } from "@/components/auth/withAuth";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default withAuth(AuthLayout);