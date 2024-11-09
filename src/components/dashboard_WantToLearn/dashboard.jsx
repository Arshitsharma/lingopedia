import React ,{ useContext,useState,useEffect }from 'react';
import { Navbar } from '../nav_bar/nav2';
import { UploadNotes } from './UploadVideo';
import './dashboard.css';
import LangContext from '../../langProvider.js';



export const Dashboard = () => {
  
  const [videos, setVideos] = useState({ beginner: [], advance: [] });
  const {langid} = useContext(LangContext);
  
  const openVideoInNewTab = (link) => {
    window.open(link, '_blank');
  };

  useEffect(() => {
    const fetchVideos = async () => {
      
      try {
            const response = await fetch(`http://localhost:4000/videos/${langid}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, [langid]);

  return (
    <div className="mainnnn">
      <Navbar />
      <div className="courses_maincontainer">
        <div className="courses_beginner  ">
          <p className="course_heading">
            Beginner Level<span id="arrow">&gt;&gt;&gt;</span>
          </p>
          <div className="beginner_videos">
            {videos.beginner.map((link, i) => {
              return (
                <iframe
                  key={i}
                  onClick={() => openVideoInNewTab(link)}
                  className="courses_iframe"
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
        <div className="courses_beginner">
          <p className="course_heading">
            Advance Level<span id="arrow">&gt;&gt;&gt;</span>
          </p>
          <div className="beginner_videos">
            {videos.advance.map((link, i) => {
              return (
                <iframe
                  key={i}
                  onClick={() => openVideoInNewTab(link)}
                  className="courses_iframe"
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
        <div className="courses_beginner">
          <p className="course_heading">
            Study Notes<span id="arrow">&gt;&gt;&gt;</span>
          </p>
          <UploadNotes lang={langid} />
        </div>
      </div>
    </div>
  );
};
