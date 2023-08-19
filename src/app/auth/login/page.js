"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import setAuthToken from "../../../utils/setAuthToken";
import jwtDecode from "jwt-decode";
import PageHeader from "../../../components/page_header";

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
          <div className="flexError flex items-center justify-center bg-authFormBg h-[50px] w-[400px] mt-4 rounded-lg bg-opacity-80">
            <p className="text-red-800 text-[1.2rem]">
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
    <div className="bg-[url('/static/images/Auth_Background.png')] w-[100vw] h-[100vh] bg-cover">
      <PageHeader />
      <div className="flexError flex-col w-[100vw] items-center mt-[15vh] text-white">
        <form
          id="flexError"
          className="flexError flex-col items-center bg-authFormBg h-[210px] w-[400px] rounded-lg bg-opacity-80"
          onSubmit={handleSubmit}
        >
          <div className="flexError flex items-center justify-center mb-7 w-full bg-authFormBg h-10 rounded-tl-lg rounded rounded-tr-lg bg-opacity-90">
            <h1 className="text-[1.75rem]">Logging In...</h1>
          </div>
          <div
            id="flexError"
            className="flexError text-black flex-col gap-2 items-center"
          >
            <input
              type="text"
              className="input placeholder:text-slate-400 text-black rounded-md bg-slate-300 pl-2 h-[30px]"
              placeholder="Email"
              value={email}
              onChange={handleEmail}
              required
            />
            <input
              type="password"
              className="input placeholder:text-slate-400 text-black rounded-md bg-slate-300 pl-2 h-[30px]"
              placeholder="Password"
              value={password}
              onChange={handlePassword}
              required
            />
          </div>
          <div className="flex items-center mt-4 mb-4">
            <button
              type="submit"
              className="bg-button1 rounded-md mr-2 pl-4 pr-4 h-[40px]"
            >
              Login
            </button>
          </div>
        </form>
        <div>{error}</div>
      </div>
    </div>
  );
}
