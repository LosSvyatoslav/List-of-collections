import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./Layout.module.scss";
import CollectionProvider from "../../context/CollectionsContext/CollectionContextProvider";
import QuestionProvider from "../../context/QuestionContext/QuestionContextProvider";
import DetailedQuestionProvider from "../../context/DetailedQuestionContext/DetailedQuestionContextProvider";
const Layout = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <CollectionProvider>
          <QuestionProvider>
            <DetailedQuestionProvider>
              <Outlet />
            </DetailedQuestionProvider>
          </QuestionProvider>
        </CollectionProvider>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
