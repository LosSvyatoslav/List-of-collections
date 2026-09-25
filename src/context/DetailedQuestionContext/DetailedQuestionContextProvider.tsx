import { DetailedQuestionContext } from "./DetailedQuestionContext";
import type { ContextProps } from "../CollectionsContext/types";
import type { Question } from "../QuestionContext/types";
import { questionsApi } from "../QuestionContext/QuestionContextProvider";
import { useState, useEffect } from "react";
import type { Data } from "../CollectionsContext/types";
import axios from "axios";

const DetailedQuestionProvider = ({ children }: ContextProps) => {
  const [questionData, setQuestionData] = useState<Question | null>(null);
  const [navigationIds, setNavigationIds] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchNavigationQuestions() {
      try {
        const limit = 1000;

        const firstResponse = await questionsApi.get<Data<Question>>("", {
          params: {
            page: 1,
            limit,
          },
          signal: controller.signal,
        });

        const firstData = firstResponse.data;

        const totalPages = Math.ceil(firstData.total / limit);

        const requests = [];

        for (let page = 2; page <= totalPages; page++) {
          requests.push(
            questionsApi.get<Data<Question>>("", {
              params: {
                page,
                limit,
              },
              signal: controller.signal,
            }),
          );
        }

        const responses = await Promise.all(requests);

        const pages = [
          firstData,
          ...responses.map((response) => response.data),
        ];

        const navigationIds = pages.flatMap((page) =>
          page.data.map(({ id }) => id),
        );

        setNavigationIds(navigationIds);
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }
        setError("Не удалось загрузить вопрос");
      }
    }

    fetchNavigationQuestions();

    return () => controller.abort();
  }, []);

  async function getQuestionData(id: string) {
    setError(null);
    try {
      const response = await questionsApi.get<Question>(`/${id}`);
      setQuestionData(response.data);
    } catch (error) {
      setError("Ошибка при загрузке вопроса");
    }
  }
  return (
    <DetailedQuestionContext.Provider
      value={{ questionData, navigationIds, getQuestionData, error }}
    >
      {children}
    </DetailedQuestionContext.Provider>
  );
};

export default DetailedQuestionProvider;
