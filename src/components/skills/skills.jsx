import React from "react";
import "./skills.css"
import { webSkills } from "./skillData";

export default function Skills(){

    const skillRendering = webSkills.map((item)=>{
        return <div className="s-skill"><img src = {item.imageUrl} alt= {item.skillName} style={{width: "50px"}}/>
               <h3>{item.skillName}</h3>
               </div>
    })

    return(
        <>
        <div className="overallSKillDiv" id = "Skills">
         <div className="skill-left i-name">
                     <span>My Awsome</span><span>Skills..</span>
            <button className="cv-button">Download CV</button>       
        </div>   
        <div className="skill-right s-skillrendering">
        {skillRendering}
        </div>
        </div>
        </>
    )
}