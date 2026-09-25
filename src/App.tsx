import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import "./baseStyles/reset.css";
import "./baseStyles/index.css";

function App() {
  return (
      <RouterProvider router={router} />
  );
}

export default App;
