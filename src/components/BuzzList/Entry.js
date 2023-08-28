"use client";
import { useState } from "react";

export default function Entry({ data }) {
  //console.log("Entry: ", data);
  let values = [];
  for (let value in data) {
    if (value != "_id" && value != "createdAt" && value != "updatedAt") {
      if (value === "reminderTimeFrame") {
        values.push(
          <p
            key={data._id + value}
            id={data._id + value}
            className="basis-1/5 inline-block mr-2"
          >
            {data[value][0] + ", " + data[value][1]}
          </p>
        );
      } else {
        values.push(
          <p
            key={data._id + value}
            id={data._id + value}
            className="basis-1/5 inline-block mr-2"
          >
            {data[value]}
          </p>
        );
      }
    }
  }
  return (
    <>
      <li
        key={data._id}
        className="flex pl-2 bg-slate-100 bg-opacity-[.15] hover:bg-opacity-[.20] "
      >
        {values}
      </li>
    </>
  );
}
