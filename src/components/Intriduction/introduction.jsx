import React from "react";
import "./introduction.css"
import github from "../../images/github.png"
import linkedIn from "../../images/linkedIn.png"
import myImage from "../../images/myImage.png"
import star from "../../images/star.png"
import blue from "../../images/blue.webp"
import crown from "../../images/crown.png"
import {Link} from "react-scroll"
// import { FontAwesomeIcon } from "@fortawesome/free-regular-svg-icons"
// import { faLinkedin } from "@fortawesome/free-regular-svg-icons"

export default function Introcuction(){
    return(
        <div className="introdiction">
             <div className="i-left">
                 <div className="i-name">
                     <span> This is....</span><span>Jugal Rajput</span>
                     <span className="introPara">
                     <p>👋 Hi, I'm Jugal, a graduate from NIT Surat. I have a strong passion for web development and front-end technologies. My mission is to craft outstanding web experiences that leave a lasting impression. 🌟🚀</p>

           <strong>🚀 Skills Constellation:</strong>

<p>✅ I possess strong proficiency in front-end technologies, including JavaScript, React.js, HTML, CSS, Redux, JASON, APIs, Ajax. These skills enable me to create captivating and user-friendly web interfaces.</p>

<p>🌠 Let's collaborate, code, and embark on a journey to create web experiences that are truly out of this world. Feel free to reach out – together, we'll write a new chapter in the cosmic web. 🚀🌌</p>
                     </span>
                 </div>
                 <div className="intro-button">
                 <Link spy={true}  smooth = {true} to='Contact'>
                 <button className="i-button">Hire Me</button>
                    </Link>
                 
                 <div className="i-icons">
                    <a target="_blank" rel="noopener noreferrer"  href="https://github.com/itsjxi?tab=repositories">
                    <img src={github} alt="" style={{backgroundColor: "orange", borderRadius: "45%"}} />
                    </a>
                    <a target="_blank" rel="noopener noreferrer"  href="https://www.linkedin.com/in/jugal-rajput-39bbbb144/">
                    <img src={linkedIn} alt="" />
                    </a>
                    
                 </div>
                 </div>
             </div>
             <div className="i-right">
             <img src={blue} alt="background" style={{width: "600px", height:"400px", left: "50px"}} />
             {/* <img src={star} alt="background" style={{width: "600px", height:"500px", left: "80px"}} /> */}
                 <img src= {myImage} style={{ left: "100px", top:"50px"}}/>
               <FlotingDiv image ={crown} text1="Web" text2="Developer"/>
               <div className="blur" style={{ background: "rgb(238 210 255)" }}></div>
        <div
          className="blur i-blurrBlue"
          style={{
            background: "#C1F5FF",
      
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