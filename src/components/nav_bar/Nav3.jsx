import React from "react";
import "./Nav.css";
import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../usercontext";
import logo3 from "../../Assets/logo3.svg";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import logoutswitch from "../../Assets/switch.png"


export const Nav3 = () => {
  const { user, setuser } = useContext(UserContext);
  const [isredirect, setisredirect] = useState(null);

  const logout = async () => {
    await axios.post("/logout");
    setisredirect("/");
    setuser(null);
  };

  if (isredirect) {
    return <Navigate to={isredirect} />;
  }
  return (
    <div className="nav-bar-3">
      <div className="nav_left">
        <Link to="/">
          <img className="nav_logo" src={logo3} alt="logo" />
        </Link>
        <span className="lingo">Lingo</span>
        <span className="pedia">Pedia</span>
      </div>
      <div className="nav_right">
        <span className="user_name-nav3">{user.name}</span>
       <img src={logoutswitch} alt="logoutbtn" className="logout_switch" onClick={logout}/>
      </div>
    </div>
  );
};
