import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Library from "./pages/Library/Library";
import Recent from "./pages/Recent/Recent";
import Rankings from "./pages/Rankings/Rankings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Library />} />
        <Route path="/rankings" element={<Rankings />} />
        <Route path="/recent" element={<Recent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
