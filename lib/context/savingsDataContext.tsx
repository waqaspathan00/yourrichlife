import React, { createContext, useState } from "react";

/**
 * Hold data the user is currently entering into inputs, regarding quizzes
 * These state variables are different from the ones used to be displayed to the screen on the host dashboard.
 */
export const QuizDataEntryContext = createContext<QuizDataEntryContextProps>({
    quizDataEntry: "",
    setQuizDataEntry: () => {},
    quizTypeEntry: QuizType.NONE,
    setQuizTypeEntry: () => {},
    numberOfQuestionsEntry: 3,
    setNumberOfQuestionsEntry: () => {}
});

export const QuizDataEntryProvider = ({ children }: QuizDataProviderProps) => {
    const [quizDataEntry, setQuizDataEntry] = useState("");
    const [quizTypeEntry, setQuizTypeEntry] = useState(QuizType.NONE);
    const [numberOfQuestionsEntry, setNumberOfQuestionsEntry] = useState(3);

    return (
        <QuizDataEntryContext.Provider
            value={{
                quizTypeEntry,
                setQuizTypeEntry,
                quizDataEntry,
                setQuizDataEntry,
                numberOfQuestionsEntry,
                setNumberOfQuestionsEntry
            }}
        >
            {children}
        </QuizDataEntryContext.Provider>
    );
};



export const SavingsDataContext = createContext<SavingsDataContextProps>({

    totalSavings: 0,
    setTotalSavings: () => {},
    savingsGoals: [],
    setSavingsGoals: () => {},


}