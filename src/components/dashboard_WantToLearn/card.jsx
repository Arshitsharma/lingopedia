import React, { useContext } from 'react';
import LangContext from '../../langProvider.js';
import {Link,} from 'react-router-dom';

export const Card = (props) => {
  const { setLangIdAndUpdate } = useContext(LangContext);

  const languageId = () => {
    setLangIdAndUpdate(props.key1);
  };
  return (
    <Link to="/course"><div className='Card__component hvr-grow-shadow' onClick={languageId}>
      <div className='Card__component-title'>
        <h3>{props.name}</h3>
      </div>
      <div className='Card__component-img'>
        <img src={props.pic} style={props.name === "English" || props.name === "French" ? { width: '7rem' } : {}} alt="card" />
      </div>
    </div></Link>
  )
}
