import express from "express";
import answer from "./helper.js";
import langchainAnswer from "./langchain_helper.js";
import cors from "cors";


const app = express();
app.use(express.json());
app.use(cors());


app.get("/health", function (req, res) {
  res.send("OK");
});


app.post("/answer", async function (req, res) {
  const { question } = req.body;

  if (!question) {
    return res.status(400).send("Question is required");
  }

  try {
    const response = await answer(question);
    res.send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching answer");
  }
});



app.post("/rag_answer", async function (req, res) {
  // const { question } = req.body;

  // if (!question) {
  //   return res.status(400).send("Question is required");
  // }

  // try {
  //   const response = await answer(question);
  //   res.send(response);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).send("Error fetching answer");
  // }
  const response = await langchainAnswer();
  res.send(response);

});


app.listen(3001, function () {
  console.log("listening on port 3001!");
});
