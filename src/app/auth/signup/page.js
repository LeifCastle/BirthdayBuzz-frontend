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
  const [phone, setphone] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [password, setPassword] = useState("");

  const [verificationHTML, setVerificationHTML] = useState();
  const code = useRef(false);
  const codeSent = useRef(false);

  const BASE_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";

  const verifHTML = (
    <div>
      <p>Please enter your six-digit verification code</p>
      <div className="flex">
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
          className="placeholder:text-slate-400 text-black rounded-md bg-slate-300 pl-2 h-[40px]"
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
  const handlephone = (e) => {
    setphone(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  //------------------------------------User Email Verification-------------------------------------\\

  //----------Send an email verification from the backend
  async function sendEmailVerification(email) {
    axios
      .post(`${BASE_URL}/auth/verify`, { email: email })
      .then((response) => {
        console.log("Message: ", response.data.message);
        if (response.data.result === true) {
          renderVerificationHTML();
        } else {
          document
            .querySelector("#signupForm")
            .setAttribute("hidden", "hidden");
          setVerificationHTML(<p>{response.data.message}</p>);
          setTimeout(() => {
            codeSent.current = false;
            handleReturnToSignup();
          }, 2000);
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }

  //----------Render email verification HTML
  function renderVerificationHTML() {
    codeSent.current = true;
    setVerificationHTML(verifHTML);
    document.querySelector("#signupForm").setAttribute("hidden", "hidden");
  }

  //----------Render signup form HTML
  function handleReturnToSignup() {
    setVerificationHTML();
    document.querySelector("#signupForm").removeAttribute("hidden");
  }

  //----------Verify User Code
  function handleCodeVerification() {
    axios
      .get(`${BASE_URL}/auth/checkVerify/${email}/${code.current}`)
      .then((response) => {
        console.log("Message: ", response.data.message);
        if (response.data.result === true) {
          console.log(`Code Matched`);
          createNewUser();
        } else {
          setVerificationHTML(
            <p className="text-red-800">Code does not match</p>
          );
          setTimeout(() => {
            setVerificationHTML(verifHTML);
          }, 2000);
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }

  //----------------------------------------User Signup-----------------------------------------\\

  //----------Sends verification email
  function handleSignup(e) {
    e.preventDefault();
    if (codeSent.current) {
      renderVerificationHTML();
    } else {
      sendEmailVerification(email);
    }
  }

  //Resets code sent values when the page refreshes
  useEffect(() => {
    codeSent.current = false;
  }, [router]);

  //----------Creates a new user
  function createNewUser() {
    const newUser = {
      firstName,
      lastName,
      birthday,
      phone,
      email,
      password,
    };
    axios
      .post(`${BASE_URL}/auth/signup`, newUser) //process.env.NEXT_PUBLIC_SERVER_URL
      .then((response) => {
        setRedirect(true);
      })
      .catch((error) => {
        console.log(`Error creating new user: ${error}`);
      });
  }

  //----------If user is succesfully created redirect user to login
  if (redirect) {
    router.push("/auth/login");
  }

  return (
    <>
      <PageHeader />
      <div
        id="flexError"
        className="flex justify-center text-white bg-slate-600"
      >
        {verificationHTML}
        <form id="signupForm" onSubmit={handleSignup}>
          <h1 className="text-center">Sign Up</h1>
          <p className="text-muted">Create an account below to get started</p>
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
              type="text"
              className="placeholder:text-slate-400 text-black rounded-md bg-slate-300 pl-2 h-[30px]"
              placeholder="Cellphone Number"
              value={phone}
              onChange={handlephone}
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
          <div className="flex justify-center mt-2 mb-2">
            <button
              type="submit"
              className="bg-button1 rounded-md mr-2 pl-4 pr-4 h-[40px]"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
