import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Library from "./pages/Library/Library";
import Recent from "./pages/Recent/Recent";
import Rankings from "./pages/Rankings/Rankings";
import NewMatch from "./pages/NewMatch/NewMatch";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Library />} />
        <Route path="/rankings" element={<Rankings />} />
        <Route path="/recent" element={<Recent />} />
        <Route path="/new-match/:gameId" element={<NewMatch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
