import { useCallback, useState } from "react";
import { QuestionContext } from "./QuestionContext";
import type { Question } from "./types";
import type { Data } from "../CollectionsContext/types";
import axios from "axios";
import type { ContextProps } from "../CollectionsContext/types";
import { questionsApi } from "./questionsApi";

const QUESTIONS_LIMIT = 9;

const QuestionProvider = ({ children }: ContextProps) => {
  const [questionsData, setQuestionsData] = useState<Data<Question> | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);

  const total = questionsData?.total ?? 0;
  const pagesCount = Math.ceil(total / QUESTIONS_LIMIT);

  function handleNextPage() {
    if (page !== pagesCount) {
      setPage((prev) => prev + 1);
    }
  }

  function handleCurrentPage(page: number) {
    setPage(page);
  }

  function handlePreviousPage() {
    if (page !== 1) {
      setPage((prev) => prev - 1);
    }
  }

  function resetPage() {
    setPage(1);
  }

  const getQuestionsData = useCallback(async (id: string, page: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await questionsApi.get<Data<Question>>("", {
        params: {
          page,
          collection: id,
          limit: QUESTIONS_LIMIT,
        },
      });
      setQuestionsData(response.data);
    } catch (error) {
      if (axios.isCancel(error)) {
        return;
      }
      setError("Не удалось загрузить вопросы");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <QuestionContext.Provider
      value={{
        questionsData,
        page,
        pagesCount,
        loading,
        error,
        handleNextPage,
        handleCurrentPage,
        handlePreviousPage,
        getQuestionsData,
        resetPage,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export default QuestionProvider;
