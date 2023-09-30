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
      <main id="flexError" className="flex-col items-center h-screen">
        <div className="flex items-center justify-evenly w-full md:py-12 mt-headerH bg-gradient-to-b from-slate-100 to-slate-300">
          <div className="hidden lg:block bg-[url('/static/images/Birthday_Reminder.png')] w-[30vw] h-[30vw] bg-cover rounded-md"></div>
          <div className="flex flex-col w-full lg:w-[50vw] h-[auto] xl:h-[30vw] lg:from-[#bebebe] lg:to-[#bebebe] bg-gradient-to-b from-slate-100 to-slate-300 text-black rounded-md">
            <div className="flex flex-col items-center">
              <p className="text-2xl xs:text-3xl md:text-4xl pt-8 font-semibold text-center px-2 mb-3">
                Remember Their Birthday
              </p>
              <hr className="w-[80vw] md:w-[60vw] lg:w-[70%] h-2 bg-black opacity-30 rounded-md mb-4"></hr>
            </div>
            <div className="px-8 flex flex-col items-center lg:items-start">
              <div>
                <div className="flex mb-4">
                  <span className="text-4xl text-black">- </span>
                  <p className="text-xl sm:text-2xl ml-2 mt-1">
                    Get notified leading up to and on their birthday
                  </p>
                </div>
                <div className="flex mb-4">
                  <span className="text-4xl text-black">- </span>
                  <p className="text-xl sm:text-2xl ml-2 mt-1">
                    Customize reminder messages and delivery time
                  </p>
                </div>
                <div className="flex">
                  <span className="text-4xl text-black">- </span>
                  <p className="text-xl sm:text-2xl ml-2 mt-1">
                    Just add their birthday and we&apos;ll handle the rest
                  </p>
                </div>
              </div>
            </div>
            <div className="grow flex items-center justify-center w-full">
              <button
                className="w-[80vw] lg:w-[70%] hover:w-[85vw] lg:hover:w-[80%] hover:text-4xl hover:bg-white hover:rounded-[16px] text-3xl font-bold opacity-70 bg-button2 rounded-[10px] p-4 my-8 transition-all ease-linear duration-[200ms]"
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
          <div className="flex justify-evenly flex-wrap w-full lg:padding-none">
            <div className="flex flex-col items-center text-center basis-1/2 sm:basis-1/4">
              <div className="bg-[url('/static/images/Signup_Icon.jpg')] w-[70px] h-[70px] xs:w-[107px] xs:h-[100px] lg:w-[214px] lg:h-[200px] xl:w-[268px] xl:h-[250px] bg-contain"></div>
              <p className="md:text-xl lg:text-2xl font-bold ml-[18px] mt-2">
                Register
              </p>
            </div>
            <div className="flex flex-col items-center text-center basis-1/2 sm:basis-1/4">
              <div className="bg-[url('/static/images/Input_Birthdays_Icon.png')] w-[70px] h-[70px] xs:w-[100px] xs:h-[100px] lg:w-[200px] lg:h-[200px] xl:w-[250px] xl:h-[250px] bg-contain"></div>
              <p className="md:text-xl lg:text-2xl font-bold mt-2">
                Add Birthdays
              </p>
            </div>
            <div className="flex flex-col items-center text-center basis-1/2 sm:basis-1/4 mt-8 sm:mt-0">
              <div className="bg-[url('/static/images/Notification_Time_Icon.png')] w-[70px] h-[70px] xs:w-[100px] xs:h-[100px] lg:w-[200px] lg:h-[200px] xl:w-[250px] xl:h-[250px] bg-contain"></div>
              <p className="md:text-xl lg:text-2xl font-bold mt-2">
                Set Remember Time
              </p>
            </div>
            <div className="flex flex-col items-center text-center basis-1/2 sm:basis-1/4 mt-8 sm:mt-0">
              <div className="bg-[url('/static/images/Get_Notified_Icon.png')] w-[70px] h-[70px] xs:w-[100px] xs:h-[100px] lg:w-[200px] lg:h-[200px] xl:w-[250px] xl:h-[250px] bg-contain"></div>
              <p className="md:text-xl lg:text-2xl font-bold mt-2">
                Get Notified
              </p>
            </div>
          </div>
        </div>
        <div className="grow"></div>
        <footer className="h-[5vw] bg-slate-200"></footer>
      </main>
    </div>
  );
}
