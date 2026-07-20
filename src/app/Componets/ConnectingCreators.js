"use client";
import React, { useEffect, useRef, useState } from 'react';
import Link from "next/link";
import "./ConnectingCreators.css";
import FocusWindow from './focusWindow.js';

import { FaInstagram } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaSpotify } from "react-icons/fa";


import {Links} from './MonthlyUpdates.js';
import {COTM} from './MonthlyUpdates.js';

//Monthly Updates section
const lumaLink = Links.lumaLink;
const youtubeLink = Links.youtubeLink;
const discordInvite = Links.discordInvite;

const ConnectingCreators = ({ 
  text = "Connecting • ", 
  speed = 50,
  className = "" 
}) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [duplicatedText, setDuplicatedText] = useState("");
  const [showFocusWindow, setShowFocusWindow] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(5);
  const [file, setFile] = useState(null);

  useEffect(() => {
    //scrolling Text effect
    const container = containerRef.current;
    if (!container) return;
  
    const tempElement = document.createElement('span');
    tempElement.style.visibility = 'hidden';
    tempElement.style.whiteSpace = 'nowrap';
    tempElement.textContent = text;
    document.body.appendChild(tempElement);
    
    const textWidth = tempElement.offsetWidth;
    const containerWidth = container.offsetWidth;
    document.body.removeChild(tempElement);

    const requiredDuplicates = Math.ceil((containerWidth * 2) / textWidth) + 2;
    setDuplicatedText(text.repeat(requiredDuplicates));
  }, [text]);

  const dismissFocusWindow = () => {
    setShowFocusWindow(false);
  }
  const openFocusWindow = () => {
    setShowFocusWindow(true);
  }
  const setCOTM = (monthValue) => {
    setSelectedMonth(monthValue);
  }
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
      setFile(file);
    }
    openFocusWindow();
  };


  return (
    <div className="Page">
      {showFocusWindow ? <FocusWindow onDismiss={dismissFocusWindow} file={file}/> : <></>}
      <div className={`infinite-scroll-container ${className}`} ref={containerRef}>
      <div 
        className="scrolling-text animate" 
        ref={textRef}
        style={{ 
          animationDuration: `${speed}s` 
        }}
      >
        {duplicatedText}
      </div>
      <div className="LandingContainer">
        <img className="ccLandingImg" src={'/Assets/File_006.png'} alt="Connecting Creators landing" />
        <div className="LandingSubText">Creators</div>
      </div>
      </div>
      <div className="footer-curve">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,100 C480,0 960,0 1440,100 L1440,0 L0,0 Z" fill="#000" />
        </svg>
        <div className="CCHeader">
          <img className="Poster" src={'/Assets/Posters/cc13poster.png'} alt="CC13 Poster" />
          <div>
          RSVP for our next event
          <div className="ReadMoreBtn"><a href={lumaLink} target="_blank" rel="noopener noreferrer">Learn More</a></div>
          {/* What unites us as creators isn’t our craft, it’s our courage, curiosity, and care in how we create. */}
          </div>
        </div>
      </div>
      <div className="MainSection">
        <div className="ContentMain">
          <div className="ContentMainSubSection">
            <div className="ContentMainTitle">
              What connects us isn’t what we do, it’s how we do it.
            </div>
            <div className={"ContentTextSection"}>
              Connecting Creators is a growth focused movement. No matter your background or what your medium is, we grow through courage, authenticity, vulnerability, service, connection, and hard work. We are a bridge between the filmmakers, musicians, designers, and creators alike. It doesn’t matter what stage in your journey you’re in, as long as you want to be here and are willing to put in the work. The question is, how bad do you want it?
            </div>
            <div className="InfoBtn"><a href={lumaLink} target="_blank" rel="noopener noreferrer">Our Next Meetup</a></div>
          </div>
          <img src={"/Assets/CC/IMG_9102.jpg"} className="pageImg" alt="Meetup talking group circle" />
          </div>
          <div className="DiscordInfo">
            Join the conversation and community on <div className="InfoBtn"><a className="DiscordLink" href={discordInvite} target="_blank" rel="noopener noreferrer"><FaDiscord/>&nbsp;Discord</a></div>
          </div>
          <div className="CreatorOfTheMonthCard">
            <div className="CreatorOfTheMonthimgContainer">
              <img className="bgBrush" src={'/Assets/CC/bgBrush2.png'} alt="Background Brush Stroke" />
              <img className="CreatorOfTheMonthImage" src={COTM[selectedMonth].Image} alt="Creator of the month" />
            </div>
            <div className="CreatorOfTheMonthInfo">
              <div className="CreatorOfTheMonthTitle">Creator Of The Month</div>
              <div className="CreatorOfTheMonthName">{COTM[selectedMonth].Name}</div>
              <div className="ContentTextSection">
                {COTM[selectedMonth].Description}
                <u className="cotmLink"><FaInstagram/><a href={COTM[selectedMonth].Link} target="_blank" rel="noopener noreferrer"> {COTM[selectedMonth].Name}'s page.</a></u> 
              </div>
            </div>
          </div>
<div className="cotmSelectorDiv">
  <div className="cotmYear">
    <select className="cotmSelect" defaultValue="2026" disabled>
      <option disabled>Year</option>
      <option>2026</option>
    </select>

    <select className="cotmSelect" defaultValue={selectedMonth} onChange={(e) => setCOTM(e.target.value)}>
      <option value="0">January</option>
      <option value="1">February</option>
      <option value="2">March</option>
      <option value="3">April</option>
      <option value="4">May</option>
      <option value="5">June</option>
      <option disabled>July</option>
      <option disabled>August</option>
      <option disabled>September</option>
      <option disabled>October</option>
      <option disabled>November</option>
      <option disabled>December</option>
    </select>
  </div>

    <img
      className="cotmBrush3"
      src={'/Assets/CC/bgBrush3.png'}
      alt="Background Brush Stroke"
    />
</div>
          <div className="ContentMain">
            <div className="ContentMainSubSection">
            <div className="ContentMainTitle">
              Watch an Event Recap
            </div>
            <div className={"ContentTextSection"}>
              Footage from our last meetup where we had an amazing time connecting, learning, and growing together as creators.
              Local creators shared their journeys, struggles, and wins in our creator circle.
            </div>
            <div className="InfoBtn">Our Next Meetup</div>
          </div>
          {youtubeLink}
          </div>
          <div className="ContentMain">
                <div className="ContentMainTitle">
                  Connecting Creators Merch
                </div>
              <img
                src={'/Assets/merch1.jpg'}
                className="pageImg"
                alt="Connecting Creators merchandise"
              />
            <div className="ContentMainSubSection">
            <div className="ContentTextSection">
              Every purchase helps support future meetups, events, and
              community projects.
            </div>
            <div className="Shop">
               Browse limited edition merchandise.<div className="ShopLink"><Link href="/shop">Visit the Shop</Link></div>
            </div>
          </div>
        </div>
          <div className={"ContentMain"}>
              <div className="ContentMainSubSection">
                <div className="uploadContainer">
                <div className="upload-wrapper">
                  <div 
                    className="drop-zone"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      openFocusWindow();
                      console.log("File dropped:", e.dataTransfer.files[0].name);
                      setFile(e.dataTransfer.files[0]);
                    }}
                  >
                    <div className="upload-icon">↑</div>
                    <p className="upload-text">Drag & drop files here</p>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileChange} 
                      style={{ display: 'none' }} 
                    />
                    </div>

                    <button className="upload-button" onClick={handleButtonClick}>
                      Choose File
                    </button>
                  </div>
                
                  <button className="uploadButton" onClick={openFocusWindow}> Open Submission Form </button>
                </div>
              </div>         
              <div className="ContentMainSubSection ">
                <div className="brushContainer">
                  <div className="FormTitle White brushContainer">Artists Submission Form</div>
                  <img src={'/Assets/CC/bgBrush5.png'} className="submitArtBrush" alt="Submit Your Art" />
                  </div>
                <div className="ContentTextSection">
                  Submit your Art for our team to review and potentially feature in our next event or socials. We are looking for all types of art from music, to film, to visual art, to writing, and more. We want to support and feature the amazing talent in our community so don&apos;t hesitate to submit your work.
                </div>
              </div>

          </div>
        <div className="ContentSecondary">
          
          <div className="InfoContainer">
            <div className="InfoTitle">
            Info about our next meetup
            </div>
            <div className='InfoSection'>
              RSVP at Luma
              <div className="InfoBtn"><a href={lumaLink} target="_blank" rel="noopener noreferrer">More Info</a></div>
            </div>
          </div>
          <div className="InfoContainer">
            <div className="InfoTitle">Volunteering opportunities</div>
            <div className='InfoSection'>
              Want to help?
              <div className="InfoBtn"><a href={"https://www.instagram.com/connectingcreators/"} target="_blank" rel="noopener noreferrer">DM US</a></div>
            </div>
          </div>
          <div className="InfoContainer">
            <div className="InfoTitle">
            Our Socials
            </div>
            <div className='InfoSection'>
            <a className="Socials" href="https://open.spotify.com/show/2V5z6e2WRfUhf6oSkvRzBY?si=f0751cbe8bae434e">Podcast<FaSpotify/></a>
            <a className="Socials" href="https://www.youtube.com/@connecting_creators">YouTube<FaYoutube/></a>
            <a className="Socials" href="https://www.instagram.com/connectingcreators/">Instagram<FaInstagram/></a>
            <a className="Socials" href="https://discord.gg/TjQ4skPq">DISCORD<FaDiscord/></a>
            </div>
          </div>
          <div className="InfoContainer">
            <div className="InfoTitle">
            Host Connecting Creators
            </div>
                      <div className='InfoSection'>
                        Host and event at your venue
              <div className="InfoBtn"><a href={"https://www.instagram.com/connectingcreators/"} target="_blank" rel="noopener noreferrer">DM US</a></div>
            </div>
          </div>
        </div>
      </div>
      <footer>
        © 2026 Connecting Creators. All rights reserved.
      </footer>
    </div>
  );
};

export default ConnectingCreators;



