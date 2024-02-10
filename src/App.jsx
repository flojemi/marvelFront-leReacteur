// Chargement des styles
import "./App.css";

// Import des packages
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// Import des hooks personnalisés
import { FavoritesProvider } from "./Hooks/useFavorites";
// Import des pages
import CardsPage from "./Pages/CardsPage/CardsPage";
import CharDetailsPage from "./Pages/CharDetailsPage/CharDetailsPage";
import FavoritesPage from "./Pages/FavoritesPage/FavoritesPage";
// Import des composants
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
            <Route path="/favorites" element={<FavoritesPage />}></Route>
          </Routes>
        </div>
      </FavoritesProvider>
    </Router>
  );
}

export default App;
