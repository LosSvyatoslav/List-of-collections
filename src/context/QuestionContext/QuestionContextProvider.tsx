import { useEffect, useState } from "react";
import { QuestionContext } from "./QuestionContext";
import type { Question } from "./types";
import type { Data } from "../CollectionsContext/types";
import axios from "axios";
import type { ContextProps } from "../CollectionsContext/types";

const QUESTIONS_LIMIT = 9;

export const questionsApi = axios.create({
  baseURL: "https://api.yeatwork.ru/questions/public-questions",
});

const QuestionProvider = ({ children }: ContextProps) => {
  const [questionsData, setQuestionsData] = useState<Data<Question> | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);

  const total = questionsData?.total;
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

  useEffect(() => {
    const controller = new AbortController();
    async function getQuestionsData() {
      setLoading(true);
      setError(null);
      try {
        const response = await questionsApi.get<Data<Question>>("", {
          params: {
            page,
            limit: QUESTIONS_LIMIT,
          },
          signal: controller.signal,
        });
        setQuestionsData(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }
        setError("Не удалось загрузить вопросы");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }
    getQuestionsData();
    return () => controller.abort();
  }, [page]);

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
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export default QuestionProvider;
