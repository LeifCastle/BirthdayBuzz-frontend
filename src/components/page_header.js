"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import handleLogout from "../utils/handleLogout";

export default function PageHeader() {
  //State Variables
  const [logout, setLogout] = useState(); //User login/logout button
  const [pageTabs, setPageTabs] = useState(); //Page tabs for user navigation
  const [dependency, setDependency] = useState(false); //Dependency varibale for the useEffect hook that checks if a user is loged in or not

  //Router
  const router = useRouter();

  //----Logs the current user out and redirects them to the home page
  function handleLogoutButton() {
    handleLogout();
    router.push("/");
    window.location.reload(); //Neccesary to refresh pageHeader tabs when the user logs out from the home page not sure why since logout function removes the jwtToken from local storage so it should make no difference what route you're in
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

  //If the user is signed in, show Home, My Themes, My Account, and Logout tabs, otherwise only show Home and Login tab
  //Home Tab and "Colorz" text are repeated in both to avoid text jolt from when state values kick in
  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      setPageTabs(
        <>
          <h1 className="pl-20 pr-10">Colorz</h1>
          <Link href="/" className="text-base pt-1">
            Home
          </Link>
          <span className="ml-3 mr-3 text-base text-bold text-gray-400 pt-1">
            |
          </span>
          <Link href={`/find`} className="text-base pt-1">
            Find
          </Link>
          <span className="ml-3 mr-3 text-base text-bold text-gray-400 pt-1">
            |
          </span>
          <Link href={`/account`} className="text-base pt-1">
            Account
          </Link>
        </>
      );
      setLogout(<button onClick={handleLogoutButton}>Logout</button>);
    } else {
      setPageTabs(
        <>
          <h1 className="pl-20 pr-10">Birthday Buzz</h1>
          <Link href="/" className="text-base pt-1">
            Home
          </Link>
          <span className="ml-3 mr-3 text-base text-bold text-gray-400 pt-1">
            |
          </span>
          <Link href={`/auth/login`} className="text-base pt-1">
            Login
          </Link>
        </>
      );
      setLogout();
    }
  }, [dependency]);

  return (
    <div
      className={`flex items-center justify-center h-headerH pb-1 border-b-[1px] border-[#4C4C4C] bg-pageHBg text-white text-4xl font-header`}
    >
      <div className="basis-2/5 flex justify-left ml-VH5 items-center">
        {pageTabs}
      </div>
      <div className="basis-3/5">
        <div className="text-base text-end mr-10">{logout}</div>
      </div>
    </div>
  );
}
