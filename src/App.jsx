// Chargement des styles
import "./App.css";

// Import des packages
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import des pages et composants
import CharactersPage from "./Pages/CharactersPage/CharactersPage";
import ComicsPage from "./Pages/ComicsPage/ComicsPage";
import Topnav from "./Components/Topnav/Topnav";

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Topnav />
        <Routes>
          <Route path="/" element={<CharactersPage />}></Route>
          <Route path="/comics" element={<ComicsPage />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
