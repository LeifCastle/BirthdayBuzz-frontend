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
        let decoded = jwtDecode(response.data.token);
        setRedirect(true);
      })
      .catch((error) => {
        console.log("E:", error);
        setError(error.response.data.message);
      });
  };

  //----If user succesfully logs in redirect them to the home page
  if (redirect) {
    router.push("/");
  }

  //----If user does not succesfully log in display error
  if (error != false) {
    return (
      <div className="flexError flex-col items-center bg-slate-600">
        <p>{error}</p>
        <div>
          <a
            href="/auth/login"
            type="button"
            className="bg-button1 rounded-md mt-4 pl-4 pr-4 h-[25px]"
          >
            Login
          </a>
          <span> </span>
          <a
            href="/auth/signup"
            type="button"
            className="bg-button1 rounded-md mb-4 pl-4 pr-4 h-[25px]"
          >
            Signup
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageHeader />
      <div className="flex justify-center text-white bg-slate-600">
        <form
          id="flexError"
          className="flexError flex-col items-center bg-slate-600"
          onSubmit={handleSubmit}
        >
          <h1 className="text-red">Login</h1>
          <div
            id="flexError"
            className="flexError text-black flex-col gap-2 items-center"
          >
            <input
              type="text"
              className="placeholder:text-slate-400 text-black rounded-md bg-slate-300 pl-2 h-[30px]"
              placeholder="Email"
              value={email}
              onChange={handleEmail}
              required
            />
            <input
              type="password"
              className="placeholder:text-slate-400 text-black rounded-md bg-slate-300 pl-2 h-[30px]"
              placeholder="Password"
              alue={password}
              onChange={handlePassword}
              required
            />
          </div>
          <div className="flex items-center mt-4 mb-4">
            <button
              type="submit"
              className="bg-button1 rounded-md pl-4 pr-4 h-[25px]"
            >
              Login
            </button>
            <a
              href="/auth/signup"
              type="button"
              className="bg-button1 rounded-md ml-4 pl-4 pr-4 h-[25px]"
            >
              Signup
            </a>
          </div>
        </form>
      </div>
    </>
  );
}
