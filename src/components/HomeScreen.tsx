type HomeScreenPropsType = { onBegin: () => void; isLoadingData: boolean };

const HomeScreen = ({ onBegin, isLoadingData }: HomeScreenPropsType) => (
  <div className="home-screen">
    <div className="welcome">
      <b>Welcome to Trivial Challenge</b>
    </div>
    <p>
      You will be presented with 10{" "}
      <span className="nes-text is-success">True</span> and{" "}
      <span className="nes-text is-error">False</span> questions
    </p>
    <div className="can-you-score">
      Can you score 100%? <i className="nes-icon trophy is-medium"></i>
    </div>
    <button
      type="button"
      className={`nes-btn is-primary ${isLoadingData ? "is-disabled" : ""}`}
      onClick={isLoadingData ? undefined : onBegin}
    >
      {isLoadingData ? "...Loading" : "Beging"}
    </button>
  </div>
);

export default HomeScreen;
