import React from "react";
import "./toggle.css"
import Sun from "@iconscout/react-unicons/icons/uil-sun"
import Moon from "@iconscout/react-unicons/icons/uil-moon"

export default function Toggle(){

    return(
        <div className="toggle">
            <Moon/>
            <Sun/>
            <div className="t-button"></div>
        </div>
    )
}