import styles from "./QuestionCard.module.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import DOMPurify from "dompurify";
import dot from "../../../../logos and images/dot.svg";
import arrow from "../../../../logos and images/Chevrone_Down.svg";
import arrowRight from "../../../../logos and images/Arrow Right.svg";

const QuestionCard = ({
  title,
  id,
  rate,
  complexity,
  imageSrc,
  shortAnswer,
}) => {
  const [questionId, setQuestionId] = useState<number | null>(null);

  const showAnswer = (id: number) => {
    setQuestionId((prev) => (prev === id ? null : id));
  };
  return (
    <li className={styles.item}>
      <button onClick={() => showAnswer(id)}>
        <div className={styles.question}>
          <div className={styles.questionTitle}>
            <img src={dot} alt="items mark" className={styles.mark} />
            <span className={styles.questionText}>{title}</span>{" "}
          </div>
          <img
            src={arrow}
            alt="arrow"
            className={
              questionId === id
                ? `${styles.arrow} ${styles.rotate} `
                : `${styles.arrow}`
            }
          />
        </div>
      </button>
      <div
        className={`${styles.answer} ${questionId === id ? styles.answerOpen : ""}`}
      >
        <div className={styles.answerContent}>
          <div className={styles.grades}>
            <div className={styles.grade}>
              <span className={styles.gradeName}>Рейтинг: </span>
              <span className={styles.gradeNumber}>{rate}</span>
            </div>
            <div className={styles.grade}>
              <span className={styles.gradeName}>Сложность: </span>
              <span className={styles.gradeNumber}>{complexity}</span>
            </div>
          </div>
          {imageSrc && (
            <img
              src={imageSrc}
              alt="answers image"
              className={styles.answersImage}
            />
          )}
          <div
            className={styles.shortAnswer}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(shortAnswer),
            }}
          />
          <Link to={`/public-questions/${id}`} className={styles.showMore}>
            <span>Подробнее</span>
            <img src={arrowRight} alt="arrow right" />
          </Link>
        </div>
      </div>
    </li>
  );
};

export default QuestionCard;
