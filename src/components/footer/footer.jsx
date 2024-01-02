import React from "react";
import "./footer.css"
import Github from "@iconscout/react-unicons/icons/uil-github"
import Linkedin from "@iconscout/react-unicons/icons/uil-linkedin"
import wave from "../../images/wave.png"

export default function Footer(){
   return(
    <div className="footer">
      
        <div className="f-content">
            <span>jugalrajput10@gmail.com</span>
            <div className="f-icon">
          <a target="_blank" rel="noopener noreferrer"  href="https://github.com/itsjxi"> <Github color="white" size= "3rem"/></a>
          <a target="_blank" rel="noopener noreferrer"  href="https://www.linkedin.com/in/jugal-rajput-39bbbb144/"> <Linkedin color="white" size= "3rem"/></a> 
            </div>
        </div>
    </div>
   )


}