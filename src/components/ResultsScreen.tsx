export type ResultsType = {
  selectedAnswer: boolean;
  correctAnswer: boolean;
  question: string;
};

type ResultsScreenPropsType = {
  results: ResultsType[];
  onPlayAgain: () => void;
};

const ResultsScreen = ({ results, onPlayAgain }: ResultsScreenPropsType) => {
  const correctAnswers = results.filter(
    (result) => result.correctAnswer === result.selectedAnswer
  );
  return (
    <div className="result-screen">
      <div className="you-score">{`You score: ${correctAnswers.length} / ${results.length}`}</div>
      {results.map(({ question, selectedAnswer, correctAnswer }) => {
        const isCorrect = selectedAnswer === correctAnswer;
        return (
          <div key={question} className="nes-container is-rounded">
            <div dangerouslySetInnerHTML={{ __html: question }} />
            <div className={`nes-text is-${isCorrect ? "success" : "error"}`}>
              You marked: {selectedAnswer ? "True" : "False"}
            </div>
            <div>
              {" "}
              Correct Answer: <b>{correctAnswer ? "True" : "False"}</b>
            </div>
          </div>
        );
      })}
      <button
        type="button"
        className="nes-btn is-primary"
        onClick={onPlayAgain}
      >
        Play again?
      </button>
    </div>
  );
};

export default ResultsScreen;
