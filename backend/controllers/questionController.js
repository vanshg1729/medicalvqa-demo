const Question = require('../models/questionModel')
const Image = require('../models/imageModel');
const User = require('../models/userModel');

// Controller function to get all questions
// @Status: Completed
// @params: {}
// @body: {}
const getAllQuestions = async (req, res) => {
    try {
      const questions = await Question.find();
      res.json({ questions });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller function to get a question by ID
// @Status: Completed
// @params: {}
// @body: {}
const getQuestionById = async (req, res) => {
    const questionId = req.params.id; // The question ID is in the URL parameter
  
    try {
      const question = await Question.findById(questionId);
  
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
  
      res.json({ question });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller function to create a new question
// @Status: Completed
// @params: {}
// @body: {questionText, answerText}
const createQuestion = async (req, res) => {
    console.log("Inside createQuestion")
    const { questionText, answerText } = req.body;
    const userId = req.user
  
    try {
      // check if the user exists
      const user = await User.findById(userId)

      if (!user) {
        return res.status(404).json({message: "User not found"})
      }

      const newQuestion = new Question({
        questionText,
        answerText,
        user: userId, // Associate the question with the user
      });
  
      const savedQuestion = await newQuestion.save();
  
      res.status(201).json(savedQuestion);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller function to delete a question by ID
const deleteQuestionById = async (req, res) => {
  const questionId = req.params.questionId;

  try {
    // Find the question by ID
    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Remove the question from the Questions database
    await Question.findByIdAndDelete(questionId);

    // Remove references to the question from the images in the Images database
    await Image.updateMany({ questions: questionId }, { $pull: { questions: questionId } });

    // Remove references to the question from the users in the Users database
    await User.updateMany({ questions: questionId }, { $pull: { questions: questionId } });

    res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller function to edit a question by ID
// @params: {questionId}
// @body: {questionText, answerText}
const editQuestion = async (req, res) => {
  const questionId = req.params.questionId;
  const { questionText, answerText } = req.body;

  try {
    // Find the question by ID
    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Update the question with new text
    question.questionText = questionText || question.questionText;
    question.answerText = answerText || question.answerText;

    // Save the updated question to the Questions database
    const updatedQuestion = await question.save();

    res.json({ message: 'Question edited successfully', updatedQuestion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
    getAllQuestions,
    getQuestionById,
    createQuestion,
    deleteQuestionById,
    editQuestion
}