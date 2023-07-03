const express = require('express');
const app = express();

app.use(express.json());

app.post('/chat', (req, res) => {
  const question = req.body.question;

  // Your logic to find the best matching question and retrieve the answer goes here

  const answer = "This is a sample answer.";

  res.json({ answer });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
