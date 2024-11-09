import React, { useState, useEffect, useContext,useMemo } from "react";
import axios from "axios";
import "./quiz_page.css";
import "./quiz_progress.css";
import { Navbar } from "../nav_bar/nav2";
import Circle from "./circle";
import { Result } from "./result";
import LangContext from "../../langProvider.js";
import { UserContext } from "../usercontext";

export const Quizpage = () => {
  const { langid } = useContext(LangContext);
  const [currentLang] = useState(langid);
  const [currentstate, setcurrentstate] = useState(0);
  const [buttonText, setButtonText] = useState("Next");
  const [score, setScore] = useState(0);
  const [clicked, setclickedOption] = useState(null); 
  const [circle] = useState(7);
  const [quizData, setQuizData] = useState([]);
  const [width, setwidth] = useState(0);

  const { user } = useContext(UserContext);
  console.log(user._id)
  const languageNames = useMemo(() => ["English", "Japanese", "Italian", "Chinese","Russian","Korean","German","French"],[]);

  const arr = [];
  for (let i = 0; i < circle; i++) {
    const isActive = i <= currentstate;
    arr.push(
      <Circle className={`circle ${isActive ? "active" : ""}`} key={i}>
        {i + 1}
      </Circle>
    );
  }

  const progressbarChange = () => {
    if (currentstate >= circle) {
      setcurrentstate(circle);
    } else {
      setcurrentstate(currentstate + 1);
    }
  };

  const BackprogressbarChange = () => {
    if (currentstate <= 0) {
      setcurrentstate(0);
    } else {
      setcurrentstate(currentstate - 1);
    }
  };

  useEffect(() => {
    setwidth((100 / (circle - 1)) * currentstate);
  }, [circle, currentstate]);

  const HandleChnage = () => {
    if (clicked !== null) {
      updateScore();
      progressbarChange();
    }

    if (currentstate < quizData.length - 2) {
      setcurrentstate(currentstate + 1);
      setclickedOption(null); 
    } else if (currentstate < quizData.length - 1) {
      setButtonText("Results");
      setclickedOption(null);
    }
  };

  const BackHandleChnage = () => {
    BackprogressbarChange();
    if (currentstate > 0) {
      setcurrentstate(currentstate - 1);
      setScore(score-1)
      if (clicked !== null) {
        updateScore(); 
      }
      setclickedOption(null); 
    }
    if (currentstate === 1) {
      setButtonText("Next");
    }
  };

  const updateScore = () => {
    if (clicked === quizData[currentstate]?.answer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const resetAll = () => {
    setcurrentstate(0);
    setclickedOption(null);
    setScore(0);
    setButtonText("Next");
  };


  const shuffleArray = (array) => {
    const slicedArray = array.length > 7 ? array.slice(0, 7) : array;
    console.log(slicedArray.length)
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = slicedArray[currentIndex];
      slicedArray[currentIndex] = slicedArray[randomIndex];
      slicedArray[randomIndex] = temporaryValue;
    }
  
    return slicedArray;
  };

  useEffect(() => {

    const fetchQuizData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/quizdata/${currentLang}`);
        if (!response.ok) {
          throw new Error("Failed to fetch quiz data");
        }
        const data = await response.json();
        const shuffledQuestions = shuffleArray(data.questions);
        console.log(shuffledQuestions)
        setQuizData(shuffledQuestions);
      } catch (error) {
        console.error("Error fetching quiz data:", error.message);
      }
    };
    fetchQuizData();
  }, [currentLang]);

  useEffect(() => {
    const saveResultToMongoDB = async () => {
      const languageName = languageNames[langid];
      const currentDate = new Date().toJSON().slice(0, 10);
      try {
        const response = await axios.post('/scorerecord', {
          userId: user.id,
          languageName:languageName,
          marks:score,
          date: currentDate,
        });
  
        console.log("Record saved to MongoDB:", response.data);
      } catch (error) {
        console.error("Error saving record:", error);
      }
    };
  
    if (currentstate === 7) {
      saveResultToMongoDB();
    }
  }, [currentstate, langid, languageNames, user, score]);


  if (currentstate === 7) {
    return <Result resl={score} tryAgain={resetAll} />;
  } else {
    return (
      <div className="container">
        <Navbar />
        <div className="main_container">
          <div className="q_heading">
            “Explore. <span id="q_confirm">Confirm</span> .Master”
          </div>
          <div className="progress_content">
            <div className="progress_main">
              <div className="progress" style={{ width: width + "%" }}></div>
              {arr}
            </div>
          </div>
          <div className="question_box">
          {quizData[currentstate]?.question}
          </div>
          <div className="option-container">
            {quizData[currentstate]?.options.map(
              (option, i) => {
                return (
                  <button
                    className={`option-btn btn_options ${
                      clicked === i + 1 ? "checked" : ""
                    }`}
                    key={i}
                    onClick={() => {
                      setclickedOption(i + 1);
                    }}
                  >
                    {option}
                  </button>
                );
              }
            )}
          </div>
          <div className="movement_btn">
            <button
              className="animated-button"
              onClick={BackHandleChnage}
              disabled={currentstate > 0 ? false : true}
            >
              <span>Back</span>
              <span></span>
            </button>
            <button
              className="animated-button"
              onClick={HandleChnage}
              disabled={clicked === null}
            >
              <span>{buttonText}</span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    );
  }
};

