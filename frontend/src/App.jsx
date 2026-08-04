import React from "react";

import UploadPDF from "./components/UploadPDF";
import ChatBox from "./components/ChatBox";

import "./App.css";


function App() {


   return (

    <div className="app">


      <div className="header">

        <h1>
          RAG Chatbot 🤖
        </h1>

        <p>
          Upload your PDF and chat with your documents using AI
        </p>

      </div>



      <UploadPDF />


      <ChatBox />


    </div>

  );

}


export default App;