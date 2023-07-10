import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Question from "./Question.js";
import he from "he";

export default function Questions(props) {
  const { questions, setQuestions } = props;
  const { checkMode, fetchTrigger, selectAnswer } = props;

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        const fetchedAnswers = data.results.map((obj) => {
          const answers = shuffleArray([
            ...obj.incorrect_answers,
            obj.correct_answer,
          ]);
          return answers.map((ans) => ({
            id: nanoid(),
            answer: he.decode(ans),
            selected: false,
            correct: ans === obj.correct_answer,
          }));
        });
        const fetchedQuestions = data.results.map((obj, i) => {
          return {
            id: nanoid(),
            question: he.decode(obj.question),
            answers: fetchedAnswers[i],
          };
        });
        setQuestions(fetchedQuestions);
      });
  }, [fetchTrigger]);

  function shuffleArray(array) {
    let currentIndex = array.length;
    let randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  const questionElements = questions.map((question) => (
    <Question
      key={question.id}
      id={question.id}
      question={question.question}
      answers={question.answers}
      selectAnswer={selectAnswer}
      checkMode={checkMode}
    />
  ));

  return questionElements;
}
