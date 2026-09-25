import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Collections from "../pages/Collections/Collections";
import Collection from "../pages/Collection/Collection";
import DetailedQuestion from "../pages/DetailedQuestion/DetailedQuestion";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/collections" replace /> },
      {
        path: "collections",
        element: <Collections />,
      },
      {
        path: "collections/:collectionId",
        element: <Collection />,
      },
      {
        path: "public-questions/:questionId",
        element: <DetailedQuestion />,
      }
    ],
  },
]);
