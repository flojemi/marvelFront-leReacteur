// Chargement des styles
import "./App.css";

// Import des packages
import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

// Import des hooks, pages et composants
import { FavoritesProvider, useFavorites } from "./Hooks/FavoritesContext";
import CardsPage from "./Pages/CardsPage/CardsPage";
import CharDetailsPage from "./Pages/CharDetailsPage/CharDetailsPage";
import Topnav from "./Components/Topnav/Topnav";

function App() {
  // Permet de charger les favoris qui sont stockés dans un cookie
  useContext(() => {
    // const { favorites, addFavorite } = useFavorites;
    const cookiedFavorites = Cookies.get("marvel-favorites");
    console.log(cookiedFavorites);
  }, []);

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
