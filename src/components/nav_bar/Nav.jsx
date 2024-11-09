import React from "react";
import "./Nav.css";
import   logo3  from "../../Assets/logo3.svg";
import {Link } from 'react-router-dom';

export const Nav = () => {
  return (
    <div className="nav-bar">
      <Link to="/"><img className="nav_logo" src={logo3} alt="logo" /></Link>
      <span className="lingo">Lingo</span>
      <span className="pedia">Pedia</span>
    </div>
  );
};
