import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

// Contexte lié aux favoris pour éviter le props drilling
const FavoritesContext = createContext();
export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Fonction qui permet d'initialiser les données depuis un cookie
  const initFavoritesFromCookie = () => {
    const cookie = Cookies.get("marvel-favorites");

    if (cookie) {
      const parsedFavorites = cookie.split(",");
      setFavorites(parsedFavorites);
    }
  };

  // Fonction qui permet d'ajouter un favoris
  const addFavorite = (newFavorite) => {
    // Récupère les données du cookie
    const cookie = Cookies.get("marvel-favorites");
    let stringifiedCookie;

    if (cookie) {
      // Parse les données
      const parsedCookie = cookie.split(",");
      // Push le nouvel id
      parsedCookie.push(newFavorite);
      // Stringify
      stringifiedCookie = parsedCookie.join(",");
    }

    // Met à jour le cookie
    cookie
      ? Cookies.set("marvel-favorites", stringifiedCookie)
      : Cookies.set("marvel-favorites", newFavorite);

    // Met à jour le state
    setFavorites((previousFavorites) => [...previousFavorites, newFavorite]);
  };

  // Fonction qui permet de retirer un favoris
  const removeFavorite = (favoriteId) => {
    const cookie = Cookies.get("marvel-favorites");
    const parsedCookie = cookie.split(",");
    const newParsedCookie = parsedCookie.filter((id) => id !== favoriteId);
    const newStringifiedCookie = newParsedCookie.join(",");
    Cookies.set("marvel-favorites", newStringifiedCookie);

    setFavorites((previousFavorites) =>
      previousFavorites.filter((favorite) => favorite !== favoriteId)
    );
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
