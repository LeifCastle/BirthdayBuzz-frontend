"use client";

import jwtDecode from "jwt-decode";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import List from "./List";
import NewEntry from "./NewEntry";
import setAuthToken from "../../utils/setAuthToken";
import Header from "../Header";

export default function BuzzList() {
  const router = useRouter(true);
  const [refresh, setRefresh] = useState(true); //Used to refresh the data populating the buzzlist after the user create or deletes an entry
  const [entryData, setEntryData] = useState([]); //Represents an array of entries in a user's buzzlist
  const [content, setContent] = useState(
    <List handleNewEntry={handleNewEntry} entryData={entryData} />
  );

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
            console.log("Response: ", response.data);
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
  }, [router, refresh]);

  function handleDeleteEntry(id) {
    console.log("Deleting");
    axios
      .delete(`${BASE_URL}/buzzlist/${localStorage.getItem("email")}/${id}`)
      .then((response) => {
        console.log("Response: ", response);
        setRefresh(!refresh);
      });
  }

  //--Update the user's buzzlist whenever entryData changes or
  useEffect(() => {
    setContent(
      <List
        handleNewEntry={handleNewEntry}
        entryData={entryData}
        handleDeleteEntry={handleDeleteEntry}
      />
    );
  }, [entryData]);

  function handleNewEntry() {
    setContent(
      <NewEntry
        setContent={setContent}
        handleNewEntry={handleNewEntry}
        entryData={entryData}
        setRefresh={setRefresh}
        refresh={refresh}
      />
    );
  }

  return (
    <div className="bg-[url('/static/images/App_Background.png')] w-[100vw] h-[100vh] bg-cover">
      <Header currentPage={"HomeTab"} />
      <main id="flexError" className="flex-col items-center pt-4">
        <div className="bg-layoutBg w-[80%] rounded-md">{content}</div>
      </main>
    </div>
  );
}
