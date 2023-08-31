import { useState, useEffect } from "react";

export default function Countdown({ birthday }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(birthday));

  function calculateTimeLeft(birthday) {
    const now = new Date();
    const birthDateThisYear = new Date(
      now.getFullYear(),
      new Date(birthday).getMonth(),
      new Date(birthday).getDate()
    );
    let nextBirthday = birthDateThisYear;

    if (now > birthDateThisYear) {
      nextBirthday.setFullYear(now.getFullYear() + 1); // If birthday has already occurred this year, set to next year.
    }

    const difference = nextBirthday - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(birthday));
    }, 1000);

    return () => clearInterval(timer); // Clear the interval when the component is unmounted.
  }, [birthday]);

  return (
    <div>
      <p className="text-2xl font-bold text-center bg-cH1 bg-opacity-[1] rounded-tl-md rounded-tr-md">
        My Birthday Countdown
      </p>
      <hr></hr>
      <p>
        {timeLeft.days} days, {timeLeft.hours} hours, {timeLeft.minutes}{" "}
        minutes, and {timeLeft.seconds} seconds
      </p>
    </div>
  );
}
