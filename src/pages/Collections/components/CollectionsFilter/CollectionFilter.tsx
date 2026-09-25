import styles from "./CollectionFilter.module.scss";
import blackStar from "../../../../logos and images/StarsBlack.svg";
import search from "../../../../logos and images/search.svg";
import { useContext, useState } from "react";
import { CollectionContext } from "../../../../context/CollectionsContext/CollectionContext";
import { SPECIALIZATIONS_LIMIT } from "../../../../context/CollectionsContext/CollectionContextProvider";

const access = [
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
  const [activeSpec, setIsActiveSpec] = useState<number | null>(null);
  const [activeAccess, setIsActiveAccess] = useState<number | null>(null);

  const {
    specializationsData,
    getSpecializations,
    setSpecialization,
    setAccess,
    setSearch,
  } = useContext(CollectionContext);
  const data = specializationsData?.data;
  const total = specializationsData?.total;

  const toggleShowAll = (): void => {
    setShowAll((prev) => !prev);
    if (!showAll && total) {
      getSpecializations(total);
    } else {
      getSpecializations(SPECIALIZATIONS_LIMIT);
    }
  };

  const handleSpecializationFilter = (id: number) => {
    setIsActiveSpec(id);
    setSpecialization(id);
  };
  const handleAccessFilter = (id: number) => {
    id === 0 ? setAccess(true) : setAccess(false);
    setIsActiveAccess(id);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
  };

  return (
    <div className={styles.filter}>
      <div className={styles.search}>
        <img src={search} alt="search icon" />
        <input
          type="text"
          placeholder="Введите запрос…"
          onChange={handleSearch}
        />
      </div>
      <div className={styles.specializations}>
        <span className={styles.text}>Cпециализация</span>
        <ul>
          {data &&
            data.map(({ title, id }) => (
              <li key={id}>
                <button
                  className={
                    activeSpec === id
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
        {showAll ? (
          <button onClick={toggleShowAll} className={styles.showAll}>
            <span>Скрыть</span>
          </button>
        ) : (
          <button onClick={toggleShowAll} className={styles.showAll}>
            <span>Посмотреть все</span>
          </button>
        )}
      </div>
      <div className={styles.access}>
        <span className={styles.text}>Доступ</span>
        <ul>
          {access.map(({ id, title, image }) => (
            <li className={styles.item} key={id}>
              <button
                className={
                  activeAccess === id
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
