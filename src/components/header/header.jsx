import React from "react";
import "./header.css";
// import imglogo from "./images/jletter."

export default function Header(){
    return(
        <>
        <div className="h-wrapper">
           <div className="h-left">
           <img
    src=""
    style={{ width: '50px', height: '60px', marginTop: "20px" }}
    alt='Letter J'
  />
                <div className="h-name">Jugal</div>
                
           </div>
           <div className="h-right">
            <div className="h-list">
                <ul>
                    <li>Home</li>
                    <li>Projects</li>
                    <li>Portfolio</li>
                    <li>Skills</li>
                    <li>Experience</li>
                </ul>
            </div>
            <button className="h-button">Contact Us</button>
            <div className="h-toggle">
            <span>toggle</span>
            </div>
           </div>
           </div>   
        </>
    )
    
}