"use client";
import { useState, useRef } from "react";
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

  const [verificationHTML, setVerificationHTML] = useState();
  const code = useRef(false); //User email verification code attempt
  const [error, setError] = useState();

  const BASE_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";

  const verifHTML = (
    <div className="flexError flex-col items-center bg-authFormBg h-[160px] w-[400px] mt-[10vh] rounded-lg bg-opacity-80">
      <div className="flexError flex items-center justify-center mb-2 w-full bg-authFormBg h-10 rounded-tl-lg rounded rounded-tr-lg bg-opacity-90">
        <h1 className="text-[1.75rem]">Verifying Email Address...</h1>
      </div>
      <p className="mb-1 text-sm">
        Please check your email for your four digit verification code
      </p>
      <p className="mb-3 italic text-sm">
        Hint: Check your spam folder and mark us as not spam
      </p>
      <div className="flexError flex">
        <button
          className="bg-button1 rounded-md mr-3 pl-4 pr-4 h-[40px]"
          onClick={handleReturnToSignup}
        >
          Back
        </button>
        <input
          type="number"
          maxLength={6}
          placeholder="123456"
          className="placeholder:text-slate-400 text-black rounded-md bg-slate-300 pl-2 h-[40px] w-[100px]"
          onChange={(e) => (code.current = e.target.value)}
        ></input>
        <button
          className="bg-button1 rounded-md ml-3 pl-4 pr-4 h-[40px]"
          onClick={handleCodeVerification}
        >
          Verify Code
        </button>
      </div>
    </div>
  );

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
        setEmail("");
        setPassword("");
        setError(
          <div className="flexError flex items-center justify-center bg-authFormBg h-[60px] w-[400px] mt-4 rounded-lg bg-opacity-80">
            <p className="text-red-800 text-[1.2rem] p-4 text-center">
              {error.response.data.message}
            </p>
          </div>
        );
        setTimeout(() => {
          setError();
        }, 5000);
      });
  }

  //----------Render email verification HTML  (3)
  function renderVerificationHTML() {
    setVerificationHTML(verifHTML);
    document.querySelector("#signupForm").setAttribute("hidden", "hidden");
  }

  //----------Render signup form HTML
  function handleReturnToSignup() {
    setVerificationHTML();
    document.querySelector("#signupForm").removeAttribute("hidden");
    setPassword("");
    setEmail("");
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
  }

  //----------If user is succesfully created redirect user to login
  if (redirect) {
    router.push("/auth/login");
  }

  return (
    <div className="relative w-[100vw] h-screen overflow-clip">
      <Header currentPage={"guest"} />
      <div
        id="background"
        className="bg-[url('/static/images/Auth_Background.png')] w-full h-full bg-cover animate-fadeSlow absolute top-0 z-[-1]"
      ></div>
      <div className="flex flex-col items-center text-white animate-fadeFast w-full h-full">
        {verificationHTML}
        <form
          id="signupForm"
          className="flexError flex-col items-center bg-authFormBg w-full h-full sm:h-auto sm:w-[60vw] md:w-[50vw] lg:w-[40vw] xl:w-[30vw] sm:mt-[10vh] pt-[10vh] sm:pt-0 sm:rounded-lg bg-opacity-80"
          onSubmit={handleSignup}
        >
          <div className="flexError flex items-center justify-center mb-7 w-full bg-slate-200 text-black font-semibold h-[50px] sm:rounded-tl-lg sm:rounded-tr-lg bg-opacity-90">
            <h1 className="text-[1.75rem]">User Portal</h1>
          </div>
          <div
            id="flexError"
            className="inputs text-black flex-col gap-3 w-[80%] opacity-80 text-xl"
          >
            <input
              type="text"
              className="placeholder:text-slate-400 text-black rounded-md bg-slate-300 pl-2 h-[40px]"
              placeholder="Name"
              value={name}
              onChange={handleName}
              required
            />
            <input
              type="date"
              className="placeholder:text-slate-400 text-black rounded-md bg-slate-300 pl-2 h-[40px]"
              placeholder="Birthday"
              value={birthday}
              onChange={handleBirthday}
              required
            />
            <input
              type="email"
              className="placeholder:text-slate-400 text-black rounded-md bg-slate-300 pl-2 h-[40px]"
              placeholder="Email"
              value={email}
              onChange={handleEmail}
              required
            />
            <input
              type="password"
              className="placeholder:text-slate-400 text-black rounded-md bg-slate-300 pl-2 h-[40px]"
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
            <button className="bg-slate-300 opacity-80 rounded-md px-4 w-full h-[40px] text-black font-semibold text-2xl lg:hover:bg-white duration-500">
              Continue As Guest
            </button>
          </div>
        </form>
        <div>{error}</div>
      </div>
    </div>
  );
};

export default Signup;
