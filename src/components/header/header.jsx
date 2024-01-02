import React from "react";
import "./header.css";
import Toggle from "../toggle/toggle";
// import imglogo from "./images/jletter."
import {Link} from "react-scroll"
import Projects from "../Projects/project";

export default function Header(){
    return(
        <>
        <div className="h-wrapper">
           <div className="h-left">
           {/* <img
    src=""
    style={{ width: '50px', height: '60px', marginTop: "20px" }}
    alt='Letter J'
  /> */}
                <div className="h-name">Jugal</div>
                
           </div>
           <div className="h-right">
            <div className="h-list">
                <ul>
                    <Link spy={true}  smooth = {true} to='Header'>
                    <li>Home</li>
                    </Link>
                    <Link spy={true}  smooth = {true} to='Projects'>
                    <li>Projects</li>
                    </Link>
                    <Link spy={true}  smooth = {true} to='Skills'>
                    <li>Skills</li>
                    </Link>
                    
                    <li>Experience</li>
                </ul>
            </div>
            <Link spy={true}  smooth = {true} to='Contact'>
            <button className="h-button">Contact Me</button>
                    </Link>
            
            <div className="h-toggle">
            <Toggle/>
            </div>
           </div>
           </div>   
        </>
    )
    
}