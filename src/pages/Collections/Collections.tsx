import CollectionFilter from "./components/CollectionsFilter/CollectionFilter";
import CollectionsList from "./components/CollectionsList/CollectionsList";
import styles from "./Collections.module.scss";
import Loader from "../../components/Loader/Loader";
import { useContext } from "react";
import { CollectionContext } from "../../context/CollectionsContext/CollectionContext";

const Collections = () => {
  const { initialLoading, error } = useContext(CollectionContext);
  if (initialLoading) return <Loader />;
  if (error) return <p>Что-то пошло не так</p>;
  return (
    <div className="container">
      <section className={styles.section}>
        <CollectionsList />
        <div className={styles.filter}>
          <CollectionFilter />
        </div>
      </section>
    </div>
  );
};

export default Collections;
