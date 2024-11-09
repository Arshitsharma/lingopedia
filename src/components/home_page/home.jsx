import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Nav } from "../nav_bar/Nav";
import "./home.css";
import start from "../../Assets/main page/start.svg";
import efforts from "../../Assets/main page/efforts.svg";
import lingual from "../../Assets/main page/lingual.svg";
import testing from "../../Assets/main page/testing.svg";
import notes from "../../Assets/main page/notes.svg";
import footer1 from "../../Assets/main page/footer1.jpg";
import { FaInstagram, FaTwitter } from "react-icons/fa";
import { ImFacebook2 } from "react-icons/im";

export const Home = () => {
  const observer = useRef(null);

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    });

    const hiddenEls = document.querySelectorAll(".hidden");
    const hiddenEls2 = document.querySelectorAll(".hidden2");

    hiddenEls.forEach((el) => observer.current.observe(el));
    hiddenEls2.forEach((el) => observer.current.observe(el));

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);
  let iconStyles = {
    color: "white",
    fontSize: "1.2em",
    transition: "font-size 0.3s ease-in-out",
  };
  return (
    <div style={{ width: "100%" }}>
      <Nav />
      <div className="home_top_box">
        <div className="top_content">
          <div className="content_main_line">
            Languages have never been so easy.
          </div>
          <p className="content">
            “Discover the ease of mastering languages and empower your voice
            through language, with confidence on your learning journey."
          </p>
          <Link to="/register" className="btn_started btn">
            Get Started
          </Link>
          <Link to="/login" className="btn_already btn">
            Already have an Account
          </Link>
        </div>
        <div className="top_image ">
          <img className="hvr-hang top_img" src={start} alt="image1" />
        </div>
      </div>

      <div className="home_features">
        <div className="feature ">
          <img src={efforts} alt="efforts" className="feature_image" />
          <div className="feature_content hidden2 ">
            <p id="f1_title" className="title ">
              “Learn from Experts”
            </p>
            <p id="f1_desc" className="desc">
              Access top-tier language instructors and curated YouTube content
            </p>
          </div>
        </div>

        <div className="feature ">
          <div className="feature_content hidden">
            <p id="f2_title" className="title">
              “Multilingual Support”
            </p>
            <p id="f2_desc" className="desc">
              Learn the language you want, in your preferred language.
            </p>
          </div>
          <img
            className="feature_image"
            id="img-2"
            src={lingual}
            alt="efforts"
          />
        </div>

        <div className="feature ">
          <img src={testing} alt="testing" className="feature_image" />
          <div className="feature_content hidden2">
            <p id="f3_title" className="title">
              “Interactive Quizzes”
            </p>
            <p id="f3_desc" className="desc">
              Test your skills and track your language proficiency.
            </p>
          </div>
        </div>

        <div className="feature">
          <div className="feature_content  hidden">
            <p id="f4_title" className="title">
              “Upload Your Notes”
            </p>
            <p id="f4_desc" className="desc">
              Share your knowledge and earn money with each download.
            </p>
          </div>
          <img src={notes} alt="efforts" className="feature_image" />
        </div>
      </div>

      <div className="footer">
        <div className="image_container">
          <img className="footer_image" src={footer1} alt="footer" />
          <span className="image_content">WHY TO WAIT ?</span>
        </div>
        <div className="footer_icon">
          <div className="icon_div" style={{display:"flex",}}>
            <span className="icon ">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
              >
                <ImFacebook2 style={iconStyles} />
              </a>
            </span>
            <span className="icon">
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <FaInstagram style={iconStyles} />
              </a>
            </span>
            <span className="icon">
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <FaTwitter style={iconStyles} />
              </a>
            </span>
          </div>
        </div>
        <div className="copyright">
          <span id="cpy"> Copyright © 2023</span>
        </div>
      </div>
    </div>
  );
};
