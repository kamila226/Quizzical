import { useState, useEffect } from "react";
import Questions from "./Components/Questions";

function App() {
  const [welcomeWindow, setWelcomeWindow] = useState(true);
  const [fetchTrigger, setFetchTrigger] = useState(false);
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
  const [answers, setAnswers] = useState();

  function startQuiz() {
    setWelcomeWindow(false);
    setFetchTrigger((prevState) => !prevState);
    setCheckMode(false);
  }

  function selectAnswer(questionId, answerId) {
    setQuestions((prevQuestions) => {
      const questions = [...prevQuestions];
      const questionIndex = questions.findIndex(
        (quest) => quest.id === questionId
      );
      const answerIndex = questions[questionIndex].answers.findIndex(
        (ans) => ans.id === answerId
      );
      questions[questionIndex].answers.forEach((ans) => (ans.selected = false));
      questions[questionIndex].answers[answerIndex].selected = true;
      return questions;
    });
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
      {welcomeWindow ? (
        <div className="start--window">
          <h1>Quizzical</h1>
          <h3>Examine your knowledge</h3>
          <button onClick={startQuiz}>Start quiz</button>
        </div>
      ) : (
        <div className="questions--window">
          <Questions
            questions={questions}
            setQuestions={setQuestions}
            checkMode={checkMode}
            fetchTrigger={fetchTrigger}
            selectAnswer={selectAnswer}
          />
          <button onClick={checkMode ? startQuiz : checkAnswers}>
            {checkMode ? "Play again" : "Check answers"}
          </button>
        </div>
      )}
    </main>
  );
}

export default App;
