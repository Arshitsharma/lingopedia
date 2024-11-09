import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [user, setuser] = useState(storedUser);
  const [ready, setReady] = useState(!!storedUser); 

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) { 
      axios.get("/profile")
        .then(({ data }) => {
          setuser(data); 
          localStorage.setItem("user", JSON.stringify(data));
          setReady(true); 
        })
        .catch(error => {
          console.error("Error fetching user data:", error);
          setReady(true); 
        });
    }
  });

  const handleLogout = async () => {
    try {
      await axios.post("/logout");
      localStorage.removeItem("user");
      setuser(null);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setuser, ready, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
}
