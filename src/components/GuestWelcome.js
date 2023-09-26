"use client";

import PageHeader from "@/components/page_header";
import { useRouter } from "next/navigation";

export default function GuestWelcome() {
  const router = useRouter();

  function handleGettingStarted() {
    router.push("/auth/login");
  }

  return (
    <div className="bg-slate-300 w-[100vw]">
      <div className="fixed top-0 w-full">
        <PageHeader />
      </div>
      <main id="flexError" className="flex-col items-center">
        <div className="flex justify-evenly w-full py-12 mt-headerH  bg bg-gradient-to-b from-slate-100 to-slate-300">
          <div className="bg-[url('/static/images/Birthday_Reminder.png')] w-[40vw] h-[40vw] bg-cover rounded-md"></div>
          <div className="w-[40vw] h-[40vw] bg-[#AAAEAA] text-black p-8 rounded-md">
            <div className="flex flex-col items-center">
              <p className="text-4xl font-semibold text-center mb-3">
                Remember Their Birthday
              </p>
              <hr className="w-[32vw] h-2 bg-black opacity-30 rounded-md mb-8"></hr>
            </div>
            <div className="flex mb-4">
              <span className="text-4xl text-black">- </span>
              <p className="text-2xl ml-2 mt-1">
                Never forget another birthday
              </p>
            </div>
            <div className="flex mb-4">
              <span className="text-4xl text-black">- </span>
              <p className="text-2xl ml-2 mt-1">
                We let you know when the big day is coming up
              </p>
            </div>
            <div className="flex mb-4">
              <span className="text-4xl text-black">- </span>
              <p className="text-2xl ml-2 mt-1">
                Custom notification message and notification time
              </p>
            </div>
            <div className="flex mb-8">
              <span className="text-4xl text-black">- </span>
              <p className="text-2xl ml-2 mt-1">
                Its as simple as adding your friends and family to a buzz list
                and getting notified
              </p>
            </div>
            <div className="w-full flex justify-center">
              <button
                className="text-3xl font-bold opacity-70 bg-slate-500 rounded-md p-4"
                onClick={handleGettingStarted}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center w-full bg bg-gradient-to-b from-slate-100 to-slate-300 text-black py-12">
          <p className="text-4xl font-semibold text-center mb-10">
            How it works
          </p>
          <div className="flex justify-evenly w-full">
            <div className="flex flex-col items-center">
              <div className="bg-[url('/static/images/Signup_Icon.jpg')] w-[268px] h-[250px] bg-contain"></div>
              <p className="text-2xl font-bold ml-[18px] mt-2">Register</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-[url('/static/images/Input_Birthdays_Icon.png')] w-[250px] h-[250px] bg-contain"></div>
              <p className="text-2xl font-bold mt-2">Fill out birthdays</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-[url('/static/images/Notification_Time_Icon.png')] w-[250px] h-[250px] bg-contain"></div>
              <p className="text-2xl font-bold mt-2">Set notification time</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-[url('/static/images/Get_Notified_Icon.png')] w-[250px] h-[250px] bg-contain"></div>
              <p className="text-2xl font-bold mt-2">Get notified</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
