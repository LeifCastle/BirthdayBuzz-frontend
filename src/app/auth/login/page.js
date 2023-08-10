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
          <a href="/auth/login" type="button" className="bg-slate-500 mt-3">
            Login
          </a>
          <span> </span>
          <a href="/auth/signup" type="button" className="bg-slate-500 mt-3">
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
          <p className="text-muted">Sign In to your account</p>
          <div
            id="flexError"
            className="flexError text-black flex-col gap-2 items-center"
          >
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={handleEmail}
              required
            />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              alue={password}
              onChange={handlePassword}
              required
            />
          </div>
          <div className="row">
            <button type="submit" className="bg-slate-500 px-4 rounded-md mt-2">
              Login
            </button>
          </div>
          <br />
          <h2>Don&apos;t have an account? Sign Up Now!</h2>
          <a
            href="/auth/signup"
            type="button"
            className="bg-slate-500 mt-3 pl-1 pr-1 rounded-md mb-2"
          >
            Register Now!
          </a>
        </form>
      </div>
    </>
  );
}
