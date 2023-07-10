import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Question from "./Question.js";
import he from "he";

export default function Questions(props) {
  const { questions, setQuestions, checkMode, fetchTrigger, selectAnswer } =
    props;
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        const fetchedQuestions = data.results.map((obj) => {
          const answers = shuffleArray([
            ...obj.incorrect_answers,
            obj.correct_answer,
          ]);
          const answersObjects = answers.map((ans) => ({
            id: nanoid(),
            answer: he.decode(ans),
          }));
          return {
            question: he.decode(obj.question),
            correctAnswer: he.decode(obj.correct_answer),
            answers: answersObjects,
            id: nanoid(),
          };
        });
        setQuestions(fetchedQuestions);
      });
  }, [fetchTrigger]);

  function shuffleArray(array) {
    let currentIndex = array.length;
    let randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
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
