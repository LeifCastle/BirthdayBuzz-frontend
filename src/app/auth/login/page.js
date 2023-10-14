"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import setAuthToken from "../../../utils/setAuthToken";
import jwtDecode from "jwt-decode";
import Header from "@/components/Header";

export default function Login() {
  const router = useRouter();
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(false);
  const BASE_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";

  //Login input field states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //----Input event handlers
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  //----Form submit event handler
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent default html form refresh
    axios
      .post(`${BASE_URL}/auth/login`, {
        email,
        password,
      })
      .then((response) => {
        console.log("User Login Response:", response);
        localStorage.setItem("jwtToken", response.data.token);
        localStorage.setItem("email", response.data.userData.email);
        localStorage.setItem("expiration", response.data.userData.exp);
        setAuthToken(response.data.token);
        let decoded = jwtDecode(response.data.token); //Remove this?
        setRedirect(true);
      })
      .catch((error) => {
        setPassword("");
        setError(
          <div className="flex items-center justify-center sm:bg-authFormBg h-[50px] w-full rounded-lg bg-opacity-80">
            <p className="text-2xl font-[500] text-red-700">
              {error.response.data.message}
            </p>
          </div>
        );
        setTimeout(() => {
          setError();
        }, 4000);
      });
  };

  //----If user succesfully logs in redirect them to the home page
  if (redirect) {
    router.push("/");
  }

  return (
    <div className="relative w-[100vw] h-screen">
      <Header currentPage={"guest"} />
      <div
        id="background"
        className="bg-[url('/static/images/Auth_Background.png')] w-full h-full bg-cover animate-fadeSlow absolute top-0 z-[-1]"
      ></div>
      <div className="flex flex-col items-center w-full h-full">
        <form
          className="flex flex-col items-center relative bg-authFormBg w-full h-full sm:h-auto sm:w-[60vw] md:w-[50vw] lg:w-[40vw] xl:w-[30vw] sm:mt-[10vh] pt-[10vh] sm:pt-0 sm:rounded-lg bg-opacity-80"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center justify-center mb-[1.5rem] w-full bg-slate-200 text-black font-semibold h-[50px] sm:rounded-tl-lg sm:rounded-tr-lg bg-opacity-90">
            <h1 className="text-[2rem]">User Portal</h1>
          </div>
          <div className="flex text-black flex-col gap-3 text-xl items-center w-[80%] opacity-80">
            <input
              type="text"
              className="input placeholder:text-slate-500 rounded-md bg-slate-300 pl-2 h-[40px] w-full"
              placeholder="Email"
              value={email}
              onChange={handleEmail}
              required
            />
            <input
              type="password"
              className="input placeholder:text-slate-500 rounded-md bg-slate-300 pl-2 h-[40px] w-full"
              placeholder="Password"
              value={password}
              onChange={handlePassword}
              required
            />
          </div>
          <div className="flex items-center text-black font-semibold text-xl my-[2.2rem] w-[80%]">
            <button
              type="submit"
              className="w-full bg-button2 rounded-md text-2xl px-4 h-[50px] lg:hover:bg-white duration-500"
            >
              Login
            </button>
          </div>
          <div className="w-full sm:absolute sm:bottom-[-5rem]">{error}</div>
        </form>
      </div>
    </div>
  );
}
