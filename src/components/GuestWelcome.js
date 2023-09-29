"use client";

import PageHeader from "@/components/page_header";
import { useRouter } from "next/navigation";

export default function GuestWelcome() {
  const router = useRouter();

  function handleGettingStarted() {
    router.push("/auth/signup");
  }

  return (
    <div className="bg-slate-300 w-[100vw]">
      <div className="fixed top-0 w-full z-[2]">
        <PageHeader currentPage={"HomeTab"} />
      </div>
      <main id="flexError" className="flex-col items-center">
        <div className="flex justify-evenly w-full py-12 mt-headerH bg-gradient-to-b from-slate-100 to-slate-300">
          <div className="bg-[url('/static/images/Birthday_Reminder.png')] w-[30vw] h-[30vw] bg-cover rounded-md"></div>
          <div className="w-[50vw] h-[30vw] bg-[#bebebe] text-black p-8 rounded-md">
            <div className="flex flex-col items-center">
              <p className="text-4xl font-semibold text-center mb-3">
                Remember Their Birthday
              </p>
              <hr className="w-[32vw] h-2 bg-black opacity-30 rounded-md mb-8"></hr>
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
            <div className="flex">
              <span className="text-4xl text-black">- </span>
              <p className="text-2xl ml-2 mt-1">
                Its as simple as adding your friends and family to your buzz
                list and getting notified
              </p>
            </div>
            <div className="grow flex items-center justify-center w-full h-[40%]">
              <button
                className="w-[75%] h-[50%] hover:w-[80%] hover:h-[55%] hover:text-4xl hover:bg-white hover:rounded-[16px] text-3xl font-bold opacity-70 bg-button2 rounded-[10px] p-4 transition-all ease-linear duration-[200ms]"
                onClick={handleGettingStarted}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center w-full bg-gradient-to-b from-slate-100 to-slate-300 text-black pt-8 pb-14">
          <p className="text-5xl font-semibold text-center mb-12">
            How It Works
          </p>
          <div className="flex justify-evenly w-full">
            <div className="flex flex-col items-center">
              <div className="bg-[url('/static/images/Signup_Icon.jpg')] w-[268px] h-[250px] bg-contain"></div>
              <p className="text-2xl font-bold ml-[18px] mt-2">Register</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-[url('/static/images/Input_Birthdays_Icon.png')] w-[250px] h-[250px] bg-contain"></div>
              <p className="text-2xl font-bold mt-2">Add Birthdays</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-[url('/static/images/Notification_Time_Icon.png')] w-[250px] h-[250px] bg-contain"></div>
              <p className="text-2xl font-bold mt-2">Pick Notification Time</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-[url('/static/images/Get_Notified_Icon.png')] w-[250px] h-[250px] bg-contain"></div>
              <p className="text-2xl font-bold mt-2">Get Notified</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
