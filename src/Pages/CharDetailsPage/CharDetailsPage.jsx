import "./CharDetailsPage.css";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import ComicsCard from "../../Components/ComicsCard/ComicsCard";
import CharacterCard from "../../Components/CharacterCard/CharacterCard";

export default function CharDetailsPage() {
  const location = useLocation();

  const [charData, setCharData] = useState(null);
  const [comicsData, setComicsData] = useState(null);
  const [isLoadingLeft, setIsLoadingLeft] = useState(true);
  const [isLoadingRight, setIsLoadingRight] = useState(true);

  // Récupération des données du personnage au chargement de la page
  useEffect(() => {
    const fetchCharacterData = async () => {
      setIsLoadingLeft(true);
      setIsLoadingRight(true);

      try {
        const response = await axios.get(
          `http://localhost:3000/marvel/api/characters/byid/${location.state.id}`
        );

        setCharData(response.data.data);
        setIsLoadingLeft(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchCharacterData();
  }, []);

  // Récupère les données des comics liés au personnage lorsque les données du personnage sont récupérées
  useEffect(() => {
    const fetchComicsData = async () => {
      if (charData && charData.comics) {
        try {
          // Pour chaque comics, monter une promesse, exécuter les promesses
          const comicsPromises = charData.comics.map((comicsId) =>
            axios.get(`http://localhost:3000/marvel/api/comics/byid/${comicsId}`)
          );

          const comicsData = await Promise.all(comicsPromises);
          setComicsData(comicsData);

          setIsLoadingRight(false);
        } catch (error) {
          console.log(error.response);
        }
      }
    };

    fetchComicsData();
  }, [charData]);

  // JSX Retourné
  return (
    <div className="CharDetails-container">
      <div className="left-part">
        {isLoadingLeft ? (
          <div className="loader"></div>
        ) : (
          <CharacterCard characterData={charData} />
        )}
      </div>
      <div className="right-part">
        {isLoadingRight ? (
          <div className="loader"></div>
        ) : (
          comicsData &&
          comicsData.map((comics) => {
            return (
              <ComicsCard key={comics.data.data._id} comicsData={comics.data.data} />
            );
          })
        )}
      </div>
    </div>
  );
}
