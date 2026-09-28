import styles from "./DetailedQuestionNavigation.module.scss";
import arrowLeftBlack from "../../../../logos and images/Arrow Left Black.svg";
import arrowRightBlack from "../../../../logos and images/Arrow Right Black.svg";
import { useContext } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { DetailedQuestionContext } from "../../../../context/DetailedQuestionContext/DetailedQuestionContext";

const DetailedQuestionNavigation = () => {
  const { navigationIds, total, getNavigationPage } = useContext(
    DetailedQuestionContext,
  );
  const { questionId } = useParams();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page"));
  const collectionId = searchParams.get("collection");
  const limit = 9;
  const pagesCount = Math.ceil(total / limit);

  const currentIndex = navigationIds.findIndex(
    (id) => id === Number(questionId),
  );

  const isFirstQuestion = currentIndex === 0;
  const isLastOnPage = currentIndex === navigationIds.length - 1;

  const navigate = useNavigate();

  const handleNextQuestion = async () => {
    if (currentIndex < navigationIds.length - 1) {
      navigate(
        `/public-questions/${navigationIds[currentIndex + 1]}?collection=${collectionId}&page=${page}`,
      );
      return;
    }

    if (page < pagesCount) {
      const nextPageIds = await getNavigationPage(page + 1);
      const nextQuestionId = nextPageIds[0];

      if (nextQuestionId) {
        navigate(
          `/public-questions/${nextQuestionId}?collection=${collectionId}&page=${page + 1}`,
        );
      }
    }
  };

  const handlePreviousQuestion = async () => {
    if (currentIndex > 0) {
      navigate(
        `/public-questions/${navigationIds[currentIndex - 1]}?collection=${collectionId}&page=${page}`,
      );
      return;
    }

    if (page > 1) {
      const previousPageIds = await getNavigationPage(page - 1);
      const previousQuestionId = previousPageIds[previousPageIds.length - 1];

      if (previousQuestionId) {
        navigate(
          `/public-questions/${previousQuestionId}?collection=${collectionId}&page=${page - 1}`,
        );
      }
    }
  };
  return (
    <div className={styles.nav}>
      <div className={styles.buttons}>
        <button
          className={styles.navButton}
          onClick={handlePreviousQuestion}
          disabled={isFirstQuestion && page <= 1}
        >
          <img src={arrowLeftBlack} alt="arrow left" />
          <span className={styles.title}>Предыдущий</span>
        </button>
        <button
          className={styles.navButton}
          onClick={handleNextQuestion}
          disabled={isLastOnPage && page >= pagesCount}
        >
          <span className={styles.title}>Следующий</span>
          <img src={arrowRightBlack} alt="arrow right" />
        </button>
      </div>
    </div>
  );
};

export default DetailedQuestionNavigation;
