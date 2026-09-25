import { useContext, useEffect } from "react";
import Questions from "./components/Questions/Questions";
import { CollectionContext } from "../../context/CollectionsContext/CollectionContext";
import { useParams } from "react-router-dom";
import styles from "./Collection.module.scss";
import Loader from "../../components/Loader/Loader";
import CollectionInfo from "./components/CollectionInfo/CollectionInfo";
import Guru from "../../components/Guru/Guru";
import CollectionHeader from "./components/CollectionHeader/CollectionHeader";

const Collection = () => {
  const { collectionId } = useParams();
  const {
    collectionData,
    getCollectionData,
    collectionLoading,
    collectionError,
  } = useContext(CollectionContext);

  useEffect(() => {
    if (collectionId) {
      getCollectionData(collectionId);
    }
  }, [collectionId]);

  if (collectionLoading) {
    return <Loader />;
  }
  if (collectionError) {
    return <p>Не удалось загрузить коллекцию</p>;
  }
  if (!collectionData) {
    return <Loader />;
  }

  const { title, description } = collectionData;
  return (
    <section>
      <div className="container">
        <div className={styles.collection}>
          <div className={styles.leftSide}>
            <CollectionHeader title={title} description={description} />
            <Questions />
          </div>
          <div className={styles.rightSide}>
            <CollectionInfo collectionData={collectionData} />
            <Guru />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collection;
