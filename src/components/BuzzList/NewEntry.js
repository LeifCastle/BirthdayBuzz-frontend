import axios from "axios";
import { useState, useRef, useEffect } from "react";
import List from "./List";
import setAuthToken from "../../utils/setAuthToken";

export default function NewEntry({
  setContent,
  handleNewEntry,
  entryData,
  entryAdded,
}) {
  //---------------------------------------Variables---------------------------------------\\

  //----------User input saved values
  const [name, setName] = useState();
  const [birthday, setBirthday] = useState();
  const [relation, setRelation] = useState();
  const [message, setMessage] = useState();
  const time = useRef([]);
  const [delivery, setDelivery] = useState("email");
  const [publiclySeen, setPubliclySeen] = useState("true");

  //----------Current question values from questionBase
  const [question, setQuestion] = useState({
    id: 0,
    inputType: "text",
    title: "What's their name?",
    placeholder: "John",
    value: name,
    type: "name",
    setValue: setName,
    change: changeText,
  });

  //----------Update the value of the current question's input instantly, question's state value requires a rerender to show up
  const value = useRef();

  //----------Which question the user is on
  const progress = useRef(0);

  //Error message to display
  const [error, setError] = useState();

  //----------Gives questionaire inputs predefined values and temporarily stores user input history
  let questionBase = [
    {
      id: 0,
      inputType: "text",
      title: "What's their name?",
      placeholder: "John",
      value: name,
      type: "name",
      setValue: setName,
      change: changeText,
    },
    {
      id: 1,
      inputType: "date",
      title: "What's their birthday?",
      placeholder: "01/01/2001",
      value: birthday,
      type: "birthday",
      setValue: setBirthday,
      change: changeText,
    },
    {
      id: 2,
      inputType: "text",
      title: "What is this person's relation to you?",
      placeholder: "Friend",
      value: relation,
      type: "relation",
      setValue: setRelation,
      change: changeText,
    },
    {
      id: 3,
      inputType: "text",
      title: "What would you like the reminder text to be?",
      placeholder: "It's John's birday today!",
      value: message,
      type: "message",
      setValue: setMessage,
      change: changeText,
    },
    {
      id: 4,
      inputType: "checkbox",
      title: "When do you want to be reminded?",
      placeholder: "Day Of",
      name: "Group1",
      staticValue1: "Day Of",
      staticValue2: "Day Before",
      value: time.current,
      type: "time",
      setValue: changeTime,
      change: changeTime,
    },
    {
      id: 5,
      inputType: "radio",
      title: "Would you like an email or text reminder?",
      placeholder: "text",
      value: delivery,
      type: "delivery",
      name: "Group2",
      staticValue1: "email",
      staticValue2: "text",
      change: changeReminder,
      setValue: setDelivery,
    },
    {
      id: 6,
      inputType: "radio",
      title:
        "Do you want other users to be able to see this person on your Buzz List?",
      placeholder: "True",
      value: publiclySeen,
      type: "publicalySeen",
      name: "Group3",
      staticValue1: "True",
      staticValue2: "False",
      change: changePublic,
      setValue: setPubliclySeen,
    },
    //Empty to prevent input from trying to grab non-existent 7'th question
    {
      id: 7,
      title: name,
      placeholder: "",
      value: "",
      setValue: "",
    },
  ];

  const BASE_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";

  //-----------------------------Questionaire Button Interactivity-----------------------------\\

  //----------Next question
  function handleNextQuestion() {
    let index = progress.current + 1; //The index of the current question in questionBase
    if (document.querySelector(".question").value || time.current.length > 0) {
      document.querySelector(".question").value = "";
      setQuestion(questionBase[index]);
      value.current = questionBase[index].value; //Set value ref to last stored value if any
      progress.current += 1;
    } else {
      setError(`A ${questionBase[index - 1].type} is required`);
      setTimeout(() => {
        setError();
      }, 2000);
    }
  }

  //----------Previous question
  function handlePreviousQuestion() {
    document.querySelector(".question").value = "";
    let index = progress.current - 1;
    setQuestion(questionBase[index]);
    value.current = questionBase[index].value; //Set value ref to last stored value if any
    progress.current -= 1;
  }

  //----------Cancel entry and return to Buzz List
  function cancelEntry() {
    setContent(<List handleNewEntry={handleNewEntry} entryData={entryData} />);
  }

  //-------------------------------------Saving User Input-------------------------------------\\

  //----------Saves user inputs for type "text/date" in question base
  function changeText(e) {
    let index = e.target.id;
    let currentQuestion = questionBase[index];
    currentQuestion.setValue(e.target.value);
  }

  //----------Saves user inputs from "time" input in question base
  function changeTime(e) {
    if (e.target.checked) {
      //If the user checks a box
      time.current = [...time.current, e.target.getAttribute("staticvalue")];
    } else {
      //If the user unchecks a box
      let real = time.current.filter((x) => {
        return x !== e.target.getAttribute("staticvalue");
      });
      time.current = [...real];
    }
  }

  //----------Saves user inputs from "reminderTimeFrame" input in question base
  function changeReminder(e) {
    setDelivery(e.target.getAttribute("staticvalue"));
  }

  //----------Saves user inputs from "publiclySeen" input in question base
  function changePublic(e) {
    setPubliclySeen(e.target.getAttribute("staticvalue"));
  }

  //---------------------------------Adding new entry to database---------------------------------\\
  function createEntry() {
    let birthdayArr = birthday.split("").reverse();
    let formattedBirthday = birthdayArr.join("").replaceAll("-", "/");
    const newEntry = {
      user: {
        email: localStorage.getItem("email"),
      },
      newPerson: {
        name: name,
        birthday: formattedBirthday,
        relation: relation,
        message: message,
        time: time.current,
        delivery: delivery,
        publiclySeen: publiclySeen,
      },
    };
    console.log("New Entry: ", newEntry);
    setAuthToken(localStorage.getItem("jwtToken")); //Is this auth stuff neccessary buzzlist component would kick user back to login itself right?
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
    entryAdded.current = true; //Trigger dependency in useEffect that grabs user's Buzzlist to get new data when a user adds an entry
  }

  //---------------------------------------HTML Visibility----------------------------------------\\
  useEffect(() => {
    //----------If the user is on the first question hide the back button
    if (progress.current === 0) {
      document.querySelector("#backButton").setAttribute("hidden", "hidden");
    } else {
      document.querySelector("#backButton").removeAttribute("hidden");
    }

    //----------If the user is on question four or later show the second input
    if (progress.current > 3 && progress.current < 7) {
      document.querySelector("#input2").removeAttribute("hidden");
    } else {
      document.querySelector("#input2").setAttribute("hidden", "hidden");
    }

    //----------If the user goes past the last question...
    if (progress.current >= 7) {
      document.querySelector("#create").removeAttribute("hidden");
      document.querySelector("#previewPerson").removeAttribute("hidden");
      document.querySelector("#nextButton").setAttribute("hidden", "hidden");
      document.querySelector(".question").setAttribute("hidden", "hidden");
    } else {
      document.querySelector("#nextButton").removeAttribute("hidden");
      document.querySelector(".question").removeAttribute("hidden");
      document.querySelector("#create").setAttribute("hidden", "hidden");
      document.querySelector("#previewPerson").setAttribute("hidden", "hidden");
    }
  }, [progress.current]);

  return (
    <div id="flexError" className="flex-col h-[300px] items-center">
      <button
        className="bg-button1 rounded-md w-full h-8 mb-4"
        onClick={cancelEntry}
      >
        Cancel Entry
      </button>
      <p>{question.title}</p>
      <div className="flex mt-4 w-full">
        <div className="flexError basis-2/5 justify-end">
          <button
            id="backButton"
            className="bg-button1 rounded-md mr-2 pl-4 pr-4 h-[40px]"
            onClick={handlePreviousQuestion}
          >
            Back
          </button>
        </div>
        <div className="w-[200px]" id="previewPerson" hidden="hidden">
          <ul>
            <li>
              <span>Birthday: </span>
              {birthday}
            </li>
            <li>
              <span>Relation: </span>
              {relation}
            </li>
            <li className="whitespace-nowrap">
              <span>Message: </span>
              {message}
            </li>
            <li className="whitespace-nowrap">
              <span>Time: </span>
              {time.current}
            </li>
            <li className="whitespace-nowrap">
              <span>Delivery: </span>
              {delivery}
            </li>
            <li className="whitespace-nowrap">
              <span>Publicly Seen: </span>
              {publiclySeen}
            </li>
          </ul>
        </div>
        <div className="flexError basis-1/5 justify-center" id="questionaire">
          <input
            id={question.id}
            className="question placeholder:text-slate-400 text-black rounded-md bg-slate-300 pl-2"
            placeholder={question.placeholder}
            type={question.inputType}
            name={question.name}
            staticvalue={question.staticValue1}
            value={value.current}
            onChange={question.change}
            max="9999-12-31"
          />
          <label for="my-radio-1">{question.staticValue1}</label>
          <input
            id="input2"
            hidden="hidden"
            type={question.inputType}
            name={question.name}
            staticvalue={question.staticValue2}
            onChange={question.change}
          />
          <label for="my-radio-1">{question.staticValue2}</label>
        </div>
        <div className="flexError basis-2/5 justify-start">
          <button
            id="nextButton"
            className="bg-button1 rounded-md ml-2 pl-4 pr-4 h-[40px]"
            onClick={handleNextQuestion}
          >
            Next
          </button>
        </div>
      </div>
      <div className="grow">
        <p className="mt-8 text-red-800">{error}</p>
      </div>
      <button
        id="create"
        className="w-full h-8 bg-button1 rounded-md ml-2 pl-1 pr-1"
        hidden="hidden"
        onClick={createEntry}
      >
        Create
      </button>
    </div>
  );
}
