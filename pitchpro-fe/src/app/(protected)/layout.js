"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function ProtectedLayout({ children }) {
  const router = useRouter();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) {
      router.replace("/auth/welcome");
    }
  }, [token, router]);

  if (!token) {
    return null;
  }

  return <>{children}</>;
}
