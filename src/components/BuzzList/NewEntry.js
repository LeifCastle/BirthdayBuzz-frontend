import axios from "axios";
import { useState, useRef, useEffect } from "react";
import List from "./List";
import setAuthToken from "../../utils/setAuthToken";

export default function NewEntry({ setContent, handleNewEntry, entryData }) {
  const BASE_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";

  //----Question input's saved values
  const [name, setName] = useState();
  const [birthday, setBirthday] = useState();
  const [relation, setRelation] = useState();
  const [message, setMessage] = useState();
  const [time, setTime] = useState();
  const [delivery, setDelivery] = useState();
  const [publiclySeen, setPubliclySeen] = useState();

  const value = useRef(); //Used to update the value of the current question's input instantly, question's state value requires a rerender to show up
  const [question, setQuestion] = useState({
    id: 0,
    title: "Name",
    placeholder: "John",
    value: name,
    setValue: setName,
  });
  const progress = useRef(0); //Which question the user is on

  //Determines new entry questions
  let questionBase = [
    {
      id: 0,
      title: "What's their name?",
      placeholder: "John",
      value: name,
      setValue: setName,
    },
    {
      id: 1,
      title: "What's their birthday?",
      placeholder: "01/01/2001",
      value: birthday,
      setValue: setBirthday,
    },
    {
      id: 2,
      title: "What is this person's relation to you?",
      placeholder: "Friend",
      value: relation,
      setValue: setRelation,
    },
    {
      id: 3,
      title: "What would you like the reminder text to be?",
      placeholder: "It's John's birday today!",
      value: message,
      setValue: setMessage,
    },
    {
      id: 4,
      title: "When do you want to be reminded?",
      placeholder: "Day Of",
      value: time,
      setValue: setTime,
    },
    {
      id: 5,
      title: "Would you like an email or text reminder?",
      placeholder: "text",
      value: delivery,
      setValue: setDelivery,
    },
    {
      id: 6,
      title:
        "Do you want other users to be able to see this person on your Buzz List?",
      placeholder: "True",
      value: publiclySeen,
      setValue: setPubliclySeen,
    },
    //Empty to prevent input from trying to grab non-existent 7'th question
    {
      id: 7,
      title: "",
      placeholder: "",
      value: "",
      setValue: "",
    },
  ];

  //----Questionaire Interactivity----\\
  function handleNextQuestion() {
    document.querySelector(".question").value = "";
    let index = progress.current + 1;
    setQuestion(questionBase[index]);
    value.current = questionBase[index].value; //Set value ref to last stored value if any
    progress.current += 1;
  }

  function handlePreviousQuestion() {
    document.querySelector(".question").value = "";
    let index = progress.current - 1;
    setQuestion(questionBase[index]);
    value.current = questionBase[index].value; //Set value ref to last stored value if any
    progress.current -= 1;
  }

  function handleNewValue(e) {
    let index = e.target.id;
    let currentQuestion = questionBase[index];
    currentQuestion.setValue(e.target.value); //Sets the value in input's state record
    value.current = e.target.value; //Actually sets the value on the input equal to what the user types
  }

  //----Create new entry in database----\\
  function createEntry() {
    const newEntry = {
      user: {
        email: localStorage.getItem("email"),
      },
      newPerson: {
        name: name,
        birthday: birthday,
        relation: relation,
        message: message,
        time: time,
        delivery: delivery,
        publiclySeen: publiclySeen,
      },
    };
    console.log("New Entry: ", newEntry);
    setAuthToken(localStorage.getItem("jwtToken")); //Is this auth stuff neccessary and if so is it all we need to do?
    if (localStorage.getItem("jwtToken")) {
      axios
        .post(`${BASE_URL}/buzzlist/new`, newEntry)
        .then((response) => {
          console.log(`Response: ${response.data}`);
          //Add some message to indicate to user their creation was sucessfull
        })
        .catch((error) => {
          console.log(`Error fetchign data: ${error}`);
          //Add some message to indicate to user their creation was NOT sucessfull
        });
    } else {
      router.push("/auth/login");
    }
    setContent(<List handleNewEntry={handleNewEntry} entryData={entryData} />);
  }

  //Handles questionaire HTML rendering as progress timeline changes
  useEffect(() => {
    //If the user is on the first question hide the back button
    if (progress.current === 0) {
      document.querySelector("#backButton").setAttribute("hidden", "hidden");
    } else {
      document.querySelector("#backButton").removeAttribute("hidden");
    }
    //If the user goes past the last question...
    if (progress.current === 7) {
      document.querySelector("#nextButton").setAttribute("hidden", "hidden");
      document.querySelector("#create").removeAttribute("hidden");
      document.querySelector("#questionaire").setAttribute("hidden", "hidden");
    } else {
      document.querySelector("#nextButton").removeAttribute("hidden");
      document.querySelector("#questionaire").removeAttribute("hidden");
      document.querySelector("#create").setAttribute("hidden", "hidden");
    }
  }, [progress.current]);

  //Possible need to reset some values?
  function cancelEntry() {
    setContent(<List handleNewEntry={handleNewEntry} entryData={entryData} />);
  }

  return (
    <div className="flex">
      <button
        id="backButton"
        className="bg-button1 rounded-md mr-2 pl-1 pr-1"
        onClick={handlePreviousQuestion}
      >
        Back
      </button>
      <div id="questionaire">
        <p>{question.title}</p>
        <input
          id={question.id}
          type="text"
          className="question placeholder:text-slate-400 text-black"
          placeholder={question.placeholder}
          value={value.current}
          onChange={handleNewValue}
        />
      </div>
      <button
        id="nextButton"
        className="bg-button1 rounded-md ml-2 pl-1 pr-1"
        onClick={handleNextQuestion}
      >
        Next
      </button>
      <button
        id="create"
        className="bg-button1 rounded-md ml-2 pl-1 pr-1"
        hidden="hidden"
        onClick={createEntry}
      >
        Create
      </button>
      <button
        className="bg-button1 rounded-md ml-4 pl-1 pr-1"
        onClick={cancelEntry}
      >
        Cancel Entry
      </button>
    </div>
  );
}
