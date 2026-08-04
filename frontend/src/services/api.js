const API_URL = import.meta.env.VITE_API_URL;

console.log(API_URL);


// Upload PDF
export const uploadPDF = async (file) => {

    const formData = new FormData();

    formData.append(
        "file",
        file
    );


    const response = await fetch(
    `${API_URL}/upload`,
    {
        method: "POST",
        body: formData
    }
);

if (!response.ok) {

    const error = await response.text();

    throw new Error(error);

}

return await response.json();

};




// Chat Question
export const askQuestion = async (question) => {


    const response = await fetch(
        `${API_URL}/chat`,
        {
            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body: JSON.stringify({
                question: question
            })

        }
    );


    return await response.json();

};