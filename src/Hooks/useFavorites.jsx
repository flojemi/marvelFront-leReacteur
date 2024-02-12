import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

// Contexte lié aux favoris pour éviter le props drilling
const FavoritesContext = createContext();
export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  // Modèle inscris en cookie
  let favoritesArr = [{ characters: [] }, { comics: [] }];

  // Setup states
  const [favorites, setFavorites] = useState(favoritesArr);

  // ================================================================= \\
  // ======== Fonction qui permet d'initialiser les favoris ========== \\
  // ================================================================= \\
  const initFavoritesFromCookie = () => {
    const cookie = Cookies.get("marvel-favorites");

    if (cookie) {
      // Si cookie existe déjà, récupère les données
      const parsedCookie = JSON.parse(cookie);
      setFavorites(parsedCookie);
    } else {
      // Sinon le crée
      const favoritesStr = JSON.stringify(favorites);
      Cookies.set("marvel-favorites", favoritesStr);
    }
  };

  // ================================================================= \\
  // =========== Fonction qui permet d'ajouter un favoris ============ \\
  // ================================================================= \\
  const addFavorite = (favoriteId, from) => {
    const copy = structuredClone(favorites);

    if (from === "characters") {
      copy[0].characters.push(favoriteId);
      setFavorites(copy);
    }

    if (from === "comics") {
      copy[1].comics.push(favoriteId);
      setFavorites(copy);
    }

    const favoritesStr = JSON.stringify(copy);
    Cookies.set("marvel-favorites", favoritesStr);
  };

  // ================================================================= \\
  // ========== Fonction qui permet de retirer un favoris ============ \\
  // ================================================================= \\
  // Fonction qui permet de retirer un favoris
  const removeFavorite = (favoriteId, from) => {
    const copy = structuredClone(favorites);

    if (from === "characters") {
      // Clone la liste des characters
      const characters = copy[0].characters;
      // Monte le nouveau tableau après filtre
      const newCharacters = characters.filter((charId) => charId !== favoriteId);
      // Update les favoris liés au personnages
      copy[0].characters = newCharacters;
      // Met à jour le state
      setFavorites(copy);
    }

    if (from === "comics") {
      // Clone la liste des characters
      const comics = copy[1].comics;
      // Monte le nouveau tableau après filtre
      const newCharacters = comics.filter((charId) => charId !== favoriteId);
      // Update les favoris liés au personnages
      copy[1].comics = newCharacters;
      // Met à jour le state
      setFavorites(copy);
    }

    const favoritesStr = JSON.stringify(copy);
    Cookies.set("marvel-favorites", favoritesStr);
  };

  // Au chargement du context
  useEffect(() => {
    initFavoritesFromCookie();
  }, []);

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, initFavoritesFromCookie }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
