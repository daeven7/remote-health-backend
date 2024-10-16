import { ChatGPTAPI } from "chatgpt";
import dotenv from 'dotenv';

dotenv.config();


const answer = async (question) => {
  const api = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY 
  });

  const prompt = `
                  I am sick and these are my symptoms: "${question}". 
                  Could you diagnose my sickess and tell me some otc drugs. Dont start with i am not a doctor, or based on your symptoms`;


  const res = await api.sendMessage(prompt);
  return res.text;
};

export default answer;