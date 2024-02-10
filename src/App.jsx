// Chargement des styles
import "./App.css";

// Import des packages
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

// Import des hooks, pages et composants
import { FavoritesProvider } from "./Hooks/useFavorites";
import CardsPage from "./Pages/CardsPage/CardsPage";
import CharDetailsPage from "./Pages/CharDetailsPage/CharDetailsPage";
import Topnav from "./Components/Topnav/Topnav";

function App() {
  return (
    <Router>
      <FavoritesProvider>
        <div className="app-wrapper">
          <Topnav />
          <Routes>
            <Route path="/" element={<Navigate to="/characters" replace />}></Route>
            <Route
              path="/characters"
              element={<CardsPage cardsType="characters" />}
            ></Route>
            <Route path="/characters/:id" element={<CharDetailsPage />}></Route>
            <Route path="/comics" element={<CardsPage cardsType="comics" />}></Route>
          </Routes>
        </div>
      </FavoritesProvider>
    </Router>
  );
}

export default App;
