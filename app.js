import express from "express";
import answer from "./helper.js";
// import dotenv from 'dotenv';

// dotenv.config();

const app = express();

app.get("/health", function (req, res) {
  res.send("OK");
});

// app.get("/answer", async function (req, res) {
//   try {
//     const response = await answer(); // Wait for the API response
//     res.send(response); // Send the response to the client
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error fetching answer");
//   }
// });

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

app.post("/answerAdvanced", async function (req, res) {
  const { state, village, country, question } = req.body; // Extract state, village, country, and question from the body

  // Check if all required fields are provided
  if (!state || !village || !country || !question) {
    return res
      .status(400)
      .send("All fields (state, village, country, and question) are required.");
  }


  try {
    const response = await answer(state, village, country, question);
    res.send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching answer");
  }
});

app.listen(3000, function () {
  console.log("listening on port 3000!");
});
