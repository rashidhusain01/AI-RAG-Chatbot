import React, { useState } from "react";
import { uploadPDF } from "../services/api";


const UploadPDF = () => {


    const [file, setFile] = useState(null);

    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);

    const [uploaded, setUploaded] = useState(false);



    const handleUpload = async () => {


        if (!file) {

            setMessage("Please select a PDF file");

            return;

        }



        if(file.type !== "application/pdf"){

            setMessage("Only PDF files are allowed");

            return;

        }



        try {


            setLoading(true);

            setUploaded(false);

            setMessage("Uploading and processing PDF...");



            const response = await uploadPDF(file);



            setMessage(response.message);

            setUploaded(true);



        } 


        catch(error){


            console.log(error);

            setMessage("Upload failed");


            setUploaded(false);


        }


        finally{


            setLoading(false);


        }


    };




    return (


        <div className="upload-box">


            <h2>
                Upload Resume PDF
            </h2>



            <div className="file-area">


                <input

                    type="file"

                    accept="application/pdf"

                    onChange={(e)=>{

                        setFile(e.target.files[0]);

                        setMessage("");

                        setUploaded(false);

                    }}

                />


            </div>




            {
                file && (

                    <p className="file-name">

                        Selected: {file.name}

                    </p>

                )
            }





            <button

                onClick={handleUpload}

                disabled={loading}

            >

                {

                    loading

                    ? "Processing..."

                    : "Upload PDF"

                }


            </button>





            {
                message && (

                    <p className={uploaded ? "success" : "error"}>

                        {message}

                    </p>

                )
            }



        </div>


    );

};


export default UploadPDF;