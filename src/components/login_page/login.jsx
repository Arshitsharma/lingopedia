import React, { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import logo3 from "../../Assets/Welcome page/logo4.svg";
import login from "../../Assets/Welcome page/login.png";
import logo from "../../Assets/Welcome page/thinking.svg";
import email2 from "../../Assets/Welcome page/material-symbols_mail-outline.png";
import key from "../../Assets/Welcome page/carbon_password.png";
import eye from "../../Assets/Welcome page/el_eye-close (1).png";
import eye_open from "../../Assets/Welcome page/eye-open2.svg";
import "./login.css";
import axios from "axios";
import { UserContext } from "../usercontext";

export const Login = () => {
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [redirect, setredirect] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setuser } = useContext(UserContext);
  const [admin, setadmin] = useState(false);

  function togglePasswordVisibility() {
    const passwordInput = document.getElementById("password");
    const eyeIcon = document.getElementById("eyeIcon");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      eyeIcon.src = eye_open;
    } else {
      passwordInput.type = "password";
      eyeIcon.src = eye;
    }
  }

  const handleEmailFocus = () => {
    setIsEmailFocused(true);
  };
  const handleInputChange = (event, setState) => {
    const inputValue = event.target.value;
    setState(inputValue.length > 0);
  };

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const handlelogin = async (ev) => {
    ev.preventDefault();
    try {
      const {data} = await axios.post("/login", {
        email,
        password,
      });
      if(data.userType==="admin"){
        setadmin(true)
      }
      setuser(data);
      localStorage.setItem("user", JSON.stringify(data));
      setredirect(true);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("Invalid login credentials");
      } else if (error.response && error.response.status === 404) {
        setErrorMessage("User not found with the provided email");
      } else {
        alert("Login failed");
      }
    }
  };

  if (redirect) {
    if(admin){
      return <Navigate to={"/admin"}/>
    }
    return <Navigate to={"/language"} />;
  }

  return (
    <div className="login">
      <div className="login__left">
        <div className="nav-bar login_br">
          <Link to="/">
            <img className="nav_logo" src={logo3} alt="logo" />
          </Link>
          <span className="lingo">Lingo</span>
          <span className="pedia">Pedia</span>
        </div>
        <div className="login__image">
          <img src={login} alt="login" />
        </div>
        <div className="login__image-text">
          <p>
            "Dive right into the rich tapestry of languages and <br />
            continue your learning adventure."
          </p>
        </div>
      </div>
      <div className="login__form">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "5rem",
          }}
        >
          <div className="login__form-title">
            <h2>Welcome Back</h2>
            <img src={logo} alt="logo" />
          </div>
          <div className="login__form-details">
            <form onSubmit={handlelogin}>
              <div
                className={`login__form-input ${
                  isEmailFocused ? "focused" : ""
                }`}
              >
                <img src={email2} alt="email" />
                <input
                  value={email}
                  type="email"
                  onFocus={handleEmailFocus}
                  onChange={(e) => {
                    handleInputChange(e, setIsEmailFocused);
                    setemail(e.target.value);
                  }}
                />
                <label>E-mail</label>
              </div>

              <div
                className={`login__form-input ${
                  isPasswordFocused ? "focused" : ""
                }`}
              >
                <img src={key} alt="key" />
                <input
                  value={password}
                  type="password"
                  id="password"
                  onFocus={handlePasswordFocus}
                  onChange={(e) => {
                    handleInputChange(e, setIsPasswordFocused);
                    setpassword(e.target.value);
                  }}
                />
                <label className={isPasswordFocused ? "focused" : ""}>
                  Password
                </label>
                <img
                  className="eye"
                  src={eye}
                  alt="eye"
                  id="eyeIcon"
                  onClick={togglePasswordVisibility}
                />
              </div>

              {/* <Link to="/course"> */}
              <div className="error">{errorMessage}</div>
              <button className="login__form-button" type="submit">
                <span className="text ">Continue</span>
              </button>
              {/* </Link> */}
            </form>
            <Link to="/register" className="login_change">
              ------- <span>Need an Account ?</span> -------
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
