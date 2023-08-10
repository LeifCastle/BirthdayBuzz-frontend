"use client";

import jwtDecode from "jwt-decode";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ColumnHeaders from "./ColumnHeaders";
import Entries from "./Entries";
import handleLogout from "../../utils/handleLogout";
import setAuthToken from "../../utils/setAuthToken";

export default function BuzzList() {
  //const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const [entryData, setEntryData] = useState([]); //Represents an array of entries in a user's buzzlist

  const BASE_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";

  //User login expiration
  // const expirationTime = new Date(
  //   parseInt(localStorage.getItem("expiration")) * 1000
  // );
  // let currentTime = Date.now();
  // if (currentTime >= expirationTime) {
  //   handleLogout();
  //   alert("Session has ended. Please login to continue.");
  //   router.push("/auth/login");
  // }

  //--Grab data from a user's buzzlist
  useEffect(() => {
    setAuthToken(localStorage.getItem("jwtToken"));
    if (localStorage.getItem("jwtToken")) {
      axios
        .get(`${BASE_URL}/buzzlist/${localStorage.getItem("email")}`)
        .then((response) => {
          let userData = jwtDecode(localStorage.getItem("jwtToken"));
          if (userData.email === localStorage.getItem("email")) {
            console.log(`Response: ${response.data}`);
            setEntryData(response.data);
            //setLoading(false);
          } else {
            router.push("/auth/login");
          }
        })
        .catch((error) => {
          console.log(`Error fetchign data: ${error}`);
          router.push("/auth/login");
        });
    } else {
      router.push("/auth/login");
    }
  }, [router]);

  //if (isLoading) return <p>Loading...</p>;

  return (
    <div className="bg-layoutBg w-[80%] rounded-md">
      <ColumnHeaders />
      <ol>
        <Entries data={entryData} />
      </ol>
      <button className="w-full text-center">
        <span className="text-2xl mr-2">+</span>Birthday
      </button>
    </div>
  );
}
