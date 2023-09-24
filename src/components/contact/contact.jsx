import React from "react";
import"./contact.css"
// import emailjs from '@emailjs/browser';
import emailjs from 'emailjs-com';
import { useRef , useState} from "react";


export default function Contact(){

    const form = useRef();
    const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [message, setMessage] = useState('');

    const[done, setDone] = useState(false)
    const sendEmail = (e) => {
      e.preventDefault();
      console.log("Sending email...");
      emailjs.sendForm('service_nld2dpm', 'template_bw4bwam', form.current, 'GSpf5-RciM723EsF-')
        .then((result) => {
            console.log(result.text);
            setUserName('');
            setUserEmail('');
            setMessage('');
            setDone(true)
            alert("Ypur message sent successfully")
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
                    <input type="text"  name="user_name" className="user" placeholder="Name" value={userName}
                        onChange={(e) => setUserName(e.target.value)} />
                    <input type="email"  name="user_email" className="user" placeholder="Email"  value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)} />
                    <textarea  name="message"  className="user" placeholder="message"    value={message}
            onChange={(e) => setMessage(e.target.value)}/>
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