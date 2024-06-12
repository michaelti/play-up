import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Library from "./pages/Library/Library";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Library />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
