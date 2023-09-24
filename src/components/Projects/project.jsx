import React from "react";
import { projectsData  } from "./projectsData";
import github from "../../images/github.png";
import "./project.css"

export default function Projects(){

      const projectdetails = projectsData.map((item)=>{
        return <div className="p-projectBlock">
             
                   <img src={item.imageUrl} alt={item.name} />
                   <h3 style={{textAlign: "left", width: "100%", marginBottom:"0px"}}>{item.name}</h3>
                   <p>{item.text}</p>
                   <div className="p-demoButtons">
                       <a href={item.github}><button>Github <img src={github} alt=""  style={{width:"10px", height:"10px"}}/> </button></a>
                       <a href={item.livedemo}><button>Demo</button></a>
                   </div>

              </div>
      }) 

return(
     <>
     <div className="p-allProjects" id = "Projects">
     <div
          className="blur p-blurrPink"
          style={{
            background: "pink",
          
          }}
        ></div>
     <div className="p-rightProject">
        <span>My!</span>
        <span>Projects...</span>
      </div>
      <div className="p-leftProject">
         {projectdetails}
      
      </div>
      </div>
     </>
)


}