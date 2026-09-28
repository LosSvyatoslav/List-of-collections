import styles from "./CollectionFilter.module.scss";
import blackStar from "../../../../logos and images/StarsBlack.svg";
import searchIcon from "../../../../logos and images/search.svg";
import { useContext, useState } from "react";
import { CollectionContext } from "../../../../context/CollectionsContext/CollectionContext";
import { SPECIALIZATIONS_LIMIT } from "../../../../context/CollectionsContext/CollectionContextProvider";

const accesses = [
  {
    id: 1,
    title: "Для участников",
    image: blackStar,
  },
  {
    id: 0,
    title: "Для всех",
  },
];

const CollectionFilter = () => {
  const [showAll, setShowAll] = useState(false);

  const {
    specializationsData,
    specializations,
    search,
    access,
    setSpecialization,
    getSpecializations,
    setAccess,
    setSearch,
  } = useContext(CollectionContext);
  const data = specializationsData?.data;
  const total = specializationsData?.total;
  const visibleSpecializations = showAll
    ? data
    : data?.slice(0, SPECIALIZATIONS_LIMIT);

  const toggleShowAll = (): void => {
    if (!showAll && total && data?.length === SPECIALIZATIONS_LIMIT) {
      getSpecializations(total);
    }

    setShowAll((prev) => !prev);
  };

  const handleSpecializationFilter = (id: number) => {
    setSpecialization(id);
  };
  const handleAccessFilter = (id: number) => {
    if (id === 0) {
      setAccess(true);
    } else {
      setAccess(false);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
  };

  return (
    <div className={styles.filter}>
      <div className={styles.search}>
        <label htmlFor="collection-search">Поиск коллекций</label>
        <img src={searchIcon} alt="search icon" />
        <input
          id="collection-search"
          type="text"
          placeholder="Введите запрос…"
          onChange={handleSearch}
          value={search ?? ""}
        />
      </div>
      <div className={styles.specializations}>
        <span className={styles.text}>Cпециализация</span>
        <ul id="specializations-list">
          {visibleSpecializations?.map(({ title, id }) => (
            <li key={id}>
              <button
                className={
                  specializations === id
                    ? `${styles.button} ${styles.active}`
                    : styles.button
                }
                onClick={() => handleSpecializationFilter(id)}
              >
                {title}
              </button>
            </li>
          ))}
        </ul>
        {total &&
          total > SPECIALIZATIONS_LIMIT &&
          (showAll ? (
            <button
              aria-expanded={showAll}
              aria-controls="specializations-list"
              onClick={toggleShowAll}
              className={styles.showAll}
            >
              <span>Скрыть</span>
            </button>
          ) : (
            <button
              aria-expanded={showAll}
              aria-controls="specializations-list"
              onClick={toggleShowAll}
              className={styles.showAll}
            >
              <span>Посмотреть все</span>
            </button>
          ))}
      </div>
      <div className={styles.access}>
        <span className={styles.text}>Доступ</span>
        <ul>
          {accesses.map(({ id, title, image }) => (
            <li className={styles.item} key={id}>
              <button
                className={
                  (id === 0 ? access === true : access === false)
                    ? `${styles.button} ${styles.active}`
                    : styles.button
                }
                onClick={() => handleAccessFilter(id)}
              >
                {image && <img src={blackStar} alt="black stars" />}
                <span>{title}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CollectionFilter;
