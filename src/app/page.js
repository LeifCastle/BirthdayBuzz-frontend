"use client";
import { useEffect, useState } from "react";
import setAuthToken from "../utils/setAuthToken";
import PageHeader from "@/components/page_header";

export default function Home() {
  // state is what the data is representing in realtime
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [age, setAge] = useState(null);
  const [name, setName] = useState("Dylan");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/`)
      .then((res) => res.json())
      .then((data) => {
        // data is an object
        setData(data);
        setLoading(false);
      });
  }, []);

  // if (isLoading) return <p>Loading...</p>;
  // if (!data) return <p>No data shown...</p>;
  //main -> className={styles.main}
  //<p>{data.message}</p>;

  return (
    <main>
      <PageHeader />
      <p>Main Page</p>
    </main>
  );
}
