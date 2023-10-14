"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import handleLogout from "../utils/handleLogout";

export default function Header({ currentPage }) {
  //State Variables
  const [pageTabs, setPageTabs] = useState(null); //Page tabs for user navigation
  const [accountTabs, setAccountTabs] = useState(null); //Page tabs for user navigation

  //Router
  const router = useRouter();

  //----Logs the current user out and redirects them to the home page
  function handleLogoutButton() {
    handleLogout();
    router.push("/auth/login");
  }

  //If the user is signed in, show Home, My Themes, My Account, and Logout tabs, otherwise only show Login and Signup tab
  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      setPageTabs(
        <>
          <Link
            href="/"
            id="HomeTab"
            className={`tab text-pageTab text-gray-400 pt-1}`}
          >
            Home
          </Link>
          <span className="ml-3 mr-3 text-pageTab font-medium text-gray-400 pt-1">
            |
          </span>
          <Link
            href={`/find`}
            id="FindTab"
            className={`tab text-pageTab text-gray-400 focus:text-button2}`}
          >
            Find
          </Link>
          <span className="ml-3 mr-3 text-pageTab font-medium text-gray-400 pt-1">
            |
          </span>
          <Link
            href={`/account`}
            id="AccountTab"
            className={`tab text-pageTab text-gray-400 pt-1}`}
          >
            Account
          </Link>
        </>
      );
      setAccountTabs(
        <Link
          href={`/auth/login`}
          className="tab bg-slate-300 rounded-lg px-3 py-2 text-pageTab text-black"
          onClick={handleLogoutButton}
        >
          Logout
        </Link>
      );
    } else {
      setPageTabs(null);
      setAccountTabs(
        <>
          <Link
            href={`/auth/login`}
            className="tab text-md xs:text-lg sm:text-pageTab pt-1 text-white lg:hover:text-button2 duration-500"
          >
            Login
          </Link>
          <span className="mx-2 sm:mx-3 text-pageTab font-medium text-gray-400 pt-1">
            |
          </span>
          <Link
            href="/auth/signup"
            className="tab bg-button2 rounded-lg px-3 py-2 text-black lg:hover:bg-white text-md xs:text-lg sm:text-pageTab duration-500"
          >
            Signup
          </Link>
        </>
      );
    }
  }, [router]);

  //----Handles style properties for the tab of the page the user is currently on
  useEffect(() => {
    if (pageTabs !== null) {
      let pageTabs = document.querySelectorAll(".tab");
      pageTabs.forEach((tab) => {
        tab.classList.remove("text-gray-400");
        tab.classList.remove("text-button2");
      });
      if (currentPage) {
        document.querySelector(`#${currentPage}`).classList.add("text-button2");
      }
    }
  }, [pageTabs]);

  return (
    <div
      className={`flex items-center justify-center h-headerH bg-pageHBg text-white text-4xl font-header`}
    >
      <div className="basis-3/5 flex justify-left items-center">
        <h1
          className="text-xl xs:text-2xl sm2:text-3xl sm:text-4xl text-center px-[5vw] font-semibold lg:hover:text-button2 duration-500"
          onClick={() => router.push("/")}
        >
          Birthday Buzz
        </h1>
        {pageTabs}
      </div>
      <div className="basis-2/5">
        <div className="text-base text-end mr-[5vw]">{accountTabs}</div>
      </div>
    </div>
  );
}
