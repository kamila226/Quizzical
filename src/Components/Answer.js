export default function (props) {
  return (
    <p
      key={props.answerId}
      className="answer"
      onClick={() =>
        !props.checkMode && props.selectAnswer(props.questionId, props.answerId)
      }
      style={props.style}
    >
      {props.answer}
    </p>
  );
}
