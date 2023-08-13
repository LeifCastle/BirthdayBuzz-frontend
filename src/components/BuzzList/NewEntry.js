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

  //----------Current question values from questionBase.current
  const [question, setQuestion] = useState({
    id: 0,
    inputType: "text",
    title: "What's their name?",
    placeholder: "John",
    value: name,
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
  const questionBase = useRef([
    {
      id: 0,
      inputType: "text",
      title: "What's their name?",
      placeholder: "John",
      value: name,
      setValue: setName,
      change: changeText,
    },
    {
      id: 1,
      inputType: "date",
      title: "What's their birthday?",
      placeholder: "01/01/2001",
      value: birthday,
      setValue: setBirthday,
      change: changeText,
    },
    {
      id: 2,
      inputType: "text",
      title: "What is this person's relation to you?",
      placeholder: "Friend",
      value: relation,
      setValue: setRelation,
      change: changeText,
    },
    {
      id: 3,
      inputType: "text",
      title: "What would you like the reminder text to be?",
      placeholder: "It's John's birday today!",
      value: message,
      setValue: setMessage,
      change: changeText,
    },
    {
      id: 4,
      title: "When would you like to be reminded?",
      one: true,
      two: false,
    },
    {
      id: 5,
      title: "s",
      value: "Empty",
    },
  ]);

  const BASE_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";

  //-----------------------------Questionaire Button Interactivity-----------------------------\\

  //----------Next question
  function handleNextQuestion() {
    let index = progress.current + 1; //The index of the current question in questionBase.current
    if (document.querySelector(".question").value || time.current.length > 0) {
      progress.current += 1;
      document.querySelector(".question").value = "";
      value.current = questionBase.current[index].value; //Set value ref to last stored value if any
      setQuestion(questionBase.current[index]);
    } else {
      setError(`A ${questionBase.current[index - 1].type} is required`);
      setTimeout(() => {
        setError();
      }, 2000);
    }
  }

  //----------Previous question
  function handlePreviousQuestion() {
    document.querySelector(".question").value = "";
    let index = progress.current - 1;
    setQuestion(questionBase.current[index]);
    value.current = questionBase.current[index].value; //Set value ref to last stored value if any
    console.log(questionBase.current[index]);
    progress.current -= 1;
    console.log("VC: ", questionBase.current[index]);
  }

  //----------Cancel entry and return to Buzz List
  function cancelEntry() {
    setContent(<List handleNewEntry={handleNewEntry} entryData={entryData} />);
  }

  //-------------------------------------Saving User Input-------------------------------------\\

  //----------Saves user inputs for type "text/date" in question base
  function changeText(e) {
    let index = parseInt(e.target.id);
    questionBase.current[index].setValue(e.target.value); //Sets the value in input's setState
    questionBase.current[index].value = e.target.value; //Sets the value in input's state record
    value.current = e.target.value; //Actually sets the value on the input equal to what the user types
  }

  //----------Saves user inputs from "time" input in question base
  function changeTime(e) {
    if (e.target.checked) {
      time.current = [...time.current, e.target.getAttribute("staticvalue")];
    } else {
      let real = time.current.filter((x) => {
        return x !== e.target.getAttribute("staticvalue");
      });
      time.current = [...real];
    }
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
    console.log("Progress: ", progress.current);
    //----------If the user is on the first question hide the back button
    if (progress.current === 0) {
      document.querySelector("#backButton").setAttribute("hidden", "hidden");
    } else {
      document.querySelector("#backButton").removeAttribute("hidden");
    }

    //----------If the user is on question four show the time inputs
    if (progress.current === 4) {
      document.querySelector("#questionShell").setAttribute("hidden", "hidden");
      document.querySelector("#time").removeAttribute("hidden");
    } else {
      document.querySelector("#questionShell").removeAttribute("hidden");
      document.querySelector("#time").setAttribute("hidden", "hidden");
    }

    //----------If the user goes past the last question...
    if (progress.current > 4) {
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
    <div id="flexError" className="flex-col h-[260px] items-center">
      <button
        className="bg-button1 rounded-md w-full h-8 mb-4"
        onClick={cancelEntry}
      >
        Cancel Entry
      </button>
      <p className="h-10 text-center text-lg">
        {question.title ? question.title : name}
      </p>
      <div className="flex w-full">
        <div className="flexError basis-2/5 justify-end">
          <button
            id="backButton"
            className="bg-button1 rounded-md mr-2 pl-4 pr-4 h-[40px]"
            onClick={handlePreviousQuestion}
          >
            Back
          </button>
        </div>
        <div
          className="flexError basis-1/5 justify-center items-center"
          id="questionaire"
        >
          <div
            className="w-[200px] mt-[-12px]"
            id="previewPerson"
            hidden="hidden"
          >
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
            </ul>
          </div>
          <div id="questionShell">
            <input
              id={question.id}
              className="question placeholder:text-slate-400 text-black rounded-md bg-slate-300 pl-2 h-[40px]"
              placeholder={question.placeholder}
              type={question.inputType}
              name={question.name}
              staticvalue={question.staticValue1}
              value={value.current}
              onChange={question.change}
              max="9999-12-31"
            />
          </div>
          <div id="time" hidden="hidden">
            <div className="flex gap-1">
              <input
                id="one"
                type="checkbox"
                staticvalue="Day Of"
                onClick={changeTime}
              />
              <p className="mr-4">Day Of</p>
              <input
                id="two"
                type="checkbox"
                onChange={changeTime}
                staticvalue="Day Before"
              />
              <p>Day Before</p>
            </div>
          </div>
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
        className="w-full h-14 bg-button1 rounded-md ml-2 pl-1 pr-1"
        hidden="hidden"
        onClick={createEntry}
      >
        Create
      </button>
    </div>
  );
}
