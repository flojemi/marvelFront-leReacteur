// Chargement du style
import { useEffect, useState } from "react";
import "./CharacterCard.css";
import axios from "axios";

// Composant exporté
export default function CharacterCard({ characterData, handleCharClick }) {
  // Vérifie s'il y a une image et monte le lien
  let imageLink;
  const isImage = !characterData.thumbnail.path.includes("image_not_available");
  if (isImage)
    imageLink = `${characterData.thumbnail.path}.${characterData.thumbnail.extension}`;

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
      {characterData.description ? <p>{characterData.description}</p> : ""}
    </div>
  );
}
