import { useState } from "react";
import { Toaster } from 'react-hot-toast';
import { Homepage } from "./Components/HOME/Homepage";
import { Search } from "./Components/SEARCH/Search";
import { Header } from "./Components/header/Header";
import { Responsecontext } from "./Context/Responsecontext";
import './App.css';

export const App=()=>{
  const [response,setresponse]=useState([]);
  return(
    <>
    <Header/>
    <Toaster/>
    <Responsecontext.Provider value ={{response,setresponse}}>
    <Homepage/>
    <Search/>
    </Responsecontext.Provider>
    </>
  )
}