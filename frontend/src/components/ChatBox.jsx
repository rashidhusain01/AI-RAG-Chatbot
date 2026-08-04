import Loader from "./Loader";
import Message from "./Message";
import React, { useState, useRef, useEffect } from "react";
import { askQuestion } from "../services/api";


const ChatBox = () => {


    const [question, setQuestion] = useState("");

    const [messages, setMessages] = useState([]);

    const [loading, setLoading] = useState(false);

    const messagesEndRef = useRef(null);



    useEffect(()=>{

        messagesEndRef.current?.scrollIntoView({
            behavior:"smooth"
        });

    },[messages]);



    const clearChat = () => {

        setMessages([]);

    };




    const sendMessage = async () => {


        if(!question.trim()){
            return;
        }



        const userMessage = {

            role:"user",

            text:question

        };



        setMessages(prev => [

            ...prev,

            userMessage

        ]);



        setQuestion("");

        setLoading(true);



        try{


            const response = await askQuestion(question);



            const botMessage = {

                role:"bot",

                text:
                response.answer ||
                response.error ||
                "No response received"

            };



            setMessages(prev => [

                ...prev,

                botMessage

            ]);



        }
        catch(error){


            console.log(error);



            setMessages(prev=>[

                ...prev,

                {

                    role:"bot",

                    text:"Something went wrong"

                }

            ]);

        }
        finally{

            setLoading(false);

        }


    };





    return (

        <div className="chat-container">



            <div className="chat-header">


                <div>

                    <h3>
                        AI Document Assistant 🤖
                    </h3>


                    <p>
                        Ask questions about your uploaded PDF
                    </p>

                </div>



                <button onClick={clearChat}>
                    Clear
                </button>


            </div>






            <div className="messages">



                {
                    messages.length === 0 && (

                        <div className="empty-chat">

                            Upload your PDF and start asking questions 🚀

                        </div>

                    )
                }




                {
                    messages.map((msg,index)=>(

                        <Message

                            key={index}

                            role={msg.role}

                            text={msg.text}

                        />

                    ))
                }





                {
                    loading && <Loader />
                }




                <div ref={messagesEndRef}></div>



            </div>






            <div className="chat-input">



                <input


                    type="text"


                    value={question}


                    onChange={(e)=>setQuestion(e.target.value)}


                    placeholder="Ask something about your PDF..."


                    onKeyDown={(e)=>{

                        if(e.key==="Enter"){

                            sendMessage();

                        }

                    }}


                />





                <button

                    onClick={sendMessage}

                    disabled={loading}

                >

                    {
                        loading 
                        ? "Thinking..."
                        : "Send"
                    }


                </button>



            </div>



        </div>

    );

};



export default ChatBox;