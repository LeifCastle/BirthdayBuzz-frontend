"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Validate this import with your updated Next.js version.
import PageHeader from "@/components/page_header";
import Countdown from "@/components/Countdown";
import setAuthToken from "@/utils/setAuthToken";

export default function Account() {
  const router = useRouter();
  const [userData, setUserData] = useState("loading");
  const [refresh, setRefresh] = useState(false);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [birthday, setBirthday] = useState();
  const [timezone, setTimezone] = useState();
  const [buzzTime, setBuzzTime] = useState();
  const BASE_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";

  function updateBuzzTime(e) {
    setBuzzTime(e.target.value);
    axios
      .put(`${BASE_URL}/account/buzztime/${localStorage.getItem("email")}`, {
        buzzTime: e.target.value,
      })
      .then((response) => {
        console.log(response);
      });
  }

  function updateTimezone(e) {
    setTimezone(e.target.value);
    axios
      .put(`${BASE_URL}/account/timezone/${localStorage.getItem("email")}`, {
        timezone: e.target.value,
      })
      .then((response) => {
        console.log(response);
      });
  }

  function handleEditAccount() {
    document.querySelector("#editMyAccount").removeAttribute("hidden");
    document.querySelector("#myAccount").setAttribute("hidden", "hidden");
  }

  function saveAccountEdits() {
    document.querySelector("#myAccount").removeAttribute("hidden");
    document.querySelector("#editMyAccount").setAttribute("hidden", "hidden");
    const updatedUser = {
      firstName: firstName,
      lastName: lastName,
      birthday: birthday,
    };
    axios
      .put(
        `${BASE_URL}/account/edit/${localStorage.getItem("email")}`,
        updatedUser
      )
      .then((response) => {
        console.log(response);
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    setAuthToken(localStorage.getItem("jwtToken"));
    if (localStorage.getItem("jwtToken")) {
      axios
        .get(`${BASE_URL}/account/${localStorage.getItem("email")}`)
        .then((response) => {
          console.log("User Data: ", response.data[0]);
          setUserData(response.data[0]);
          setFirstName(response.data[0].firstName);
          setLastName(response.data[0].lastName);
          setBirthday(response.data[0].birthday);
          setBuzzTime(response.data[0].buzzTime);
          setTimezone(response.data[0].timezone);
        })
        .catch((error) => {
          console.error(
            "Error fetching user data:",
            error.response ? error.response.data : error
          );
        });
    } else {
      router.push("/auth/login");
    }
  }, [router, refresh]);

  if (userData !== "loading") {
    return (
      <div className="bg-[url('/static/images/App_Background.png')] w-[100vw] h-[100vh] bg-cover">
        <PageHeader />
        <div className="flex-col flexError place-content-between text-slate-200">
          <div className="flex flexError place-content-between">
            <div className="bg-slate-100 bg-opacity-[.15] ml-10 rounded-md">
              <h1 className="text-2xl font-bold text-center bg-cH1 bg-opacity-[1] rounded-tl-md rounded-tr-md">
                My Account
              </h1>
              <hr className="border-slate-400"></hr>
              <div id="myAccount">
                <div className="pl-4 pr-4 pt-2 pb-2 w-[300px] h-[130px]">
                  <p>First Name: {userData.firstName}</p>
                  <p className="mt-1">Last Name: {userData.lastName}</p>
                  <p className="mt-1">Email: {userData.email}</p>
                  <p className="mt-1">Birthday: {userData.birthday}</p>
                </div>
                <button
                  className="bg-button1 rounded-bl-md rounded-br-md mr-2 pl-4 pr-4 h-[40px] w-full hover:bg-opacity-[.8]"
                  onClick={handleEditAccount}
                >
                  Edit
                </button>
              </div>
              <div id="editMyAccount" hidden="hidden">
                <div className="pl-4 pr-4 pt-2 pb-2 w-[300px] h-[130px]">
                  <p>
                    First Name:
                    <input
                      className="ring-slate-200 ring-[1px] rounded-md ml-1 pl-2 w-[150px] bg-transparent bg-opacity-[.5]"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    ></input>
                  </p>
                  <p className="mt-1">
                    Last Name:
                    <input
                      className="ring-slate-200 ring-[1px] rounded-md ml-1 pl-2 w-[150px] bg-transparent bg-opacity-[.5]"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    ></input>
                  </p>
                  <p className="mt-1">Email: {userData.email}</p>
                  <p className="mt-1">
                    Birthday:
                    <input
                      className="ring-slate-200 ring-[1px] rounded-md ml-1 pl-2 w-[150px] bg-transparent bg-opacity-[.5]"
                      type="date"
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                    ></input>
                  </p>
                </div>
                <button
                  className="bg-[#404F60] rounded-bl-md rounded-br-md mr-2 pl-4 pr-4 h-[40px] w-full hover:bg-opacity-[.8]"
                  onClick={saveAccountEdits}
                >
                  Save
                </button>
              </div>
            </div>
            <div className="bg-slate-100 bg-opacity-[.15] mr-10 rounded-md w-[60vw]">
              <p className="text-2xl font-bold text-center bg-cH1 bg-opacity-[1] rounded-tl-md rounded-tr-md">
                Settings
              </p>
              <hr className="border-slate-400"></hr>
              <div className="flex flexError">
                <div className="ml-2 flex-basis-1/3 flex-col flexError items-center">
                  <p>Timezone: </p>
                  <select
                    className="bg-black bg-opacity-[.55] rounded-md p-1"
                    onChange={updateTimezone}
                    value={timezone}
                  >
                    Timezones
                    <option className="bg-black bg-opacity-[.85]" value="UTC">
                      UTC - Coordinated Universal Time
                    </option>
                    <option className="bg-black bg-opacity-[.85]" value="EST">
                      EST - Eastern Standard Time
                    </option>
                    <option className="bg-black bg-opacity-[.85]" alue="CST">
                      CST - Central Standard Time
                    </option>
                    <option className="bg-black bg-opacity-[.85]" value="MST">
                      MST - Mountain Standard Time
                    </option>
                    <option className="bg-black bg-opacity-[.85]" value="PST">
                      PST - Pacific Standard Time
                    </option>
                  </select>
                </div>
                <div className="ml-2 flex-basis-1/3 flex-col flexError items-center">
                  <p>Buzz Time: </p>
                  <select
                    className="bg-black bg-opacity-[.55] rounded-md p-1"
                    onChange={updateBuzzTime}
                    value={buzzTime}
                  >
                    Time of day
                    <option className="bg-black bg-opacity-[.85]" value="5AM">
                      5:00 AM
                    </option>
                    <option className="bg-black bg-opacity-[.85]" value="10AM">
                      10:00 AM
                    </option>
                    <option className="bg-black bg-opacity-[.85]" alue="CST">
                      Noon
                    </option>
                    <option className="bg-black bg-opacity-[.85]" value="MST">
                      2:00 PM
                    </option>
                    <option className="bg-black bg-opacity-[.85]" value="PST">
                      8:00 PM
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="self-center mt-20">
            <Countdown birthday={userData.birthday} />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="bg-[url('/static/images/App_Background.png')] w-[100vw] h-[100vh] bg-cover">
        <PageHeader />
      </div>
    );
  }
}
