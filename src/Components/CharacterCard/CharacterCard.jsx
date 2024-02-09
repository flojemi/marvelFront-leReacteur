// Chargement du style
import "./CharacterCard.css";

// Import des packages
import Cookies from "js-cookie";

// Import des composants
import { useFavorites } from "../../Hooks/FavoritesContext";
import FavoriteIcon from "../FavoriteIcon/FavoriteIcon";
import { useState } from "react";

// ============================================ \\
// ============ Composant exporté ============= \\
// ============================================ \\
export default function CharacterCard({ characterData, handleCharClick }) {
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const [isFavorite, setIsFavorite] = useState(false);

  // TODO : mettre en place un useEffect pour récupérer le statut du favoris au chargement du composant
  // TODO : dans le useContext ajouter les intéractions avec le cookie (parse, stringify)

  // Vérifie s'il y a une image et monte le lien
  let imageLink;
  const isImage = !characterData.thumbnail.path.includes("image_not_available");
  if (isImage)
    imageLink = `${characterData.thumbnail.path}/standard_fantastic.${characterData.thumbnail.extension}`;

  // Handle function
  const handleFavoriteClick = (event, charId) => {
    event.stopPropagation();

    Cookies.set("marvel-favorites", charId);
    addFavorite(charId);
    setIsFavorite(true);
  };

  // JSX retourné
  return (
    <div
      className="CharacterCard-container"
      onClick={() => handleCharClick(characterData._id)}
    >
      {isImage ? (
        <img
          src={imageLink}
          alt={`${characterData.name} image`}
          className="character-image"
        />
      ) : (
        <p className="character-image">Image isn't available</p>
      )}
      <p className="character-name">{characterData.name}</p>

      <div className="FavoriteIcon">
        <FavoriteIcon
          isFavorite={isFavorite}
          onClick={(event) => handleFavoriteClick(event, characterData._id)}
        />
      </div>
    </div>
  );
}

// TODO : Ajouter la description au survol de la carte
/* {characterData.description ? <p>{characterData.description}</p> : ""} */
