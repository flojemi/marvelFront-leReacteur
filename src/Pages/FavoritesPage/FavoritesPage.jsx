import "./FavoritesPage.css";

import { useFavorites } from "../../Hooks/useFavorites";
import { useEffect, useState } from "react";
import axios from "axios";

import CharacterCard from "../../Components/CharacterCard/CharacterCard";
import ComicsCard from "../../Components/ComicsCard/ComicsCard";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  const [charData, setCharData] = useState([]);
  const [comicsData, setComicsData] = useState([]);
  const [isLoadingChar, setIsLoadingChar] = useState(true);
  const [isLoadingComics, setIsLoadingComics] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingChar(true);
        setIsLoadingComics(true);

        // Pour chaque thématique dans les favoris, monte un tableau de promesses
        const favoritesCharacters = favorites[0].characters;
        const favoritesComics = favorites[1].comics;

        const favoritesCharactersPromises = favoritesCharacters.map((charId) =>
          axios.get(`http://localhost:3000/marvel/api/characters/byid/${charId}`)
        );
        const favoritesComicsPromises = favoritesComics.map((comicsId) =>
          axios.get(`http://localhost:3000/marvel/api/comics/byid/${comicsId}`)
        );

        // Exécute la requête pour récupérer les données
        const favoritesCharactersData = await Promise.all(favoritesCharactersPromises);
        setCharData(favoritesCharactersData);

        const favoritesComicsData = await Promise.all(favoritesComicsPromises);
        setComicsData(favoritesComicsData);

        setIsLoadingChar(false);
        setIsLoadingComics(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [favorites]);

  const handleCharClick = (charId) => {
    navigate(`/characters/${charId}`, { state: { id: charId } });
  };

  return (
    <div className="FavoritesPage-container">
      <div className="favorites-characters-container">
        <p className="favorites-title">Favorites Characters</p>
        <div className="favorites-carousel">
          {isLoadingChar ? (
            <div className="loader"></div>
          ) : (
            charData.map((charDataItem) => (
              <CharacterCard
                key={charDataItem.data.data._id}
                characterData={charDataItem.data.data}
                handleCharClick={handleCharClick}
              />
            ))
          )}
        </div>
      </div>
      <div className="favorites-comics-container">
        <p className="favorites-title">Favorites Comics</p>
        <div className="favorites-carousel">
          {isLoadingComics ? (
            <div className="loader"></div>
          ) : (
            comicsData.map((comicsDataItem) => (
              <ComicsCard
                key={comicsDataItem.data.data._id}
                comicsData={comicsDataItem.data.data}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
