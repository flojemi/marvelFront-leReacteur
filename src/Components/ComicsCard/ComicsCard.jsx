//Chargement des styles
import "./ComicsCard.css";

// Import des packages
import { useEffect, useState } from "react";

// Import des composants
import { useFavorites } from "../../Hooks/useFavorites";
import FavoriteIcon from "../FavoriteIcon/FavoriteIcon";

export default function ComicsCard({ comicsData }) {
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const [isFavorite, setIsFavorite] = useState(
    favorites[1] && favorites[1].comics && favorites[1].comics.includes(comicsData._id)
  );

  // Vérifie s'il y a une image et monte le lien
  let imageLink;
  const isImage = !comicsData.thumbnail.path.includes("image_not_available");
  if (isImage) {
    imageLink = `${comicsData.thumbnail.path}/portrait_xlarge.${comicsData.thumbnail.extension}`;
  }

  // Handle function
  const handleFavoriteClick = (event, charId) => {
    event.stopPropagation();

    isFavorite ? removeFavorite(charId, "comics") : addFavorite(charId, "comics");

    setIsFavorite(!isFavorite);
  };

  return (
    <div className="ComicsCard-container">
      <p className="comics-title">{comicsData.title}</p>
      <img src={imageLink} alt={`${comicsData.name} image`} className="comics-image" />
      <span className="comics-description">{comicsData.description}</span>
      <div className="FavoriteIcon-comics">
        <FavoriteIcon
          isFavorite={isFavorite}
          onClick={(event) => handleFavoriteClick(event, comicsData._id)}
        />
      </div>
    </div>
  );
}
