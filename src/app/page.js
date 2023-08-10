"use client";
import { useEffect, useState } from "react";
import setAuthToken from "../utils/setAuthToken";

//--Components
import PageHeader from "@/components/page_header";
import BuzzList from "@/components/BuzzList/BuzzList";

export default function Home() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [age, setAge] = useState(null);
  const [name, setName] = useState("Dylan");

  // useEffect(() => {
  //   fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // data is an object
  //       setData(data);
  //       setLoading(false);
  //     });
  // }, []);

  // if (isLoading) return <p>Loading...</p>;
  // if (!data) return <p>No data shown...</p>;
  //main -> className={styles.main}
  //<p>{data.message}</p>;

  return (
    <>
      <PageHeader />
      <main id="flexError" className="flex-col items-center">
        <p>Main Page</p>
        <BuzzList />
      </main>
    </>
  );
}
