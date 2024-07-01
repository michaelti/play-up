import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Rankings from "./pages/Rankings/Rankings";
import Nav from "./components/Nav/Nav";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/leaderboard" element={<Rankings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
