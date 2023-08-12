"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import PageHeader from "../../../components/page_header";

const Signup = () => {
  const router = useRouter();
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(false);

  //Signup input field states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setphone] = useState(""); 
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [password, setPassword] = useState("");

  const BASE_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";

  //----Input event handlers
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleBirthday = (e) => {
    setBirthday(e.target.value);
  };
  const handlephone = (e) => {
    setphone(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  //----Form submit event handler
  const handleSubmit = (e) => {
    e.preventDefault(); // prevents html form default refresh
    //Gather new user data
    const newUser = {
      firstName,
      lastName,
      birthday,
      phone,
      email,
      password,
    };
    //--Post to server new user
    axios
      .post(`${BASE_URL}/auth/signup`, newUser) //process.env.NEXT_PUBLIC_SERVER_URL
      .then((response) => {
        setRedirect(true);
      })
      .catch((error) => {
        if (error.response.data.message === "Email already exists") {
          console.log("===> Error in Signup", error.response.data.message);
          setError(true);
        }
      });
  };

  //--If user is succesfully created redirect user to login
  if (redirect) {
    router.push("/auth/login");
  }

  //--If user is not succesfully created display error message and signup or login options
  if (error) {
    return (
      <div className="flexError flex-col items-center bg-slate-600">
        <p>Email already exists</p>
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
      <div
        id="flexError"
        className="flex justify-center text-white bg-slate-600"
      >
        <form onSubmit={handleSubmit}>
          <h1 className="text-center">Sign Up</h1>
          <p className="text-muted">Create an account below to get started</p>
          <div id="flexError" className="inputs text-black flex-col gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              value={firstName}
              onChange={handleFirstName}
              required
            />
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              value={lastName}
              onChange={handleLastName}
              required
            />
            <input
              type="text"
              className="form-control"
              placeholder="Birthday"
              value={birthday}
              onChange={handleBirthday}
              required
            />
            <input
              type="text"
              className="form-control"
              placeholder="Cellphone Number"
              value={phone}
              onChange={handlephone}
              required
            />
            <input
              type="email"
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
              value={password}
              onChange={handlePassword}
              required
            />
          </div>
          <div className="flex justify-center mt-2 mb-2">
            <button type="submit" className="bg-slate-500 pl-1 pr-1 rounded-md">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
