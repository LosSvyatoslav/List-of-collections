import styles from "./CollectionInfoMobile.module.scss";
import blackStar from "../../../../logos and images/StarsBlack.svg";
import sberLogo from "../../../../logos and images/sberLogo.jpg";
import tgLogo from "../../../../logos and images/Telegram purple.svg";
import type { Props } from "../../../../context/CollectionsContext/types";
import closeIcon from "../../../../logos and images/Close button.svg";

const CollectionInfoMobile = ({ collectionData, showInfoMobile }: Props) => {
  const { createdBy, isFree, keywords, specializations, tasksCount, title } =
    collectionData;
  return (
    <div className={styles.info}>
      <button className={styles.closeButton} onClick={showInfoMobile}>
        <img
          src={closeIcon}
          alt="close button icon"
          
        />
      </button>
      <div className={styles.details}>
        <span className={styles.title}>Специализация</span>
        <ul className={styles.list}>
          {specializations.map(({ id, title }) => (
            <li key={id} className={styles.item}>
              {title}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.details}>
        <span className={styles.title}>Доступ</span>
        <div className={styles.item}>
          {!isFree && <img src={blackStar} alt="black stars" />}
          <span>{isFree ? "Для всех" : "Для участников"}</span>
        </div>
      </div>

      <div className={styles.details}>
        <span className={styles.title}>Компания</span>
        <div className={styles.company}>
          <img src={sberLogo} alt="company logo" className={styles.logo} />
          <span>{title}</span>
        </div>
      </div>

      <div className={styles.details}>
        <span className={styles.title}>Количество вопросов</span>
        <span className={styles.tasksCount}>{tasksCount}</span>
      </div>

      <div className={styles.details}>
        <span className={styles.title}>Ключевые слова</span>
        <ul className={styles.list}>
          {keywords.map((keyword, index) => (
            <li key={index} className={styles.keyword}>
              #{keyword}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.author}>
        <span>
          Автор:{" "}
          <span className={styles.marked}>{createdBy?.username || "неизвестно"}</span>
        </span>
      </div>

      <div className={styles.telegram}>
        <img src={tgLogo} alt="telegram logo" />
        <span>
          Подпишись на <span className={styles.marked}>Python Developer</span> в
          Telegram
        </span>
      </div>
    </div>
  );
};

export default CollectionInfoMobile;
