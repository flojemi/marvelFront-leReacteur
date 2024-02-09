import "./CharDetailsPage.css";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import ComicsCard from "../../Components/ComicsCard/ComicsCard";

export default function CharDetailsPage() {
  const location = useLocation();

  const [charData, setCharData] = useState(null);
  const [comicsData, setComicsData] = useState(null);
  const [isLoadingLeft, setIsLoadingLeft] = useState(true);
  const [isLoadingRight, setIsLoadingRight] = useState(true);
  const [imageLink, setImageLink] = useState("");
  const [isComics, setIsComics] = useState(false);

  // Récupération des données du personnage au chargement de la page
  useEffect(() => {
    const fetchCharacterData = async () => {
      setIsLoadingLeft(true);
      setIsLoadingRight(true);

      try {
        const response = await axios.get(
          `http://localhost:3000/marvel/api/characters/byid/${location.state.id}`
        );

        // Vérifie s'il y a une image du personnage et monte le lien
        const isImage =
          !response.data.data.thumbnail.path.includes("image_not_available");
        if (isImage) {
          setImageLink(
            `${response.data.data.thumbnail.path}/standard_fantastic.${response.data.data.thumbnail.extension}`
          );
        }

        setCharData(response.data.data);
        setIsLoadingLeft(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchCharacterData();
  }, []);

  // TODO : Ajouter la mise à jour du state isComics s'il n'y a pas de comics lié au personnage.

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
          <>
            <p>{charData.name}</p>
            <img
              src={imageLink}
              alt={`${charData.name} image`}
              className="character-image"
            />
            <p>{charData.description}</p>
          </>
        )}
      </div>
      <div className="right-part">
        {isLoadingRight ? (
          <div className="loader"></div>
        ) : (
          comicsData &&
          comicsData.map((comics) => {
            // console.log("test", comics.data.data);
            return (
              <ComicsCard key={comics.data.data._id} comicsData={comics.data.data} />
            );
          })
        )}
      </div>
    </div>
  );
}
