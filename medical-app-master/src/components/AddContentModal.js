import React, { useState } from 'react';
import './AddContentModal.css'; // Import your CSS file for styling

const AddContentModal = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [tags, setTags] = useState([]);
  const [questions, setQuestions] = useState([]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleTagChange = (e, index) => {
    const updatedTags = [...tags];
    updatedTags[index] = e.target.value;
    setTags(updatedTags);
  };

  const handleQuestionChange = (e, index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (e, index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].answer = e.target.value;
    setQuestions(updatedQuestions);
  };

  const addTag = () => {
    setTags([...tags, '']);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', answer: '' }]);
  };

  return (
    <div>
      <button onClick={openModal} className="open-modal-btn">
        Add Content
      </button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add Content</h2>

            {/* Tags */}
            <div>
              <h3>Tags</h3>
              {tags.map((tag, index) => (
                <input
                  key={index}
                  type="text"
                  value={tag}
                  onChange={(e) => handleTagChange(e, index)}
                  placeholder="Tag"
                  className="input-field"
                />
              ))}
              <button onClick={addTag} className="add-btn">
                Add Tag
              </button>
            </div>

            {/* Questions and Answers */}
            <div>
              <h3>Questions and Answers</h3>
              {questions.map((qa, index) => (
                <div key={index} className="qa-container">
                  <input
                    type="text"
                    value={qa.question}
                    onChange={(e) => handleQuestionChange(e, index)}
                    placeholder="Question"
                    className="input-field"
                  />
                  <input
                    type="text"
                    value={qa.answer}
                    onChange={(e) => handleAnswerChange(e, index)}
                    placeholder="Answer"
                    className="input-field"
                  />
                </div>
              ))}
              <button onClick={addQuestion} className="add-btn">
                Add Question
              </button>
            </div>

            <button onClick={closeModal} className="close-btn">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddContentModal;
