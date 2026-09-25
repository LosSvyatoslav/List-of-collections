import styles from "./QuestionsSideBarMobile.module.scss";
import figmaIcon from "../../../../logos and images/Figma.svg";
import closeButton from "../../../../logos and images/Close button.svg";
import { DetailedQuestionContext } from "../../../../context/DetailedQuestionContext/DetailedQuestionContext";
import { useContext } from "react";

const QuestionsSideBarMobile = ({ handleCloseInfo }) => {
  const context = useContext(DetailedQuestionContext);
  const questionData = context?.questionData;
  const {
    complexity,
    rate,
    questionSkills,
    keywords,
    createdBy: { username },
  } = questionData;

  return (
    <div className={styles.info}>
      <div className={styles.section}>
        <button className={styles.closeButton} onClick={handleCloseInfo}>
          <img src={closeButton} alt="close button" />
        </button>
        <div className={styles.details}>
          <span className={styles.title}>Уровень</span>
          <div className={styles.grades}>
            <div className={styles.grade}>
              <span className={styles.title}>Сложность:</span>
              <span className={styles.number}>{complexity}</span>
            </div>

            <div className={styles.grade}>
              <span className={styles.title}>Рейтинг:</span>
              <span className={styles.number}>{rate}</span>
            </div>
          </div>
        </div>
        <div className={styles.details}>
          <span className={styles.title}>Навыки</span>
          <ul className={styles.skills}>
            {questionSkills.map(({ id, title }) => (
              <li key={id} className={styles.skill}>
                <img src={figmaIcon} alt="skill icon" />
                <span>{title}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.details}>
          <span className={styles.title}>Ключевые слова</span>
          <ul className={styles.keywords}>
            {keywords.map((keyword) => (
              <li key={keyword} className={styles.keyword}>
                #{keyword}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.author}>
          <span className={styles.title}>Автор: </span>
          <span className={styles.marked}>{username || "неизвестно"}</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionsSideBarMobile;
