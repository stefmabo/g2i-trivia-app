type TrueFalseButtonsPropsType = {
  onTrueFalse: (trueFalse: boolean) => () => void;
};

const TrueFalseButtons = ({ onTrueFalse }: TrueFalseButtonsPropsType) => (
  <div className="true-false-buttons">
    <button data-testid="true-btn" className="nes-btn is-success" onClick={onTrueFalse(true)}>True</button>
    <button data-testid="false-btn" className="nes-btn is-error" onClick={onTrueFalse(false)}>False</button>
  </div>
);

export default TrueFalseButtons;
