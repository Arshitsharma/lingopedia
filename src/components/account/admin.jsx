import { useState, useEffect } from "react";
import { UploadNotes } from "../dashboard_WantToLearn/UploadVideo";
import { Nav3 } from "../nav_bar/Nav3";
import axios from "axios";
import { imports } from "../dashboard_WantToLearn/Images.js";
import { Link } from "react-router-dom";

import "./account.css";
import "./admin.css";

export const Admin = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [videos, setVideos] = useState({ beginner: [], advance: [] });
  const [langid, setLangid] = useState(0);
  const [level, setLevel] = useState("beginner");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");

  const fetchVideos = async () => {
    try {
      const response = await fetch(`http://localhost:4000/videos/${langid}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [langid]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get("/fetch-feedback");
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };
    fetchFeedback();
  }, []);

  const openVideoInNewTab = (link) => {
    window.open(link, "_blank");
  };

  const handleMessage = (msg) => {
    setMessage(msg);
    alert(message);
  };

  const handleAddVideo = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:4000/videos/${langid}/${level}`, {
        url,
      });

      if (response.status === 200) {
        alert(`Video added successfully`);
        setUrl("");
        fetchVideos();
      } else {
        handleMessage(`Error: ${response.data.error}`);
      }
    } catch (error) {
      console.error("Error adding video:", error);
      handleMessage("Error adding video");
    }
  };

  const handleDeleteVideo = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.delete(`http://localhost:4000/videos/${langid}/${level}`, {
        data: { url },
      });
      if (response.status === 200) {
        alert(`Video deleted successfully`);
        setUrl(""); // Clear the URL input after success
        fetchVideos();
      } else {
        handleMessage(`Error: ${response.data.error}`);
      }
    } catch (error) {
      if (error.response) {
        handleMessage(`Error: ${error.response.data.error}`);
      } else {
        handleMessage("Error deleting video");
      }
    }
  };
  
  return (
    <div className="main_">
      <Nav3 />
      <div className="main_box">
        <div className="left_containadmin">
          <div className="language-container">
            {imports.map((lang) => (
              <div
                className="languagee"
                key={lang.id}
                onClick={() => setLangid(lang.id)}
              >
                <div className="flag-circle">
                  <img src={lang.flag} alt={lang.title} className="flag-img" />
                </div>
                <div
                  className={`language-name ${
                    langid === lang.id ? "selected-text" : ""
                  }`}
                >
                  {lang.title}
                </div>
              </div>
            ))}
          </div>
          <div className="admin_courses_beginner  ">
            <p className="admin_course_heading">
              Beginner Level<span id="arrow">&gt;&gt;&gt;</span>
            </p>
            <div className="beginner_videos">
              {videos.beginner.map((link, i) => {
                return (
                  <iframe
                    key={i}
                    onClick={() => openVideoInNewTab(link)}
                    className="admin_courses_iframe"
                    src={link}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                );
              })}
            </div>
          </div>
          <div className="admin_courses_beginner">
            <p className="admin_course_heading">
              Advance Level<span id="arrow">&gt;&gt;&gt;</span>
            </p>
            <div className="beginner_videos">
              {videos.advance.map((link, i) => {
                return (
                  <iframe
                    key={i}
                    onClick={() => openVideoInNewTab(link)}
                    className="admin_courses_iframe"
                    src={link}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                );
              })}
            </div>
          </div>

          <div className="admin_courses_beginner admin_notes_div">
            <span className="admin_course_heading">
              Public Notes <Link to="/upload">upload</Link><span id="arrow">&gt;&gt;&gt;</span>
            </span>
            <div className="admin_notes_content">

            <UploadNotes lang={langid} />
            </div>

          </div>
        </div>

        <div className="right_containadmin">
          <div className="adminright_contain_box1">
            <div className="update_functions">
              <label>New Embedded Url</label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                id="url_input"
              />
            </div>
            <div className="level_selection">
              <label>Level</label>
              <div className="level_options">
                <label>
                  <input
                    type="radio"
                    value="beginner"
                    checked={level === "beginner"}
                    onChange={() => setLevel("beginner")}
                  />{" "}
                  Beginner
                </label>
                <label>
                  <input
                    type="radio"
                    value="advance"
                    checked={level === "advance"}
                    onChange={() => setLevel("advance")}
                  />{" "}
                  Advance
                </label>
              </div>
            </div>
            <div className="operation">
              <button type="submit" className="operation_btn" onClick={handleAddVideo}>
                Add Video
              </button>
              <button type="submit" className="operation_btn" onClick={handleDeleteVideo}>
                Delete Video
              </button>
            </div>
          </div>

          <div className="right_contain_box2">
            <span className="account_heading">
              User Feedbacks<span id="arrow">&gt;&gt;&gt;</span>
            </span>
            <div className="feedback_list">
              {feedbacks.map((feedback, index) => (
                <div className="feedback_entry" key={index}>
                  <div id="feedbacker">{feedback.name}</div>
                  <div>{feedback.feedback}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
