import { useContext } from "react";
import styles from "./Questions.module.scss";
import { QuestionContext } from "../../../../context/QuestionContext/QuestionContext";
import Loader from "../../../../components/Loader/Loader";
import Pagination from "../../../../components/Pagination/Pagination";
import QuestionCard from "../QuestionCard/QuestionCard";

const Questions = () => {

  const {
    questionsData,
    page,
    pagesCount,
    handleCurrentPage,
    handleNextPage,
    handlePreviousPage,
  } = useContext(QuestionContext);
  if (!questionsData) {
    return <Loader />;
  }

  const questions = questionsData.data;

  return (
    <div className={styles.questions}>
      <div>
        <h2 className={styles.title}>Вопросы React, JavaScripts</h2>
      </div>
      <ul className={styles.list}>
        {questions.map(
          ({ title, rate, imageSrc, shortAnswer, id, complexity }) => (
            <QuestionCard
              key={id}
              title={title}
              id={id}
              rate={rate}
              imageSrc={imageSrc}
              shortAnswer={shortAnswer}
              complexity={complexity}
            />
          ),
        )}
      </ul>
      <Pagination
        page={page}
        pagesCount={pagesCount}
        handleCurrentPage={handleCurrentPage}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
      />
    </div>
  );
};

export default Questions;
