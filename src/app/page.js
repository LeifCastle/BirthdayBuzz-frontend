"use client";
import { useEffect, useState } from "react";
import setAuthToken from "../utils/setAuthToken";
import { useRouter } from "next/navigation";

//--Components
import PageHeader from "@/components/page_header";
import BuzzList from "@/components/BuzzList/BuzzList";
import GuestWelcome from "@/components/GuestWelcome";

export default function Home() {
  const [Home, setHome] = useState();
  const router = useRouter();
  useEffect(() => {
    setAuthToken(localStorage.getItem("jwtToken"));
    if (localStorage.getItem("jwtToken")) {
      setHome(<BuzzList />);
    } else {
      setHome(<GuestWelcome />);
    }
  }, [router]);

  return <>{Home}</>;
}
