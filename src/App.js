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

  function startQuiz() {
    setWelcomeWindow(false);
    setFetchTrigger((prevState) => !prevState);
    setCheckMode(false);
  }

  function selectAnswer(questionId, answerId) {
    setQuestions((prevQuestions) => {
      const questions = [...prevQuestions];
      const questInd = questions.findIndex((quest) => quest.id === questionId);
      const questAnswers = questions[questInd].answers.map((ans) => ({
        ...ans,
        selected: ans.id === answerId,
      }));

      questions[questInd].answers = questAnswers;
      return questions;
    });
  }

  function checkAnswers() {
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
