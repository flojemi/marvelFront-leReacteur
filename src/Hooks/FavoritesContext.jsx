import { createContext, useContext, useState } from "react";

// Contexte lié aux favoris pour éviter le props drilling
const FavoritesContext = createContext();
export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Fonction qui permet d'ajouter un favoris
  const addFavorite = (favorite) => {
    setFavorites((previousFavorites) => [...previousFavorites, favorite]);
  };

  // Fonction qui permet de retirer un favoris
  const removeFavorite = (favoriteId) => {
    setFavorites((previousFavorites) =>
      previousFavorites.filter((favorite) => favorite !== favoriteId)
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
