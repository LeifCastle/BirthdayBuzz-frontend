"use client";
import { useEffect, useState } from "react";
import setAuthToken from "../utils/setAuthToken";
import { useRouter } from "next/navigation";

//--Components
import PageHeader from "@/components/page_header";
import BuzzList from "@/components/BuzzList/BuzzList";

export default function Home() {
  const [HTML, setHTML] = useState();
  const router = useRouter();
  useEffect(() => {
    setAuthToken(localStorage.getItem("jwtToken"));
    if (localStorage.getItem("jwtToken")) {
      setHTML(
        <>
          <PageHeader />
          <main id="flexError" className="flex-col items-center pt-4">
            <BuzzList />
          </main>
        </>
      );
    } else {
      router.push("/auth/login");
    }
  }, [router]);

  return <>{HTML}</>;
}
