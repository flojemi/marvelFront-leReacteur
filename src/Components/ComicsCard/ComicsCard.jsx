//Chargement des styles
import { useEffect, useState } from "react";
import "./ComicsCard.css";

export default function ComicsCard({ comicsData }) {
  console.log("ComicsCard - ComicsDetails =>", comicsData);

  const [imageLink, setImageLink] = useState("");

  useEffect(() => {
    const isImage = !comicsData.thumbnail.path.includes("image_not_available");
    if (isImage) {
      setImageLink(`${comicsData.thumbnail.path}.${comicsData.thumbnail.extension}`);
    }
  }, []);

  return (
    <div className="ComicsCard-container">
      <p>{comicsData.title}</p>
      <img src={imageLink} alt={`${comicsData.name} image`} className="comics-image" />
      <p>{comicsData.description}</p>
    </div>
  );
}
