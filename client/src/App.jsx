import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Library from "./pages/Library/Library";
import Recent from "./pages/Recent/Recent";
import Rankings from "./pages/Rankings/Rankings";
import Nav from "./components/Nav/Nav";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Library />} />
        <Route path="/rankings" element={<Rankings />} />
        <Route path="/recent" element={<Recent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
