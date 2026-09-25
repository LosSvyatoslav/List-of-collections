import arrowBackIcon from "../../logos and images/Arrow Left.svg";
import styles from "./DetailedQuestion.module.scss";
import { useContext, useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import DetailedQuestionNavigation from "./components/DetailedQuestionNavigation/DetailedQuestionNavigation";
import { DetailedQuestionContext } from "../../context/DetailedQuestionContext/DetailedQuestionContext";
import QuestionsHeader from "./components/QuestionsHeader/QuestionsHeader";
import QuestionsShortAnswer from "./components/QuestionsShortAnswer/QuestionsShortAnswer";
import QuestionsSideBar from "./components/QuestionsSideBar/QuestionsSideBar";
import QuestionsLongAnswer from "./components/QuestionsLongAnswer/QuestionsLongAnswer";

const DetailedQuestion = () => {
  const { getQuestionData, questionData, error } = useContext(
    DetailedQuestionContext,
  );

  const { questionId } = useParams();
  const navigate = useNavigate();

  const handleBackBurronClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (questionId) {
      getQuestionData(questionId);
    }
  }, [questionId]);

  if (error) {
    return <p>Не удалось загрузить коллекцию</p>;
  }
  if (!questionData) {
    return <Loader />;
  }

  const {
    complexity,
    description,
    keywords,
    longAnswer,
    shortAnswer,
    rate,
    questionSkills,
    title,
    createdBy,
  } = questionData;

  const username = createdBy?.username;

  return (
    <section>
      <div className="container">
        <button className={styles.backButton} onClick={handleBackBurronClick}>
          <img src={arrowBackIcon} alt="arrow back icon" />
          <span>Назад</span>
        </button>

        <div className={styles.question}>
          <div className={styles.leftSide}>
            <QuestionsHeader title={title} description={description} />
            <DetailedQuestionNavigation />
            <QuestionsShortAnswer answer={shortAnswer} />
            <QuestionsLongAnswer answer={longAnswer} questionId={questionId} />
          </div>

          <QuestionsSideBar
            complexity={complexity}
            keywords={keywords}
            rate={rate}
            questionSkills={questionSkills}
            username={username}
          />
        </div>
      </div>
    </section>
  );
};

export default DetailedQuestion;
