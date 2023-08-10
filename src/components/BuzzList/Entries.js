"use client";
import { useState } from "react";

export default function Entries({ data }) {
  console.log("Data: ", data);
  let entries = [];
  if (data.length) {
    data.forEach((entry) => {
      entries.push(<p>{entry.name}</p>);
    });
  } else {
    entries.push(<p>No users in your buzzlist!</p>);
  }
  return <li>{entries}</li>;
}
