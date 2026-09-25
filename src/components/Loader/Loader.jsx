import CircularProgress from "@mui/material/CircularProgress";
import styles from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <CircularProgress />
    </div>
  );
};

export default Loader