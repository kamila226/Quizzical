export default function Answer(props) {
  const { answer, questionId, selectAnswer, checkMode } = props;
  let style;
  const incorrect = {
    backgroundColor: "#F8BCBC",
    opacity: 0.6,
    border: "1px solid #F8BCBC",
  };
  const correct = {
    backgroundColor: "#94D7A2",
    border: "1px solid #94D7A2",
    color: "#293264",
  };
  const neutral = { opacity: 0.6 };
  const selected = {
    backgroundColor: "#d6dbf5",
    border: "1px solid #d6dbf5",
  };

  if (checkMode) {
    if (answer.correct) {
      style = correct;
    } else {
      style = answer.selected ? incorrect : neutral;
    }
  } else {
    style = answer.selected ? selected : {};
  }

  return (
    <p
      key={props.answer.id}
      className="answer"
      onClick={() => !checkMode && selectAnswer(questionId, answer.id)}
      style={style}
    >
      {answer.answer}
    </p>
  );
}
