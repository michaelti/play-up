import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Library from "./pages/Library/Library";
import Recent from "./pages/Recent/Recent";
import Rankings from "./pages/Rankings/Rankings";
import NewMatch from "./pages/NewMatch/NewMatch";
import Nav from "./components/Nav/Nav";
import NewMatchPlayground from "./pages/NewMatchPlayground/NewMatchPlayground";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Library />} />
        <Route path="/rankings" element={<Rankings />} />
        <Route path="/recent" element={<Recent />} />
        <Route path="/new-match/:gameId" element={<NewMatch />} />
        <Route path="/new-match/" element={<NewMatchPlayground />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
