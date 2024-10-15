import { ChatGPTAPI } from "chatgpt";

const answer = async (state, village, country, question) => {
  const api = new ChatGPTAPI({
    // apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = `I am a resident the state of ${state}, village of ${village}, country of ${country}, 
                  I am sick and this is my question and my symptoms: "${question}". Could you diagnose my sickess and also tell me which 
                  is the nearest hospital/doctor that i can go to for help based on my location?`;


  const res = await api.sendMessage(question); of
  console.log(res.text);
};

export default answer;