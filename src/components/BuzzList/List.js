import { useState, useRef } from "react";

import ColumnHeaders from "./ColumnHeaders";
import Entry from "./Entry";

export default function List({ handleNewEntry, entryData }) {
  console.log("Entry data: ", entryData);

  const entries = entryData.map((entry) => {
    return <Entry key={entry._id + "Z"} data={entry} />; //Update to an id of some sort for filterability
  });

  return (
    <>
      <ColumnHeaders />
      <ol>{entries}</ol>
      <button
        className="w-full text-center mt-2 bg-slate-600 rounded-bl-md rounded-br-md"
        onClick={handleNewEntry}
      >
        <span className="text-2xl mr-2">+</span>Birthday
      </button>
    </>
  );
}
