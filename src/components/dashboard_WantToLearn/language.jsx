import React from "react";
import logo4 from "../../Assets/Welcome page/logo4.svg";
import "./language.css";
import { Card } from "./card";
import { imports } from "./Images.js";

export const Language = () => {

  return (
    <div className="language">
      <div className="nav-barr">
        <img className="nav_logo" src={logo4} alt="logo" />
        <span className="lingo">Lingo</span>
        <span className="pedia">Pedia</span>
      </div>
      <div className="language__content">
        <div className="language__text">
          <p>
            whether you're going on vacation, taking a business trip ,or just
            looking to improve your language skills,
            <span id="text"> LingoPedia</span> is a great way to expand your
            linguistic abilities.
          </p>
        </div>
        <div className="learn">
          <h1>I want to learn?</h1>
        </div>
      </div>
      <div className="Card ">
        {imports.map((cardEntry) => (
          <Card 
            key1={cardEntry.id}
            name={cardEntry.title}
            pic={cardEntry.image}
            breadth={cardEntry.width}
            width={cardEntry.title === "English" || cardEntry.title === "French" ? "7rem" : ""}
          />
        ))}
      </div>
    </div>
  );
};
