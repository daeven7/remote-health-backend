import { ChatGPTAPI } from "chatgpt";

const answer = async (question) => {
  const api = new ChatGPTAPI({
    // apiKey: process.env.OPENAI_API_KEY,
  });

  const res = await api.sendMessage(question);
  console.log(res.text);
};

export default answer;