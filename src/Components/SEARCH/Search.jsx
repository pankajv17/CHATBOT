import axios from "axios";
import { useContext, useState } from "react";
import { FiMic } from 'react-icons/fi';
import { IoSendSharp } from "react-icons/io5";

import { Responsecontext } from "../../Context/Responsecontext";
import loadingimg from "../../assets/load.gif";
import "./serach.css";

export const Search=()=>{

    const [searchTerm,setsearchTerm]=useState("");
    const [loading,setloading]=useState(false);
    const{response,setresponse}= useContext(Responsecontext);
    

    const handleChange=(e)=>{
        setsearchTerm(e.target.value);
    } 

    const sendData=async()=>{
        try{
            const res=await axios.post("https://chatbot-backend-0hmv.onrender.com",{searchTerm})
            console.log(res.data);
            setresponse(pre=>{
                return[...response,{ answer: res.data,query:searchTerm}]
            });
            setloading(false);

        } catch(error){
            setloading(false);
            console.log(error)
        }
    }


    const handlesubmit=(e)=>{
        e.preventDefault();
        setloading(true);
        sendData();
    }
    //input voice recognition
    const startVoiceRecognition = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
          alert("Speech recognition is not supported in this browser.");
          return;
        }
    
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = "en-US";
    
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setsearchTerm(transcript);
          // Optional: trigger search automatically after voice input
          setloading(true);
          sendData();
        };
    
        recognition.onerror = (event) => {
          console.error("Voice recognition error:", event.error);
        };
    
        recognition.start();
      };

       return(
        <>
    
        <div className="conatiner"> 
            <form className="form-container" onSubmit={handlesubmit}>
            
            <input
            type="text"
            name="searchTerm"
            placeholder="Feel free to ask anything"
            
            className="search-input"
            
            onChange={handleChange}
            value={searchTerm}
            
            />
            <button type="button" className="sumbitt" onClick={startVoiceRecognition}>
        <FiMic size={25} />
      </button>
             
           {
            !loading?  (<button type="Submit" disabled={loading}>
            <IoSendSharp size={24}></IoSendSharp>
        </button>) : (
            <div className="imgg">
                <img src={loadingimg} alt="loasingimg"/>
            </div>
        )
           }
            </form>
            
        </div>
        

        
        
        </>
    )
}