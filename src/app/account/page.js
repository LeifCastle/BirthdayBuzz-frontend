'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Validate this import with your updated Next.js version.
import PageHeader from "@/components/page_header";
import setAuthToken from "@/utils/setAuthToken";

function Countdown({ birthday }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(birthday));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(birthday));
    }, 1000);

    return () => clearInterval(timer); // Clear the interval when the component is unmounted.
  }, [birthday]);

  return (
    <div>
      <p>Time left until next birthday: {timeLeft.days} days, {timeLeft.hours} hours, {timeLeft.minutes} minutes, and {timeLeft.seconds} seconds</p>
    </div>
  );
}

function calculateTimeLeft(birthday) {
  const now = new Date();
  const birthDateThisYear = new Date(now.getFullYear(), new Date(birthday).getMonth(), new Date(birthday).getDate());
  let nextBirthday = birthDateThisYear;

  if (now > birthDateThisYear) {
    nextBirthday.setFullYear(now.getFullYear() + 1);  // If birthday has already occurred this year, set to next year.
  }

  const difference = nextBirthday - now;

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return { days, hours, minutes, seconds };
}

function EntryCard({ entryData }) {
  let content;

  if (entryData && entryData.length) {
    content = entryData.map(entry => (
      <div key={entry.name}>
        <h3>{entry.name} {entry.birthday}</h3>
      </div>
    ));
  } else {
    content = <p>No users in your buzzlist!</p>;
  }

  return (
    <div className="entry-card">
      {content}
      {/* You can also add other UI elements related to this card here */}
    </div>
  );
}

export default function Account() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const BASE_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";

  useEffect(() => {
    setAuthToken(localStorage.getItem("jwtToken"))
    if (localStorage.getItem("jwtToken")) {
      axios
        .get(`${BASE_URL}/account`)
        .then((response) => {
          setUserData(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error.response ? error.response.data : error);
          setIsLoading(false);
        });
    } else {
      router.push("/auth/login");
    }
  }, []);

  if (isLoading) return <p>Loading user data...</p>;
  if (!userData) return <p>No user data available.</p>;

  return (
    <>
      <PageHeader />
      <div className="container mx-auto p-4">
        
        {/* This is the main grid container */}
        <div className="grid grid-cols-2 gap-4">

          {/* User Details Section - Top Left */}
          <div className="col-span-1">
            <h1 className="text-2xl font-bold mb-4">User Details</h1>
            <p><strong>First Name:</strong> {userData.firstName}</p>
            <p><strong>Last Name:</strong> {userData.lastName}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Birthday:</strong> {userData.birthday}</p>
            <p><strong>Phone:</strong> {userData.phone}</p>
          </div>

          {/* BuzzList - Top Right */}
          
          <div className="col-span-1">
          <h1 className="font-bold mb-4">BuzzList</h1>
            <EntryCard entryData={userData.buzzList} />
          </div>
        </div>

        {/* Countdown - Bottom Center */}
        <h1 className="mt-10 text-center font-bold mb-4">Time Until my Bday:</h1>
        <div className="flex justify-center">
          <Countdown birthday={userData.birthday} />
        </div>

      </div>
    </>
  );
}
