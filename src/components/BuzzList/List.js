import { useState, useRef } from "react";

import ColumnHeaders from "./ColumnHeaders";
import Entry from "./Entry";

export default function List({ handleNewEntry, entryData }) {
  console.log("Entry data: ", entryData);

  const noEntryHTML = (
    <li className="flex flexError justify-center items-center h-full pl-2 bg-slate-100 bg-opacity-[.15]">
      <div>Your Buzz List is empty...add a birthday to get notifications</div>
    </li>
  );

  const entries = entryData.map((entry) => {
    return <Entry key={entry._id + "Z"} data={entry} />; //Update to an id of some sort for filterability
  });

  return (
    <div className="flexError flex-col h-[clamp(10vh,20vh,80vh)]">
      <ColumnHeaders />
      <ol className="grow flex-col flexError border-l-[4px] border-r-[4px] border-cH1 border-opacity-[1]">
        {entries[0] ? entries : noEntryHTML}
        <div className="bg-slate-100 bg-opacity-[.15] grow"></div>
      </ol>
      <div className="rounded-bl-md rounded-br-md bg-cH1">
        <button
          className="w-full bg-cH1 rounded-md h-7 flex flexError items-center justify-center hover:bg-cH1Hover hover:mt-[-.25rem] hover:h-8 transition-height duration-300 ease-in-out"
          onClick={handleNewEntry}
        >
          <div className="mb-1">
            <span className="text-2xl mr-2">+</span>Birthday
          </div>
        </button>
      </div>
    </div>
  );
}
