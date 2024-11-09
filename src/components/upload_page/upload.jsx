import React, { useState, useRef, useContext } from "react";
import { Navbar } from "../nav_bar/nav2";
import { Nav3 } from "../nav_bar/Nav3";
import upload from "../../Assets/upload page/upload.png";
import uploadicon from "../../Assets/upload page/upload icon 2.png";
import contribute from "../../Assets/upload page/contribute.png";
import "./upload.css";
import { Link } from "react-router-dom";
import LangContext from "../../langProvider.js";
import axios from "axios";
import { UserContext } from "../usercontext.jsx";

export const Upload = () => {
  const [files, setFiles] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const inputRef = useRef();
  const { langid } = useContext(LangContext);
  const [ispublic, setIsPublic] = useState(false);
  const { user } = useContext(UserContext);


  console.log(selectedLanguage)
  const handleUpload = async (props) => {
    try {
      const formData = new FormData();
      formData.append("userId", user._id);

      if (user.userType === "admin") {
        formData.append("lang", selectedLanguage);
      } else {
        formData.append("lang", langid);
      }
      formData.append("pdf", files);
      if (user.userType === "admin") {
        formData.append("isPublic", true);
        formData.append("isPrivate", false);
      } else {
        formData.append("isPublic", ispublic);
        formData.append("isPrivate", true);
      }
      formData.append("file_name", files[0].name);

      const response = await axios.post("/submit-file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        alert("File uploaded successfully");
        setFiles(null);
      } else {
        alert("Failed to upload file");
      }
    } catch (error) {
      console.error("Error uploading file:", error.message);
      alert("Failed to upload file");
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setFiles(event.dataTransfer.files);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFiles(event.dataTransfer.files);
    setFiles(null);
  };

  if (files) {
    return (
      <div>
        {user.userType === "admin" ? <Nav3 /> : <Navbar />}

        <div className="mainn_container">
          <div className="upload_container">
            <div className="uploads">
              <img src={contribute} alt="contibute" />
              <div className="contri_content">
                <p className="selected_file" data-text="Your Selected File">
                  Your Selected File
                </p>
                <ul className="file_name">
                  {Array.from(files).map((file, idx) => (
                    <>
                      <li key={idx}>{file.name}</li>
                      <embed
                        className="changeEmbed"
                        src={URL.createObjectURL(file)}
                        width="100%"
                        height="100%"
                        type="application/pdf"
                      />
                    </>
                  ))}
                </ul>
                {user.userType === "admin" ? (
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                  >
                    <option value="">Select Language</option>
                    <option value="0">English</option>
                    <option value="2">Italian</option>
                    <option value="7">French</option>
                    <option value="6">German</option>
                    <option value="3">Chinese</option>
                    <option value="1">Japanese</option>
                    <option value="5">Korean</option>
                    <option value="4">Russian</option>
                  </select>
                ) : (
                  <div className="priv_pub">
                    <div className="pub">
                      <input
                        type="radio"
                        onChange={() => setIsPublic(true)}
                        name="option"
                      />{" "}
                      Public
                    </div>
                    <div className="priv">
                      <input
                        type="radio"
                        onChange={() => setIsPublic(false)}
                        name="option"
                      />{" "}
                      Private
                    </div>
                  </div>
                )}
                <div className="btn_actions">
                  <button
                    className="button8 type2"
                    onClick={() => setFiles(null)}
                  ></button>
                  <Link to={user.userType === "admin" ? "/admin" : "/course"}>
                    <button
                      className="button8 type1"
                      onClick={handleUpload}
                    ></button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {user.userType === "admin" ? <Nav3 /> : <Navbar />}
      <div className="mainn_container">
        <div className="upload_container">
          <img src={upload} alt="upload" className="upload_image" />
          <div
            className="dropzone"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <img src={uploadicon} alt="uploadIcon" className="upload_icon" />
            <div className="upload_text">
              <p className="drag_drop">Drag & Drop Files</p>
              <p onClick={() => inputRef.current.click()} className="browse">
                Your files here or Browse to upload
              </p>
              <input
                type="file"
                onChange={(event) => setFiles(event.target.files)}
                hidden
                accept="image/png, image/jpeg ,application/pdf , application/msword"
                ref={inputRef}
              />
              <p className="upload_type">
                Only Jpeg/Png/Pdf/Doc files with max size of 150MB
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
