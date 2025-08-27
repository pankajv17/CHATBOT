//import axios from "axios";
//mport { useEffect, useState } from "react";
import { useContext } from "react";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";

import { Responsecontext } from "../../Context/Responsecontext";
import chatbot from "../../assets/Male Call center Operator (1).gif";
import "./home.css";

export const Homepage=()=>{
    const{response,setresponse}=useContext(Responsecontext);
    console.log(response);

    const handleCopyText=(text)=>{
        navigator.clipboard.writeText(text);
        toast('copy text');
        console.log("copied text")
    }
    
    
    
    return(
        <>
        <div className="home">
        <div className="Home-container">
           {
            response.length>0 ? (
                <>
                {
                  response?.map((item)=>{
                    return(
                        <div key={item.query} className="chat-container">
                            <div className="query">{item.query}?</div>
                           { /* <div className="answer">{item.answer}</div> */}
                           <div className="answer">
                    <ReactMarkdown>{item.answer}</ReactMarkdown>
                  </div>

                            <div className="copy-btn">
                            <button className="copy" onClick={()=>handleCopyText(item.answer)}>Copy</button>
                           
                           
                            </div>
                        </div>
                    )
                  })
                }
                </>
                )
         : (
                <div className="img-container">
                    <img src={chatbot} alt = "chatbot img" className="image"/>\
                    <p className="glori-text">HOW CAN I HELP YOU !!</p>
                
                    </div>
            )
           }
        
          <h3> 
              
          </h3>
          </div>
        </div>
        </>
    )
}