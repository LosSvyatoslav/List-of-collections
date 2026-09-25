import { useEffect, useState, useRef } from "react";
import { CollectionContext } from "./CollectionContext";
import type { Collection, Specialization, Data } from "./types";
import axios from "axios";
import useDebounce from "../../hooks/useDebounce";
import type { ContextProps } from "./types";

const collectionsApi = axios.create({
  baseURL: "https://api.yeatwork.ru/collections/public",
});

const specializationsApi = axios.create({
  baseURL: "https://api.yeatwork.ru/specializations",
});

const collectionByIdApi = axios.create({
  baseURL: "https://api.yeatwork.ru/collections",
});

const COLLECTIONS_LIMIT = 6;
export const SPECIALIZATIONS_LIMIT = 3;

const CollectionProvider = ({ children }: ContextProps) => {
  const [collectionsData, setCollectionsData] =
    useState<Data<Collection> | null>(null);
  const [specializationsData, setSpecializationsData] =
    useState<Data<Specialization> | null>(null);
  const [page, setPage] = useState(1);
  const [specializations, setSpecialization] = useState<number | null>(null);
  const [search, setSearch] = useState<string | null>(null);
  const [access, setAccess] = useState<boolean | null>(null);
  const [collectionData, setCollectionData] = useState<Collection | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [collectionLoading, setCollectionLoading] = useState(false);
  const [collectionError, setCollectionError] = useState<string | null>(null);

  const isFirstRender = useRef(true);

  const total = collectionsData?.total;
  const pagesCount = Math.ceil(total / COLLECTIONS_LIMIT);
  const debouncedValue = useDebounce(search, 300);

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

    setInitialLoading(true);
    setError(null);

    async function getInitialData() {
      try {
        const [collectionsResponse, specializationsResponse] =
          await Promise.all([
            collectionsApi.get<Data<Collection>>("", {
              params: {
                limit: COLLECTIONS_LIMIT,
                page: 1,
              },
              signal: controller.signal,
            }),

            specializationsApi.get<Data<Specialization>>("", {
              params: {
                limit: SPECIALIZATIONS_LIMIT,
              },
              signal: controller.signal,
            }),
          ]);

        setCollectionsData(collectionsResponse.data);
        setSpecializationsData(specializationsResponse.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }

        setError("Не удалось загрузить данные");
      } finally {
        if (!controller.signal.aborted) {
          setInitialLoading(false);
        }
      }
    }

    getInitialData();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const controller = new AbortController();

    setLoading(true);
    setError(null);

    async function getInitialData() {
      try {
        const [collectionsResponse, specializationsResponse] =
          await Promise.all([
            collectionsApi.get<Data<Collection>>("", {
              params: {
                limit: COLLECTIONS_LIMIT,
                page,
                specializations,
                titleOrDescriptionSearch: debouncedValue,
                isFree: access,
              },
              signal: controller.signal,
            }),

            specializationsApi.get<Data<Specialization>>("", {
              params: {
                limit: SPECIALIZATIONS_LIMIT,
              },
              signal: controller.signal,
            }),
          ]);

        setCollectionsData(collectionsResponse.data);
        setSpecializationsData(specializationsResponse.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }

        setError("Не удалось загрузить данные");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    getInitialData();

    return () => controller.abort();
  }, [page, specializations, debouncedValue, access]);

  async function getCollectionData(id: string) {
    setCollectionLoading(true);
    setCollectionError(null);
    try {
      const response = await collectionByIdApi.get<Collection>(`/${id}/public`);
      setCollectionData(response.data);
    } catch (error) {
      setCollectionError("Не удалось загрузить коллекцию");
    } finally {
      setCollectionLoading(false);
    }
  }

  async function getSpecializations(limit: number) {
    try {
      const response = await specializationsApi.get<Data<Specialization>>("", {
        params: {
          limit: limit,
        },
      });
      const data = response.data;
      setSpecializationsData(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <CollectionContext.Provider
      value={{
        collectionsData,
        specializationsData,
        pagesCount,
        page,
        collectionData,
        loading,
        initialLoading,
        error,
        collectionLoading,
        collectionError,
        getCollectionData,
        getSpecializations,
        handleNextPage,
        handleCurrentPage,
        handlePreviousPage,
        setSpecialization,
        setSearch,
        setAccess,
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
};

export default CollectionProvider;
