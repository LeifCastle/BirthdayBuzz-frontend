"use client";
import { useEffect, useState } from "react";
import setAuthToken from "../utils/setAuthToken";
import { useRouter } from "next/navigation";

//--Components
import PageHeader from "@/components/page_header";
import BuzzList from "@/components/BuzzList/BuzzList";

export default function Home() {
<<<<<<< HEAD
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
=======
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // data is an object
  //       setData("true");
  //       setLoading(false);
  //     });
  // }, []);

  // if (isLoading) return <p>Loading...</p>;
  // if (!data) return <p>No data shown...</p>;

  return (
    <>
      <PageHeader />
      <main id="flexError" className="flex-col items-center pt-4">
        <BuzzList />
      </main>
    </>
  );
>>>>>>> 6a47d99 (test)
}
