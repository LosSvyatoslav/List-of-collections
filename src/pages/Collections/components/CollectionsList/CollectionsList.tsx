import { CollectionContext } from "../../../../context/CollectionsContext/CollectionContext";
import styles from "./CollectionsList.module.scss";
import { useContext } from "react";
import Pagination from "../../../../components/Pagination/Pagination";
import filterIcon from "../../../../logos and images/Filter button.svg";
import { useState } from "react";
import CollectionsMobileFilter from "../CollectionsMobileFilter /CollectionsMobileFilter";
import CollectionCard from "../CollectionCard/CollectionCard";

const CollectionsList = () => {
  const {
    collectionsData,
    page,
    pagesCount,
    handleCurrentPage,
    handleNextPage,
    handlePreviousPage,
  } = useContext(CollectionContext);

  const [isOpen, setIsOpen] = useState(false);
  const collections = collectionsData?.data;

  const showFilter = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {collections && (
        <div className={styles.wrapper}>
          <div className={styles.title}>
            <h2>Коллекции</h2>
            <button onClick={showFilter} className={styles.mobileFilter}>
              <img src={filterIcon} alt="filter icon" />
            </button>
          </div>
          {isOpen && (
            <div className={styles.mobileButton}>
              <CollectionsMobileFilter showFilter={showFilter} />
            </div>
          )}
          <ul className={styles.cardList}>
            {collections.map(
              ({
                id,
                isFree,
                keywords,
                specializations,
                tasksCount,
                description,
              }) => (
                <CollectionCard
                  key={id}
                  id={id}
                  isFree={isFree}
                  keywords={keywords}
                  specializations={specializations}
                  tasksCount={tasksCount}
                  description={description}
                />
              ),
            )}
          </ul>
          <Pagination
            page={page}
            pagesCount={pagesCount}
            handleCurrentPage={handleCurrentPage}
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
          />
        </div>
      )}
    </>
  );
};

export default CollectionsList;
