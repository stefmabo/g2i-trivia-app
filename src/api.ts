type FetchAnswerResponseType = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_anwers: string[];
};

export type Question = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correctAnswer: boolean;
};

export const fetchQuestions = async (): Promise<Question[]> => {
  const response = await fetch(
    "https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean"
  );
  const json = await response.json();
  return json.results.map(
    ({
      category,
      type,
      difficulty,
      question,
      correct_answer,
    }: FetchAnswerResponseType): Question => ({
      category,
      type,
      difficulty,
      question,
      correctAnswer: correct_answer === "True",
    })
  );
};
