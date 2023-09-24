import React from "react";
import "./introduction.css"
import github from "../../images/github.png"
import linkedIn from "../../images/linkedIn.png"
import myImage from "../../images/myImage.png"
import star from "../../images/star.png"
import blue from "../../images/blue.webp"
import crown from "../../images/crown.png"
// import { FontAwesomeIcon } from "@fortawesome/free-regular-svg-icons"
// import { faLinkedin } from "@fortawesome/free-regular-svg-icons"

export default function Introcuction(){
    return(
        <div className="introdiction">
             <div className="i-left">
                 <div className="i-name">
                     <span> HYY! I Am</span><span>Jugal Rajput</span>
                     <span>
                        I am a graduate of NIT Surat and an enthusiastic frontend developer
                        proficient in a wide array of web development technologies. I specialize
                        in JavaScript, React, HTML5, CSS, REST APIs, Git, advanced JavaScript concepts,
                        Redux, and responsive web design. I am adept at creating intuitive user
                        interfaces and collaborating with cross-functional teams to deliver exceptional
                        web applications.
                     </span>
                 </div>
                 <button className="i-button">Hire Me</button>
                 <div className="i-icons">
                    <a href="https://github.com/itsjxi?tab=repositories">
                    <img src={github} alt="" style={{backgroundColor: "orange", borderRadius: "45%"}} />
                    </a>
                    <a href="https://www.linkedin.com/in/jugal-rajput-39bbbb144/">
                    <img src={linkedIn} alt="" />
                    </a>
                    
                 </div>
             </div>
             <div className="i-right">
             <img src={blue} alt="background" style={{width: "600px", height:"400px", left: "50px"}} />
             <img src={star} alt="background" style={{width: "600px", height:"500px", left: "80px"}} />
                 <img src= {myImage} style={{ left: "200px", top:"50px"}}/>
               <FlotingDiv image ={crown} text1="Web" text2="Developer"/>
               <div className="blur" style={{ background: "rgb(238 210 255)" }}></div>
        <div
          className="blur i-blurrBlue"
          style={{
            background: "#C1F5FF",
            width: "21rem",
            height: "11rem",
          }}
        ></div>
         <div
          className="blur i-blurrPink"
          style={{
            background: "pink",
            top: "-10rem",
            width: "21rem",
            height: "11rem",
            left: "-30rem",
          }}
        ></div>
             </div>
        </div>
    )
}

function FlotingDiv({image, text1, text2}){
    return(
         <div className="flotingDiv">
            <img src={image} alt= ""/>
            <span>
                {text1}<br/>{text2}
            </span>
         </div>
    )
}