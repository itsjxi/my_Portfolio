import React from "react";
import"./contact.css"
import emailjs from '@emailjs/browser';
import { useRef , useState} from "react";


export default function Contact(){

    const form = useRef();
    const[done, setDone] = useState(false)
    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm('service_nld2dpm', 'template_bw4bwam', form.current, 'GSpf5-RciM723EsF-')
        .then((result) => {
            console.log(result.text);
            setDone(true)
        }, (error) => {
            console.log(error.text);
        });
    };

    return(
        <div className="contact-form" id= "Contact">
            <div className="c-left">
                <div className="awesome i-name">
                    <span>Get in touch</span>
                    <span>Contact me</span>
                    <div className="blur c-blurrGreen" style={{
                                    background: "lightgreen",
                                    height: "11rem",
                                  
                                }}
                    ></div>
                </div>
            </div>
            <div className="c-right">
                 <form ref={form} onSubmit={sendEmail}>
                    <input type="text" name="user_name" className="user" placeholder="Name" />
                    <input type="email" name="user_email" className="user" placeholder="Email" />
                    <textarea  name="message" className="user" placeholder="message" />
                    <input type="submit" value="Send" className="button"/>
                    <span>{done && "Thanks for contacting me!"}</span>
                    <div className="blur" style={{
                                    background: "skyblue",
                                    top: "10rem",
                                    width: "21rem",
                                    height: "11rem",
                                    left: "-20rem",
                                }}
                    ></div>
                 </form>
                
                </div>
        </div>
    )
}