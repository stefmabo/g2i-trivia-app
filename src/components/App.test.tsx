import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

const mockQuestions = [
  {
    category: "History",
    type: "boolean",
    difficulty: "hard",
    question: "Japan was part of the Allied Powers during World War I.",
    correctAnswer: true,
  },
  {
    category: "General Knowledge",
    type: "boolean",
    difficulty: "hard",
    question:
      "&quot;Number 16 Bus Shelter&quot; was a child&#039;s name that was approved by the New Zealand government.",
    correctAnswer: true,
  },
  {
    category: "Mythology",
    type: "boolean",
    difficulty: "hard",
    question:
      "Rannamaari was a sea demon that haunted the people of the Maldives and had to be appeased monthly with the sacrifice of a virgin girl.",
    correctAnswer: true,
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "hard",
    question:
      "The IBM PC used an Intel 8008 microprocessor clocked at 4.77 MHz and 8 kilobytes of memory.",
    correctAnswer: false,
  },
  {
    category: "Science: Mathematics",
    type: "boolean",
    difficulty: "hard",
    question: "In Topology, the complement of an open set is a closed set.",
    correctAnswer: true,
  },
  {
    category: "Entertainment: Music",
    type: "boolean",
    difficulty: "hard",
    question:
      "Pete Townshend&#039;s solo album, &quot;White City: A Novel&quot;, is set in the metropolitan area of Chicago.",
    correctAnswer: false,
  },
  {
    category: "Entertainment: Japanese Anime & Manga",
    type: "boolean",
    difficulty: "hard",
    question:
      "In the &quot;To Love-Ru&quot; series, Peke is considered a female robot.",
    correctAnswer: true,
  },
  {
    category: "Geography",
    type: "boolean",
    difficulty: "hard",
    question:
      "The two largest ethnic groups of Belgium are Flemish and Walloon. ",
    correctAnswer: true,
  },
  {
    category: "Entertainment: Japanese Anime & Manga",
    type: "boolean",
    difficulty: "hard",
    question: "The character Plum from &quot;No Game No Life&quot; is a girl.",
    correctAnswer: false,
  },
  {
    category: "Entertainment: Video Games",
    type: "boolean",
    difficulty: "hard",
    question:
      "In &quot;Minecraft&quot;, gold tools are faster than diamond tools.",
    correctAnswer: true,
  },
];

jest.mock("../api", () => {
  const moduleMock = jest.requireActual("../api");

  return {
    ...moduleMock,
    fetchQuestions: () => Promise.resolve(mockQuestions),
  };
});

const renderHomeScreen = async () => {
  expect(screen.getByText(/...Loading/i)).toBeInTheDocument();
  await waitFor(() => {
    expect(
      screen.getByText(/Welcome to Trivial Challenge/i)
    ).toBeInTheDocument();
  });
};

const startAnswering = async () => {
  await waitFor(() => {
    screen.getByText(/Begin/i);
  });
  fireEvent.click(screen.getByText(/Begin/i));
  expect(
    screen.queryByText(/Welcome to Trivial Challenge/i)
  ).not.toBeInTheDocument();

  mockQuestions.forEach((_, index) => {
    fireEvent.click(screen.getByTestId(index > 4 ? "true-btn" : "false-btn"));
    expect(screen.getByTestId("count-progress").textContent).toBe(
      `${index + 1}/10`
    );
    expect(
      (screen.getByTestId("progress-bar") as HTMLProgressElement).value
    ).toBe(index + 1);
  });
};

const renderResultsPage = async () => {
  await waitFor(() => {
    expect(screen.getByTestId("you-score").textContent).toMatch(
      "You score: 4 / 10"
    );
  });
};

const startAgain = async () => {
  fireEvent.click(screen.getByText("Play again?"));
  await renderHomeScreen();
};

test("should behaves correctly", async () => {
  render(<App />);
  await renderHomeScreen();
  await startAnswering();
  await renderResultsPage();
  await startAgain();
});
