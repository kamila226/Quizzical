export default function Result(props) {
  const { count, total } = props;
  let resultText;

  if (count === 0) {
    resultText = "No answer is correct :( Try again";
  } else if (count === total) {
    resultText = "All answers are correct! Congratulations!!!";
  } else {
    resultText = `You scored ${count}/${total} correct answers!`;
  }

  return <h3 className="result">{resultText}</h3>;
}
