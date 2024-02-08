// Chargement des styles
import "./App.css";

// Import des packages
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Import des pages et composants
import CardsPage from "./Pages/CardsPage/CardsPage";
// import ComicsPage from "./Pages/ComicsPage/ComicsPage";
import Topnav from "./Components/Topnav/Topnav";

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Topnav />
        <Routes>
          <Route path="/" element={<Navigate to="/characters" replace />}></Route>
          <Route
            path="/characters"
            element={<CardsPage cardsType="characters" />}
          ></Route>
          <Route path="/comics" element={<CardsPage cardsType="comics" />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
