
import { useState } from "react";

function AdminQuestions() {
  const [category, setCategory] = useState("aptitude");

  const [questions, setQuestions] = useState([
    {
      question: "",
      options: ["", "", "", ""],
      answer: "",
      explanation: "",
    },
  ]);

  const [message, setMessage] = useState("");

  // Add another question
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        options: ["", "", "", ""],
        answer: "",
        explanation: "",
      },
    ]);
  };

  // Remove a question
  const removeQuestion = (index) => {
    if (questions.length === 1) {
      return;
    }

    const updatedQuestions = questions.filter(
      (_, i) => i !== index
    );

    setQuestions(updatedQuestions);
  };

  // Update question text
  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];

    updatedQuestions[index].question = value;

    setQuestions(updatedQuestions);
  };

  // Update option
  const handleOptionChange = (
    questionIndex,
    optionIndex,
    value
  ) => {
    const updatedQuestions = [...questions];

    updatedQuestions[questionIndex].options[
      optionIndex
    ] = value;

    setQuestions(updatedQuestions);
  };

  // Update answer
  const handleAnswerChange = (index, value) => {
    const updatedQuestions = [...questions];

    updatedQuestions[index].answer = value;

    setQuestions(updatedQuestions);
  };

  // Update explanation
  const handleExplanationChange = (
    index,
    value
  ) => {
    const updatedQuestions = [...questions];

    updatedQuestions[index].explanation = value;

    setQuestions(updatedQuestions);
  };

  // Submit all questions
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    const admin = JSON.parse(
      localStorage.getItem("admin")
    );

    const questionsToSend = questions.map(
      (question) => ({
        ...question,
        category: category,
      })
    );

    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/questions",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            questions: questionsToSend,
            createdBy: admin?.username || "admin",
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);

        // Clear questions after successful posting
        setQuestions([
          {
            question: "",
            options: ["", "", "", ""],
            answer: "",
            explanation: "",
          },
        ]);
      } else {
        setMessage(data.message);
      }

    } catch (error) {
      console.error(
        "Question posting error:",
        error
      );

      setMessage(
        "Unable to connect to server"
      );
    }
  };

  return (
    <div>

      <h2>Post Questions</h2>

      {/* Category */}
      <div>
        <label>
          Question Category:
        </label>

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          <option value="aptitude">
            Aptitude
          </option>

          <option value="dsa">
            DSA
          </option>
        </select>
      </div>

      <br />

      <form onSubmit={handleSubmit}>

        {questions.map(
          (question, questionIndex) => (
            <div
              key={questionIndex}
              style={{
                border: "1px solid #ccc",
                padding: "20px",
                marginBottom: "20px",
              }}
            >

              <h3>
                Question {questionIndex + 1}
              </h3>

              {/* Question */}
              <textarea
                placeholder="Enter question"
                value={question.question}
                onChange={(e) =>
                  handleQuestionChange(
                    questionIndex,
                    e.target.value
                  )
                }
                rows="3"
                style={{
                  width: "100%",
                }}
                required
              />

              <br />
              <br />

              {/* Options */}
              {question.options.map(
                (option, optionIndex) => (
                  <input
                    key={optionIndex}
                    type="text"
                    placeholder={`Option ${
                      optionIndex + 1
                    }`}
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(
                        questionIndex,
                        optionIndex,
                        e.target.value
                      )
                    }
                    style={{
                      display: "block",
                      marginBottom: "10px",
                      width: "100%",
                    }}
                    required
                  />
                )
              )}

              {/* Correct answer */}
              <input
                type="text"
                placeholder="Correct answer"
                value={question.answer}
                onChange={(e) =>
                  handleAnswerChange(
                    questionIndex,
                    e.target.value
                  )
                }
                style={{
                  display: "block",
                  marginBottom: "10px",
                  width: "100%",
                }}
                required
              />

              {/* Explanation */}
              <textarea
                placeholder="Explanation (optional)"
                value={question.explanation}
                onChange={(e) =>
                  handleExplanationChange(
                    questionIndex,
                    e.target.value
                  )
                }
                rows="2"
                style={{
                  width: "100%",
                }}
              />

              <br />
              <br />

              {questions.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    removeQuestion(
                      questionIndex
                    )
                  }
                >
                  Remove Question
                </button>
              )}

            </div>
          )
        )}

        {/* Add question */}
        <button
          type="button"
          onClick={addQuestion}
        >
          + Add Question
        </button>

        <br />
        <br />

        {/* Submit */}
        <button type="submit">
          Post All Questions
        </button>

      </form>

      {message && (
        <p>{message}</p>
      )}

    </div>
  );
}

export default AdminQuestions;

