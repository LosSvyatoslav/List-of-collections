import { DetailedQuestionContext } from "./DetailedQuestionContext";
import type { ContextProps } from "../CollectionsContext/types";
import type { Question } from "../QuestionContext/types";
import { questionsApi } from "../QuestionContext/questionsApi";
import { useState, useEffect, useRef } from "react";
import type { Data } from "../CollectionsContext/types";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const DetailedQuestionProvider = ({ children }: ContextProps) => {
  const [questionData, setQuestionData] = useState<Question | null>(null);
  const [navigationIds, setNavigationIds] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const questionController = useRef<AbortController | null>(null);
  const [searchParams] = useSearchParams();
  const collectionId = searchParams.get("collection");
  const page = Number(searchParams.get("page"));

  useEffect(() => {
    if (!collectionId || !page) {
      return;
    }

    const controller = new AbortController();

    async function fetchNavigationQuestions() {
      try {
        const response = await questionsApi.get<Data<Question>>("", {
          params: {
            page,
            limit: 9,
            collection: collectionId,
            order: "ASC",
          },
          signal: controller.signal,
        });

        const navigationIds = response.data.data.map(({ id }) => id);

        setNavigationIds(navigationIds);
        setTotal(response.data.total);
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }

        setError("Не удалось загрузить вопросы");
      }
    }

    fetchNavigationQuestions();

    return () => controller.abort();
  }, [collectionId, page]);

  async function getQuestionData(id: string) {
    questionController.current?.abort();
    const controller = new AbortController();
    questionController.current = controller;
    setError(null);
    try {
      const response = await questionsApi.get<Question>(`/${id}`, {
        signal: controller.signal,
      });
      setQuestionData(response.data);
    } catch (error) {
      if (axios.isCancel(error)) {
        return;
      }
      setError("Не удалось загрузить вопрос");
    }
  }

  async function getNavigationPage(page: number) {
    if (!collectionId) {
      return [];
    }

    try {
      const response = await questionsApi.get<Data<Question>>("", {
        params: {
          page,
          limit: 9,
          collection: collectionId,
          order: "ASC",
        },
      });

      return response.data.data.map(({ id }) => id);
    } catch {
      setError("Не удалось загрузить вопросы");
      return [];
    }
  }
  return (
    <DetailedQuestionContext.Provider
      value={{
        questionData,
        navigationIds,
        getQuestionData,
        getNavigationPage,
        error,
        total,
      }}
    >
      {children}
    </DetailedQuestionContext.Provider>
  );
};

export default DetailedQuestionProvider;
