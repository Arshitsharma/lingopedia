import React, { useEffect } from "react";
import { Navbar } from "../nav_bar/nav2";
import "./quiz_page";
import "./result.css";
import excellent from "../../Assets/Test page/excellent.svg";
import better from "../../Assets/Test page/better.svg";
import { Link } from "react-router-dom";

export const Result = (props) => {
  useEffect(() => {
    const image = document.querySelector(".result_image");
    image.classList.remove("animation-class");
    void image.offsetWidth;
    image.classList.add("animation-class");

    const elements = document.querySelectorAll(
      ".rcontent_title, .rcontent_score, .rcontent_line"
    );
    elements.forEach((element) => {
      setTimeout(() => {
        element.classList.add("loaded");
      }, 1000);
    });

    const buttons = document.querySelectorAll(".bbtn");
    buttons.forEach((button) => {
      setTimeout(() => {
        button.classList.add("loaded");
      }, 1000);
    });
  }, []);

  return (
    <div className="container">
      <Navbar />
      <div className="main_container">
        <div className="q_heading">
          “Explore. <span id="q_confirm">Confirm</span> .Master”
        </div>
        <div className="result_box">
          <div className="result_content">
            <div className="confetti">
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
            </div>
            <div className="rcontent_title">Your Score</div>
            <div className="rcontent_score">{props.resl}/7</div>
            <div className="rcontent_line">
              {" "}
              Continue for learning more and more.
            </div>
            <div className="btn-result">
              <Link to="/course">
                <button className="bbtn">Learn</button>
              </Link>
              <button className="bbtn" onClick={props.tryAgain}>
                Retry
              </button>
            </div>
          </div>
          <img
            className="result_image "
            src={props.resl < 4 ? better : excellent}
            alt="status"
          />
        </div>
      </div>
    </div>
  );
};
