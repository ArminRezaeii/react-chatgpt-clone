import axios from "axios";

export const sendMessageToOpenAI = async (message) => {
  const config = {
    method: "post",
    url: "https://open-ai21.p.rapidapi.com/conversationgpt",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "c10dc39c47mshac97a12c05a665fp1a5816jsn5a70ee79f0a8",
      "X-RapidAPI-Host": "open-ai21.p.rapidapi.com",
    },
    data: {
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      web_access: false,
    },
  };

  try {
    const response = await axios(config);
    return response.data.result; 
  } catch (error) {
    console.error("Error sending request to OpenAI:", error);
    throw error; 
  }
};



