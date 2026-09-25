import arrowBack from "../../logos and images/Arrow_left_btn.svg";
import arrowForword from "../../logos and images/Arrow_right-btn.svg";
import styles from "./Pagination.module.scss";
import dots from "../../logos and images/dots.svg";

interface Props {
  page: number;
  pagesCount: number;
  handleNextPage: () => void;
  handleCurrentPage: (page: number) => void;
  handlePreviousPage: () => void;
}

const Pagination = ({
  page,
  pagesCount,
  handleNextPage,
  handleCurrentPage,
  handlePreviousPage,
}: Props) => {
  let pages;
  if (pagesCount <= 7) {
    pages = Array.from({ length: pagesCount }, (_, index) => index + 1);
  } else if (page <= 5) {
    pages = [1, 2, 3, 4, 5, 6, dots, pagesCount];
  } else if (page >= 6 && page < pagesCount - 2) {
    pages = [
      1,
      dots,
      page - 3,
      page - 2,
      page - 1,
      page,
      page + 1,
      page + 2,
      dots,
      pagesCount,
    ];
  } else {
    pages = [
      1,
      dots,
      pagesCount - 4,
      pagesCount - 3,
      pagesCount - 2,
      pagesCount - 1,
      pagesCount,
    ];
  }

  return (
    <div className={styles.pagination}>
      <button
        className={styles.button}
        onClick={handlePreviousPage}
        disabled={page === 1}
      >
        <img src={arrowBack} alt="arrow left" />
      </button>
      {pages.map((item, i) =>
        item === dots ? (
          <span key={i}>
            <img src={dots} alt="dots" />
          </span>
        ) : (
          <button
            className={
              page === item ? `${styles.page} ${styles.active} ` : styles.page
            }
            key={i}
            onClick={() => handleCurrentPage(item)}
          >
            {item}
          </button>
        ),
      )}
      <button
        className={styles.button}
        onClick={handleNextPage}
        disabled={page === pagesCount}
      >
        <img src={arrowForword} alt="arrow riight" />
      </button>
    </div>
  );
};

export default Pagination;
