import styles from "./QuestionsShortAnswer.module.scss";
import DOMPurify from "dompurify";

interface QuestionsShortAnswerProps {
  answer: string;
}

const QuestionsShortAnswer = ({ answer }: QuestionsShortAnswerProps) => {
  return (
    <div className={styles.section}>
      <span className={styles.answerTitle}>Короткий ответ</span>
      <div
        className={styles.answerText}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(answer),
        }}
      />
    </div>
  );
};

export default QuestionsShortAnswer;
