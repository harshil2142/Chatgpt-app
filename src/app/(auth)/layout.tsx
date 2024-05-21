"use client";

import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "universal-cookie";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookies = new Cookies();
  const token = cookies.get("token");

  if (token) {
    redirect("/");
  }

  return (
    <>
      <div>{children}</div>
    </>
  );
}
