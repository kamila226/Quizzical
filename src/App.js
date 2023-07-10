import { useState, useEffect } from "react";
import Questions from "./Components/Questions";

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizStart, setStart] = useState(false);
  const [checkMode, setCheckMode] = useState(false);
  const [questions, setQuestions] = useState([
    {
      question: "",
      correctAnswer: "",
      answers: [
        {
          id: "",
          answer: "",
          selected: false,
          correct: false,
        },
      ],
      id: "",
    },
  ]);

  function startQuiz() {
    setStart((prevState) => !prevState);
    setQuizStarted(true);
  }

  function restart() {
    setCheckMode(false);
    setStart((prevState) => !prevState);
  }

  function checkAnswers() {
    setQuestions((prevQuestions) => {
      const questions = prevQuestions.map((question) => {
        const newAnswers = question.answers.map((ans) =>
          ans.answer === question.correctAnswer
            ? { ...ans, correct: true }
            : ans
        );
        return { ...question, answers: newAnswers };
      });
      return questions;
    });
    setCheckMode(true);
  }

  return (
    <main className="app">
      {quizStarted ? (
        <div className="questions--window">
          <Questions
            questions={questions}
            setQuestions={setQuestions}
            checkMode={checkMode}
            quizStart={quizStart}
          />
          <button onClick={checkMode ? restart : checkAnswers}>
            {checkMode ? "Play again" : "Check answers"}
          </button>
        </div>
      ) : (
        <div className="start--window">
          <h1>Quizzical</h1>
          <h3>Examine your knowledge</h3>
          <button onClick={startQuiz}>Start quiz</button>
        </div>
      )}
    </main>
  );
}

export default App;
