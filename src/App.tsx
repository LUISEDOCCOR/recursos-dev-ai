import { Routes, Route } from "react-router-dom";
import { ROUTE } from "./routes/routes";
import { HomePage } from "./pages/Home";
import { AddPage } from "./pages/Add";

function App() {
  return (
    <Routes>
      <Route path={ROUTE.home} element={<HomePage />} />
      <Route path={ROUTE.add} element={<AddPage />} />
    </Routes>
  );
}

export default App;
