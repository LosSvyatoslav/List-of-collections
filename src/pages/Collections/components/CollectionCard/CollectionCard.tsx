import styles from "./CollectionCard.module.scss";
import type { Collection } from "../../../../context/CollectionsContext/types";
import { Link } from "react-router-dom";
import sberLogo from "../../../../logos and images/sberLogo.jpg";
import purpleStar from "../../../../logos and images/StarsPurple.svg";
import question from "../../../../logos and images/Question Square.svg";

const CollectionCard = ({
  id,
  isFree,
  keywords,
  specializations,
  tasksCount,
  description,
}: Collection) => {
  return (
    <li>
      <Link to={`/collections/${id}`} className={styles.card}>
        <img src={sberLogo} alt={description} className={styles.cardLogo} />
        <div className={styles.info}>
          <ul className={styles.keyWords}>
            {keywords.slice(0, 3).map((keyword) => (
              <li key={keyword} className={styles.keyWord}>
                {keyword}
              </li>
            ))}
          </ul>
          <h3 className={styles.description}>{description}</h3>
          <div className={styles.details}>
            <div>
              {isFree && <img src={purpleStar} alt="purple stars" />}
              <span>{isFree ? "Для всех" : "Для участников"}</span>
            </div>
            <div>
              <img src={question} alt="questions icon" />
              <span>{tasksCount} вопросов</span>
            </div>
          </div>
          <ul className={styles.specializations}>
            {specializations.map(({ title }) => (
              <li key={title}>{title}</li>
            ))}
          </ul>
        </div>{" "}
      </Link>
    </li>
  );
};

export default CollectionCard;
