import React from 'react';

import{
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom"

import "./App.css";
import {Home} from "./home_page/home"
import {Language} from './dashboard_WantToLearn/language';
import {Dashboard} from './dashboard_WantToLearn/dashboard';
import {Quizpage} from './quiz_page/quiz_page';
import {Upload} from './upload_page/upload';
import {Register} from "./login_page/signUp"
import {Login} from "./login_page/login"
import {Account} from "../components/account/account"
import {Admin} from "../components/account/admin"
import { LangProvider } from '../langProvider.js';
import axios from "axios"
import {UserContextProvider} from "./usercontext"

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

export const App = () => {
  return (
    <Router>

    <UserContextProvider>
    <LangProvider> 
      <div className="main">
      </div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/admin" element={<Admin />} />
        <Route exact path="/language" element={<Language />} />
        <Route exact path="/course" element={<Dashboard />} />
        <Route exact path="/test" element={<Quizpage />} />
        <Route exact path="/upload" element={<Upload />} />
        <Route exact path="/account" element={<Account />} />
      </Routes>
    </LangProvider>
  </UserContextProvider>
  </Router>
);
}
