import figmaLogo from "../../../../logos and images/FigmaImage.svg";
import styles from "./QuestionsHeader.module.scss";
import { useState } from "react";
import infoIcon from "../../../../logos and images/Meta button.svg";
import QuestionsSideBarMobile from "../QuestionsSideBarMobile/QuestionsSideBarMobile";

const QuestionsHeader = ({ title, description }) => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const handleCloseInfo = () => {
    setIsInfoOpen((prev) => !prev);
  };
  return (
    <>
    <div className={styles.section}>
      <img
        className={styles.questionLogo}
        src={figmaLogo}
        alt="question logo"
      />
      <div className={styles.questionText}>
        <div className={styles.titleArea}>
          <span className={styles.questionTitle}>{title}</span>
          <button className={styles.mobileInfo} onClick={handleCloseInfo}>
            <img src={infoIcon} alt="mobile info icon" />
          </button>
        </div>
        <span className={styles.questionDescription}>{description}</span>
      </div>
    </div>
            {isInfoOpen && (
          <QuestionsSideBarMobile handleCloseInfo={handleCloseInfo} />
        )}
    </>
    
  );
};

export default QuestionsHeader;
