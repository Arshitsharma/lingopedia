import React, { createContext, useState, useEffect } from "react";

const LangContext = createContext();

export const LangProvider = ({ children }) => {
  const storedLangId = localStorage.getItem("langid");
  const [langid, setLangid] = useState(
    storedLangId ? parseInt(storedLangId, 10) : 0
  );

  
  useEffect(() => {
    localStorage.setItem("langid", langid.toString());
  }, [langid]);

  const setLangIdAndUpdate = (id) => {
    setLangid(id);
  };

  return (
    <LangContext.Provider
      value={{
        langid,
        setLangIdAndUpdate,
      }}
    >
      {children}
    </LangContext.Provider>
  );
};

export default LangContext;
