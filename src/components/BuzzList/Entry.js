"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import TrashCanBlue from "public/static/images/Trashcan_Blue.png";
import TrashCanRed from "public/static/images/Trashcan_Red.png";
import axios from "axios";

export default function Entry({ data, handleDeleteEntry }) {
  const [trashCan, setTrashCan] = useState(TrashCanBlue);
  const [popup, setPopup] = useState();
  const BASE_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";

  function handleDeleteCSS(entryId) {
    setPopup();
    let entries = document.querySelectorAll(".buzzEntry");
    let filler = document.querySelector(".filler");
    filler.classList.remove("h-0");
    filler.classList.add("h-[2.5px]");
    for (const entry of entries) {
      entry.setAttribute("show", true);
      entry.classList.remove("text-slate-400");
      entry.classList.add("text-slate-300");
      if (entry.id === `z${entryId}`) {
        //Show the buzz list entry the user is considering deleting
        entry.removeAttribute("hide");
      }
    }
  }

  function deleteEntry(id) {
    handleDeleteCSS(id);
    handleDeleteEntry(id);
  }

  function validateAction(name, entryId) {
    let entries = document.querySelectorAll(".buzzEntry");
    let filler = document.querySelector(".filler");
    filler.classList.remove("h-[2.5px]");
    filler.classList.add("h-0");
    for (const entry of entries) {
      entry.removeAttribute("show");
      entry.classList.remove("text-slate-300");
      entry.classList.add("text-slate-400");
      if (entry.id === `z${entryId}`) {
        //Hide the buzz list entry the user is considering deleting
        entry.setAttribute("hide", "true");
      }
    }
    setPopup(
      <div className="flex flexError justify-center items-center h-[30px] bg-opacity-[.30] bg-slate-100">
        <p>
          Are you sure you want to remove{" "}
          <span className="text-blue-400">{name}</span> from your Buzz List?
        </p>
        <button
          className="ml-6 font-bold text-red-500"
          onClick={() => deleteEntry(entryId)}
        >
          Yes
        </button>
        <button
          className="ml-6 font-bold text-green-500"
          onClick={() => handleDeleteCSS(entryId)}
        >
          No
        </button>
      </div>
    );
  }

  return (
    <>
      {popup}
      <li
        show="true"
        key={data._id}
        id={`z${data._id}`}
        className="buzzEntry w-full group h-[25px] flex flexError items:center pl-2 bg-slate-100 bg-opacity-[.15] hover:h-[30px] hover:bg-opacity-[.20] hover:text-slate-200 text-slate-300 hover:text-lg"
      >
        <p className="basis-1/6 inline-block mr-2">{data.name}</p>
        <p className="basis-1/6 inline-block mr-2">{data.birthday}</p>
        <p className="basis-1/6 inline-block mr-2">{data.relation}</p>
        <p className="basis-1/6 inline-block mr-2">
          {data.reminderTimeFrame[1]
            ? data.reminderTimeFrame[1] + " " + data.reminderTimeFrame[1]
            : data.reminderTimeFrame[0]}
        </p>
        <p className="basis-1/6 inline-block mr-2">{data.message}</p>
        <div className="flex flexError justify-center items-center basis-1/6 mr-2">
          <Image //Increase the entire li element's size on mouseover rather than just the trashcan?
            id="trashcan"
            className="w-[20px] h-[20px] group-hover:w-[25px] group-hover:h-[25px]"
            src={trashCan}
            width={20}
            height={20}
            alt="Delete"
            onClick={() => validateAction(data.name, data._id)}
            onMouseOver={() => setTrashCan(TrashCanRed)}
            onMouseOut={() => setTrashCan(TrashCanBlue)}
          />
        </div>
      </li>
    </>
  );
}
