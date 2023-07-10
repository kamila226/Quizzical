import Answer from "./Answer";

export default function Question(props) {
  const answerElements = props.answers.map((ans) => {
    return (
      <Answer
        key={ans.id}
        answer={ans}
        questionId={props.id}
        selectAnswer={props.selectAnswer}
        checkMode={props.checkMode}
      />
    );
  });

  return (
    <div className="question--container">
      <h4 className="question">{props.question}</h4>
      {answerElements}
    </div>
  );
}
