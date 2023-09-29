"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import handleLogout from "../utils/handleLogout";

export default function PageHeader({ currentPage }) {
  //State Variables
  const [pageTabs, setPageTabs] = useState(null); //Page tabs for user navigation
  const [accountTabs, setAccountTabs] = useState(null); //Page tabs for user navigation
  const [dependency, setDependency] = useState(false); //Dependency varibale for the useEffect hook that checks if a user is loged in or not

  //Router
  const router = useRouter();

  //----Logs the current user out and redirects them to the home page
  function handleLogoutButton() {
    handleLogout();
    router.push("/auth/login");
  }

  function returnToLandingPage() {
    router.push("/");
  }

  //The purpose of this useEffect is to allow localStorage (which doesn't exist until the window is loaded)
  //...to be a dependency variable for the useEffect hook that checks if a user is logged in or not
  useEffect(() => {
    if (localStorage) {
      setDependency(false);
    } else {
      setDependency(localStorage.getItem("jwtToken"));
    }
  }, [handleLogoutButton]);

  //If the user is signed in, show Home, My Themes, My Account, and Logout tabs, otherwise only show Login and Signup tab
  //Home Tab and "Colorz" text are repeated in both to avoid text jolt from when state values kick in
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
            className={`tab text-pageTab text-gray-400 pt-1}`}
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
          <Link href={`/auth/login`} className="tab text-pageTab pt-1">
            Login
          </Link>
          <span className="ml-3 mr-3 text-pageTab font-medium text-gray-400 pt-1">
            |
          </span>
          <Link
            href="/auth/signup"
            className="tab bg-button2 rounded-lg px-3 py-2 text-pageTab text-black"
          >
            Signup
          </Link>
        </>
      );
    }
  }, [dependency]);

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
      <div className="basis-3/5 flex justify-left ml-VH5 items-center">
        <h1 className="pl-20 pr-20 font-semibold" onClick={returnToLandingPage}>
          Birthday Buzz
        </h1>
        {pageTabs}
      </div>
      <div className="basis-2/5">
        <div className="text-base text-end mr-10">{accountTabs}</div>
      </div>
    </div>
  );
}
