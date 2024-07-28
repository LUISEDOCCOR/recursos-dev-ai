import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@fontsource-variable/dm-sans";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
