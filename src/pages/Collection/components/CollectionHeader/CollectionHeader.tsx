import styles from "./CollectionHeader.module.scss";
import sberLogo from "../../../../logos and images/sberLogo.jpg";
import infoMobileIcon from "../../../../logos and images/Filter button.svg";
import CollectionInfoMobile from "../CollectionInfoMobile/CollectionInfoMobile";
import { useState, useContext } from "react";
import { CollectionContext } from "../../../../context/CollectionsContext/CollectionContext";

interface CollectionHeaderProps {
  description: string;
  title: string;
}

const CollectionHeader = ({ description, title }: CollectionHeaderProps) => {
  const { collectionData } = useContext(CollectionContext);
  const [isOpen, setIsOpen] = useState(false);
  const showInfoMobile = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className={styles.card}>
      <img src={sberLogo} alt="company logo" className={styles.logo} />
      <div className={styles.info}>
        <div className={styles.titleArea}>
          <span className={styles.title}>{title}</span>
          <button className={styles.mobileInfo} onClick={showInfoMobile}>
            <img src={infoMobileIcon} alt="info mobile icon" />
          </button>
        </div>
        {isOpen && (
          <CollectionInfoMobile
            collectionData={collectionData}
            showInfoMobile={showInfoMobile}
          />
        )}
        <span className={styles.description}>{description}</span>
      </div>
    </div>
  );
};

export default CollectionHeader;
