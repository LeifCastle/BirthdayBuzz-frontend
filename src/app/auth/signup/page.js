"use client";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import PageHeader from "../../../components/page_header";

const Signup = () => {
  const router = useRouter();
  const [redirect, setRedirect] = useState(false);

  //Signup input field states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [password, setPassword] = useState("");

  const [verificationHTML, setVerificationHTML] = useState();
  const code = useRef(false); //User email verification code attempt
  const [error, setError] = useState();

  const BASE_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";

  const verifHTML = (
    <div className="flexError flex-col items-center bg-authFormBg h-[150px] w-[400px] mt-[10vh] rounded-lg bg-opacity-80">
      <div className="flexError flex items-center justify-center mb-2 w-full bg-authFormBg h-10 rounded-tl-lg rounded rounded-tr-lg bg-opacity-90">
        <h1 className="text-[1.75rem]">Verifying Email Address...</h1>
      </div>
      <p className="mb-3">Please enter your six-digit verification code</p>
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
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
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
      firstName,
      lastName,
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

  //Resets code sent values when the page refreshes
  useEffect(() => {
    codeSent.current = false;
  }, [router]);

  return (
    <div className="bg-[url('/static/images/Auth_Background.png')] w-[100vw] h-[100vh] bg-cover">
      <PageHeader />
      <div
        id="flexError"
        className="flexError flex-col items-center text-white"
      >
        {verificationHTML}
        <div id="signupForm">
          <form
            className="flexError flex-col items-center bg-authFormBg h-[325px] w-[400px] mt-[10vh] rounded-lg bg-opacity-80"
            onSubmit={handleSignup}
          >
            <div className="flexError flex items-center justify-center mb-7 w-full bg-authFormBg h-10 rounded-tl-lg rounded rounded-tr-lg bg-opacity-90">
              <h1 className="text-[1.75rem]">Creating An Account...</h1>
            </div>
            <div id="flexError" className="inputs text-black flex-col gap-2">
              <input
                type="text"
                className="placeholder:text-slate-400 text-black rounded-md bg-slate-300 pl-2 h-[30px]"
                placeholder="First Name"
                value={firstName}
                onChange={handleFirstName}
                required
              />
              <input
                type="text"
                className="placeholder:text-slate-400 text-black rounded-md bg-slate-300 pl-2 h-[30px]"
                placeholder="Last Name"
                value={lastName}
                onChange={handleLastName}
                required
              />
              <input
                type="text"
                className="placeholder:text-slate-400 text-black rounded-md bg-slate-300 pl-2 h-[30px]"
                placeholder="Birthday"
                value={birthday}
                onChange={handleBirthday}
                required
              />
              <input
                type="email"
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
                value={password}
                onChange={handlePassword}
                required
              />
            </div>
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="bg-button1 rounded-md mr-2 pl-4 pr-4 h-[40px]"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
        <div>{error}</div>
      </div>
    </div>
  );
};

export default Signup;
