"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import TrashCanBlue from "public/static/images/Trashcan_Blue.png";
import TrashCanRed from "public/static/images/Trashcan_Red.png";
import axios from "axios";

export default function Entry({ data }) {
  const [trashCan, setTrashCan] = useState(TrashCanBlue);
  const [popup, setPopup] = useState();
  const BASE_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";

  function handleDeleteEntry(id) {
    setPopup();
    axios
      .delete(`${BASE_URL}/buzzlist/${localStorage.getItem("email")}/${id}`)
      .then((response) => {
        console.log("Response: ", response);
      });
  }

  function validateAction(question, entryId) {
    setPopup(
      <div>
        <p>{question}</p>
        <button onClick={() => handleDeleteEntry(entryId)}>Yes</button>
        <button onClick={() => setPopup()}>No</button>
      </div>
    );
  }

  //console.log("Entry: ", data);

  return (
    <>
      {popup}
      <li
        key={data._id}
        className="group flex pl-2 bg-slate-100 bg-opacity-[.15] hover:bg-opacity-[.20] relative"
      >
        <p className="basis-1/5 inline-block mr-2">{data.name}</p>
        <p className="basis-1/5 inline-block mr-2">{data.birthday}</p>
        <p className="basis-1/5 inline-block mr-2">{data.relation}</p>
        <p className="basis-1/5 inline-block mr-2">
          {data.reminderTimeFrame[1]
            ? data.reminderTimeFrame[1] + " " + data.reminderTimeFrame[1]
            : data.reminderTimeFrame[0]}
        </p>
        <p className="basis-1/5 inline-block mr-2">{data.message}</p>
        <Image //Increase the entire li element's size on mouseover rather than just the trashcan?
          id="trashcan"
          className="group-hover:w-[30px] group-hover:h-[30px] group-hover:top-[-3px] group-hover:right-3 absolute right-4"
          src={trashCan}
          width={20}
          height={20}
          alt="Delete"
          onClick={() =>
            validateAction(
              `Are you sure you want to remove ${data.name} from your Buzz List?`,
              data._id
            )
          }
          onMouseOver={() => setTrashCan(TrashCanRed)}
          onMouseOut={() => setTrashCan(TrashCanBlue)}
        />
      </li>
    </>
  );
}
