import { useState } from "react";
import useAPI, { UseAPIReturnType } from "../hooks/useAPI";
import { fetchQuestions, Question } from "../api";
import HomeScreen from "./HomeScreen";
import ResultsScreen, { ResultsType } from "./ResultsScreen";
import TrueFalseButtons from "./TrueFalseButtons";
import ProgresBar from "./ProgressBar";

type UseAPIFetchAnswersType = Omit<UseAPIReturnType, "data"> & {
  data: Question[];
};

const App = () => {
  const { data, fetch, isLoading }: UseAPIFetchAnswersType = useAPI({
    resource: fetchQuestions,
    isFetchOnInitialRender: true,
  });

  const [page, setPage] = useState<number>(0);
  const [results, setResults] = useState<ResultsType[]>([]);

  const questionPage = data[page - 1] || {};
  const { question: questionPageName } = questionPage;
  const isLastPage = page === data.length + 1;

  const handleNext = () => {
    setPage((page) => page + 1);
  };

  const handleTrueFalse = (trueFalse: boolean) => () => {
    setResults((results) => [
      ...results,
      {
        question: questionPageName,
        selectedAnswer: trueFalse,
        correctAnswer: questionPage.correctAnswer,
      },
    ]);
    handleNext();
  };

  const handlePlayAgain = () => {
    setPage(0);
    setResults([]);
    fetch();
  };

  return (
    <>
      {page > 0 && <ProgresBar dataLength={data.length} page={page} />}
      {isLastPage && (
        <ResultsScreen results={results} onPlayAgain={handlePlayAgain} />
      )}
      {!isLastPage && page === 0 && (
        <HomeScreen onBegin={handleNext} isLoadingData={isLoading} />
      )}
      {!isLastPage && page > 0 && (
        <>
          <div
            dangerouslySetInnerHTML={{ __html: questionPageName }}
            className="question nes-balloon from-left nes-pointer"
          />
          <TrueFalseButtons onTrueFalse={handleTrueFalse} />
        </>
      )}
    </>
  );
};

export default App;
