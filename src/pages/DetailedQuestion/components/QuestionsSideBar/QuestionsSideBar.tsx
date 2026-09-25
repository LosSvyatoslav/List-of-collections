import styles from "./QuestionsSideBar.module.scss";
import Guru from "../../../../components/Guru/Guru";
import type { Skills } from "../../../../context/QuestionContext/types";
import figmaIcon from "../../../../logos and images/Figma.svg"

export interface QuestionSideBarProps {
  complexity: number;
  keywords: string[];
  rate: number;
  questionSkills: Skills[];
  username: string;
  handleCloseInfo?: () => void;
}

const QuestionsSideBar = ({
  complexity,
  rate,
  questionSkills,
  keywords,
  username,
}: QuestionSideBarProps) => {
  return (
    <div className={styles.info}>
      <div className={styles.section}>
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

      <Guru />
    </div>
  );
};

export default QuestionsSideBar;
