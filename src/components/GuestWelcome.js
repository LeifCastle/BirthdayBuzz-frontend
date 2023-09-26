"use client";

import PageHeader from "@/components/page_header";

export default function GuestWelcome() {
  return (
    <div className="bg-slate-300 w-[100vw] h-[100vh] bg-cover">
      <PageHeader />
      <main id="flexError" className="flex-col items-center pt-4">
        <div className="flex justify-evenly w-full my-8">
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
              <button className="text-3xl font-bold opacity-70 bg-slate-500 rounded-md p-4">
                Get Started
              </button>
            </div>
          </div>
        </div>
        <div>
          <p className="text-4xl font-semibold text-center mb-3">
            How it works
          </p>
        </div>
      </main>
    </div>
  );
}
