import styles from "./QuestionsLongAnswer.module.scss";
import DOMPurify from "dompurify";
import { useEffect, useState, useRef } from "react";
import arrowDown from "../../../../logos and images/Chevrone_Down.svg";

interface QuestionsLongAnswerProps {
  questionId: string;
  answer: string;
}

const QuestionsLongAnswer = ({
  answer,
  questionId,
}: QuestionsLongAnswerProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const answerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsExpanded(false);
  }, [questionId]);

  useEffect(() => {
    const element = answerRef.current;

    if (!element) return;

    setIsOverflowing(element.scrollHeight > 785);
  }, [answer]);

  const handleExpand = () => {
    setIsExpanded((prev) => !prev);
  };
  return (
    <div
      className={`${styles.section} ${isExpanded ? styles.expanded : ""} ${isOverflowing ? styles.overflowing : ""}`}
    >
      <span className={styles.answerTitle}>Развёрнутый ответ</span>
      <div
        ref={answerRef}
        className={styles.answerText}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(answer),
        }}
      />{" "}
      {isOverflowing && (
        <button className={styles.expandButton} onClick={handleExpand}>
          <span>{isExpanded ? "Свернуть" : "Развернуть"}</span>
          <img src={arrowDown} alt="arrow down" />
        </button>
      )}
    </div>
  );
};

export default QuestionsLongAnswer;
