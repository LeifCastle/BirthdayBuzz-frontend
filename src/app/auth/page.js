"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (window.location) {
      router.push("/auth/login");
    }
  }, [router]);

  return;
}
