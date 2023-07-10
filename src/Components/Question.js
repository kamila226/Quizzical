import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import Answer from "./Answer";

export default function Question(props) {
  let style;
  let incorrect = {
    backgroundColor: "#F8BCBC",
    opacity: 0.6,
    border: "1px solid #F8BCBC",
  };
  let correct = {
    backgroundColor: "#94D7A2",
    border: "1px solid #94D7A2",
    color: "#293264",
  };
  let neutral = { opacity: 0.6 };
  const selected = { backgroundColor: "#d6dbf5" };

  const answersElements = props.answers.map((ans) => {
    if (props.checkMode) {
      if (ans.correct) {
        style = correct;
      } else {
        style = !ans.corect && ans.selected ? incorrect : neutral;
      }
    } else {
      style = ans.selected ? selected : {};
    }

    return (
      <Answer
        key={ans.id}
        answerId={ans.id}
        questionId={props.id}
        answer={ans.answer}
        selectAnswer={props.selectAnswer}
        style={style}
        checkMode={props.checkMode}
      />
    );
  });

  return (
    <div className="question--container">
      <h4 className="question">{props.question}</h4>
      {answersElements}
    </div>
  );
}
