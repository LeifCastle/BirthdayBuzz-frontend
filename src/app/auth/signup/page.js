"use client";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";

const Signup = () => {
  const router = useRouter();
  const [redirect, setRedirect] = useState(false);

  //Signup input field states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [password, setPassword] = useState("");

  const code = useRef(false); //User email verification code attempt
  const [error, setError] = useState("");

  const BASE_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";

  //----Sets placeholder text color for birthdate input
  useEffect(() => {
    if (birthday !== "") {
      document.querySelector("#birthday").classList.remove("text-slate-500");
      document.querySelector("#birthday").classList.add("text-black");
    } else {
      document.querySelector("#birthday").classList.remove("text-black");
      document.querySelector("#birthday").classList.add("text-slate-500");
    }
  }, [birthday]);

  //----Input event handlers
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleBirthday = (e) => {
    setBirthday(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  //------------------------------------User Email Verification-------------------------------------\\

  //----------Send an email verification from the backend  (2)
  async function sendEmailVerification(email) {
    axios
      .post(`${BASE_URL}/auth/verify`, { email: email })
      .then((response) => {
        renderVerificationHTML();
      })
      .catch((error) => {
        //--Email already registered
        setPassword("");
        setError(error.response.data.message);
        document.querySelector("#error").classList.remove("hidden");
        setTimeout(() => {
          setError();
          document.querySelector("#error").classList.add("hidden");
        }, 40000);
      });
  }

  //----------Render email verification HTML  (3)
  function renderVerificationHTML() {
    document.querySelector("#signupForm").classList.remove("flex");
    document.querySelector("#verifyForm").classList.remove("hidden");
    document.querySelector("#verifyForm").classList.add("flex");
    document.querySelector("#signupForm").classList.add("hidden");
  }

  //----------Render signup form HTML
  function handleReturnToSignup() {
    document.querySelector("#verifyForm").classList.add("hidden");
    document.querySelector("#verifyForm").classList.remove("flex");
    document.querySelector("#signupForm").classList.remove("hidden");
    document.querySelector("#signupForm").classList.add("flex");
    setPassword("");
  }

  //----------Verify User Code  (4)
  function handleCodeVerification() {
    axios
      .get(`${BASE_URL}/auth/checkVerify/${email}/${code.current}`)
      .then((response) => {
        console.log("Message: ", response.data.message);
        createNewUser();
      })
      .catch((error) => {
        setPassword("");
        document.querySelector("#error").classList.remove("hidden");
        setError(error.response.data.message);
        setTimeout(() => {
          document.querySelector("#error").classList.add("hidden");
          setError();
        }, 40000);
      });
  }

  //----------------------------------------User Signup-----------------------------------------\\

  //----------Sends verification email  (1)
  function handleSignup(e) {
    e.preventDefault();
    sendEmailVerification(email);
  }

  //----------Creates a new user  (5)
  function createNewUser() {
    const newUser = {
      name,
      birthday,
      email,
      password,
    };
    axios
      .post(`${BASE_URL}/auth/signup`, newUser) //process.env.NEXT_PUBLIC_SERVER_URL
      .then((response) => {
        setRedirect(true);
      })
      .catch((error) => {
        setPassword("");
        setError(error.response.data.message);
        document.querySelector("#error").classList.remove("hidden");
        setTimeout(() => {
          setError();
          document.querySelector("#error").classList.add("hidden");
        }, 40000);
      });
  }

  function handleGuestAccess() {
    router.push("/");
  }

  function handleCodeUpdate(e) {
    if (e.target.value.length <= 4) {
      console.log(e.target.value.length);
      code.current = e.target.value;
    } else {
      e.target.value = code.current;
    }
  }

  //----------If user is succesfully created redirect user to login
  if (redirect) {
    router.push("/auth/login");
  }

  return (
    <div className="relative w-[100vw] h-screen">
      <Header currentPage={"guest"} />
      <div
        id="background"
        className="bg-[url('/static/images/Auth_Background.png')] w-full h-full bg-cover animate-fadeSlow absolute top-0 z-[-1]"
      ></div>
      <div className="flex flex-col items-center text-white w-full overflow-y-auto h-[90%]">
        <div
          id="verifyForm"
          className="hidden relative flex-col items-center bg-authFormBg w-full h-full sm:h-auto sm:w-[85vw] md:w-[75vw] lg:w-[55vw] xl:w-[45vw] sm:mt-[10vh] pt-[10vh] sm:pt-0 sm:rounded-lg bg-opacity-80"
        >
          <div className="flex items-center justify-center mb-[1.5rem] w-full bg-slate-200 text-black font-semibold h-[50px] sm:rounded-tl-lg sm:rounded-tr-lg bg-opacity-90">
            <h1 className="text-[2rem]">Email Verification</h1>
          </div>
          <p className="mb-3 text-2xl text-center w-[80%]">
            Please check your email for your four digit verification code
          </p>
          <div className="flex justify-center text-black my-[1rem] gap-3 w-[90%] xs:w-[80%]">
            <button
              className="w-[35%] bg-button2 font-semibold rounded-md text-2xl h-[65px] sm:h-[50px] px-1 lg:hover:bg-white duration-500"
              onClick={handleReturnToSignup}
            >
              Back
            </button>
            <input
              type="number"
              maxLength={4}
              placeholder="1234"
              className="w-[25%] placeholder:text-slate-400 rounded-md text-2xl bg-slate-300 pl-2 h-[65px] sm:h-[50px]"
              onChange={handleCodeUpdate}
            ></input>
            <button
              className="w-[35%] bg-button2 px-1 font-semibold rounded-md text-2xl h-[65px] sm:h-[50px] lg:hover:bg-white duration-500"
              onClick={handleCodeVerification}
            >
              Verify Code
            </button>
          </div>
          <p className="my-3 italic text-xl text-center text-white w-[80%]">
            Don't see it? Try checking your spam folder
          </p>
        </div>
        <form
          id="signupForm"
          className="relative flex flex-col items-center bg-authFormBg w-full h-full sm:h-auto sm:w-[85vw] md:w-[75vw] lg:w-[55vw] xl:w-[45vw] sm:mt-[10vh] pt-[10vh] sm:pt-0 sm:rounded-lg bg-opacity-80"
          onSubmit={handleSignup}
        >
          <div className="flex items-center justify-center mb-[1.5rem] w-full bg-slate-200 text-black font-semibold h-[50px] sm:rounded-tl-lg sm:rounded-tr-lg bg-opacity-90">
            <h1 className="text-[2rem]">User Portal</h1>
          </div>
          <div className="inputs flex text-black flex-col gap-3 w-[80%] opacity-80 text-xl">
            <input
              type="text"
              className="placeholder:text-slate-500 text-black rounded-md bg-slate-300 pl-2 h-[40px]"
              placeholder="Name"
              value={name}
              onChange={handleName}
              required
            />
            <input
              id="birthday"
              type="date"
              className="text-slate-500 rounded-md bg-slate-300 pl-2 h-[40px]"
              value={birthday}
              onChange={handleBirthday}
              required
            />
            <input
              type="email"
              className="placeholder:text-slate-500 text-black rounded-md bg-slate-300 pl-2 h-[40px]"
              placeholder="Email"
              value={email}
              onChange={handleEmail}
              required
            />
            <input
              type="password"
              className="placeholder:text-slate-500 text-black rounded-md bg-slate-300 pl-2 h-[40px]"
              placeholder="Password"
              value={password}
              onChange={handlePassword}
              required
            />
          </div>
          <div className="flex flex-col items-center w-[80%] my-[2.2rem]">
            <button
              type="submit"
              className="bg-button2 rounded-md px-4 w-full h-[50px] text-black font-semibold text-2xl lg:hover:bg-white duration-500"
            >
              Sign Up
            </button>
            <p className="my-[.75rem] text-3xl font-thin font-mono">Or</p>
            <button
              type="button"
              className="bg-slate-300 opacity-80 rounded-md px-4 w-full h-[40px] text-black font-semibold text-2xl lg:hover:bg-white duration-500"
              onClick={handleGuestAccess}
            >
              Continue As Guest
            </button>
          </div>
        </form>
        <div
          id="error"
          className="hidden h-auto w-full sm:w-[85vw] md:w-[75vw] lg:w-[55vw] xl:w-[45vw] sm:my-[2.2rem] pb-[2.2rem] sm:pb-0 sm:rounded-lg text-center opacity-80 bg-authFormBg"
        >
          <div className="flex items-center justify-center h-[50px]">
            <p className="text-2xl font-[500] text-red-700">{error}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
