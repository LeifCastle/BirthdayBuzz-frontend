import axios from "axios";
import { useState, useRef, useEffect } from "react";
import List from "./List";
import setAuthToken from "../../utils/setAuthToken";

//Huge simplify...change inputs to only two and have the second one have CSS to determine its visibility based on the index, then change the type to be a variable in quetsionBase
export default function NewEntry({
  setContent,
  handleNewEntry,
  entryData,
  entryAdded,
}) {
  const BASE_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";

  //----Question input's saved values
  const [name, setName] = useState();
  const [birthday, setBirthday] = useState();
  const [relation, setRelation] = useState();
  const [message, setMessage] = useState();
  const [time, setTime] = useState([]);
  const [delivery, setDelivery] = useState();
  const [publiclySeen, setPubliclySeen] = useState();

  const value = useRef(); //Used to update the value of the current question's input instantly, question's state value requires a rerender to show up
  const [question, setQuestion] = useState({
    id: 0,
    title: "What's their name?",
    placeholder: "John",
    value: name,
    type: "name",
    setValue: setName,
  });
  const progress = useRef(0); //Which question the user is on
  const [error, setError] = useState(); //Questionaire error display
  const keyDown = useRef(); //What key the user last pressed

  //Determines new entry questions
  let questionBase = [
    {
      id: 0,
      title: "What's their name?",
      placeholder: "John",
      value: name,
      type: "name",
      setValue: setName,
    },
    {
      id: 1,
      title: "What's their birthday?",
      placeholder: "01/01/2001",
      value: birthday,
      type: "birthday",
      setValue: setBirthday,
    },
    {
      id: 2,
      title: "What is this person's relation to you?",
      placeholder: "Friend",
      value: relation,
      type: "relation",
      setValue: setRelation,
    },
    {
      id: 3,
      title: "What would you like the reminder text to be?",
      placeholder: "It's John's birday today!",
      value: message,
      type: "message",
      setValue: setMessage,
    },
    {
      id: 4,
      title: "When do you want to be reminded?",
      placeholder: "Day Of",
      value: time,
      type: "time",
      setValue: setTime,
    },
    {
      id: 5,
      title: "Would you like an email or text reminder?",
      placeholder: "text",
      value: delivery,
      type: "delivery",
      one: "email",
      two: "text",
      change: changeReminder,
      setValue: setDelivery,
    },
    {
      id: 6,
      title:
        "Do you want other users to be able to see this person on your Buzz List?",
      placeholder: "True",
      value: publiclySeen,
      type: "publicalySeen",
      one: "True",
      two: "False",
      change: changePublic,
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
    let index = progress.current + 1; //The index of the current question in questionBase
    if (document.querySelector(".question").value || time.length > 0) {
      checkInputType(index);
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

  function checkInputType(index) {
    if (index === 4) {
      document.querySelector(".qType2").removeAttribute("hidden");
      document.querySelector(".qType1").setAttribute("hidden", "hidden");
      document.querySelector(".qType3").setAttribute("hidden", "hidden");
    } else if (index > 4) {
      document.querySelector(".qType3").removeAttribute("hidden");
      document.querySelector(".qType1").setAttribute("hidden", "hidden");
      document.querySelector(".qType2").setAttribute("hidden", "hidden");
    } else {
      document.querySelector(".qType1").removeAttribute("hidden");
      document.querySelector(".qType2").setAttribute("hidden", "hidden");
      document.querySelector(".qType3").setAttribute("hidden", "hidden");
    }
  }

  function handlePreviousQuestion() {
    document.querySelector(".question").value = "";
    let index = progress.current - 1;
    setQuestion(questionBase[index]);
    value.current = questionBase[index].value; //Set value ref to last stored value if any
    progress.current -= 1;
    checkInputType(index);
  }

  function handleNewValue(e) {
    let index = e.target.id;
    let currentQuestion = questionBase[index];
    //If the question is of the type birthday set various input controls
    if (
      index == 1 &&
      (e.target.value.length === 2 || e.target.value.length === 5)
    ) {
      if (keyDown.current != "Backspace") {
        currentQuestion.setValue(e.target.value + "/"); //Sets the value in input's state record
        value.current = e.target.value + "/"; //Actually sets the value on the input equal to what the user types
      } else {
        currentQuestion.setValue(e.target.value.slice(0, -1)); //Sets the value in input's state record
        value.current = e.target.value.slice(0, -1); //Actually sets the value on the input equal to what the user types
      }
    } else if (e.target.value.length < 9) {
      currentQuestion.setValue(e.target.value); //Sets the value in input's state record
      value.current = e.target.value; //Actually sets the value on the input equal to what the user types
    }
  }

  function handleNewSelection(e) {
    if (e.target.checked) {
      setTime([...time, e.target.value]);
    } else {
      let real = time.filter((x) => {
        return x !== e.target.value;
      });
      setTime([...real]);
    }
  }

  function changeReminder(e) {
    setDelivery(e.target.value);
  }

  function changePublic(e) {
    setPubliclySeen(e.target.value);
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
    entryAdded.current = true; //Trigger dependency in useEffect that grabs user's Buzzlist to get new data when a user adds an entry
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
            className="bg-button1 rounded-md mr-2 pl-4 pr-4"
            onClick={handlePreviousQuestion}
          >
            Back
          </button>
        </div>
        <div className="flexError basis-1/5 justify-center" id="questionaire">
          <input
            id={question.id}
            type="text"
            className="qType1 question placeholder:text-slate-400 text-black rounded-md bg-slate-300 pl-2"
            placeholder={question.placeholder}
            value={value.current}
            onChange={handleNewValue}
            onKeyDown={(e) => (keyDown.current = e.key)}
          />
          <div className="qType2" hidden="hidden">
            <input
              type="checkbox"
              name="group1"
              value="Day Of"
              onChange={handleNewSelection}
            />
            <label for="my-radio-1">Day Of</label>
            <input
              type="checkbox"
              name="group1"
              value="Day Before"
              onChange={handleNewSelection}
            />
            <label for="my-radio-2">Day Before</label>
          </div>
          <div className="qType3" hidden="hidden">
            <input
              type="radio"
              name="group2"
              value={question.one}
              onChange={question.change}
            />
            <label for="my-radio-1">{question.one}</label>
            <input
              type="radio"
              name="group2"
              value={question.two}
              onChange={question.change}
            />
            <label for="my-radio-2">{question.two}</label>
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
        className="w-full h-8 bg-button1 rounded-md ml-2 pl-1 pr-1"
        hidden="hidden"
        onClick={createEntry}
      >
        Create
      </button>
    </div>
  );
}
