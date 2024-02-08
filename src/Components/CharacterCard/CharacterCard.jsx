// Chargement du style
import "./CharacterCard.css";

export default function CharacterCard({ characterData }) {
  //   console.log("CharacterCard - characterData =>\n", characterData);

  let imageLink;
  const isImage = !characterData.thumbnail.path.includes("image_not_available");
  if (isImage) imageLink = `${characterData.thumbnail.path}.${characterData.thumbnail.extension}`;

  //   console.log("CharactersCard - imageLink =>", imageLink);

  return (
    <div className="CharacterCard-container">
      <p className="character-name">{characterData.name}</p>
      {isImage ? (
        <img src={imageLink} alt={`${characterData.name} image`} className="character-image" />
      ) : (
        <p className="character-image">Image isn't available</p>
      )}
    </div>
  );
}
