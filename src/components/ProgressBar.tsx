type ProgresBarPropsType = {
  page: number;
  dataLength: number;
};

const ProgresBar = ({ page, dataLength }: ProgresBarPropsType) => (
  <div className="progress-bar">
    <span data-testid="count-progress">{`${page - 1}/${dataLength}`}</span>
    <progress data-testid="progress-bar" className="nes-progress" value={page - 1} max={dataLength} />
  </div>
);

export default ProgresBar;
