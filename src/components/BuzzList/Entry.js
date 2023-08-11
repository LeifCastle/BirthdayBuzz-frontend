"use client";
import { useState } from "react";

export default function Entry({ data }) {
  console.log("Data: ", data);
  let values = [];
  for (let value in data) {
    if (value != "_id" && value != "createdAt" && value != "updatedAt") {
      values.push(<p className="basis-1/5 inline-block mr-2">{data[value]}</p>);
    }
  }
  return <li className="flex ml-2">{values}</li>;
}
