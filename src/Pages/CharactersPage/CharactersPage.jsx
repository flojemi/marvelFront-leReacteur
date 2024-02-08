// Import du style
import "./CharactersPage.css";

// Import des packages
import { useEffect, useState } from "react";
import axios from "axios";

// Import des composants
import CharacterCard from "../../Components/CharacterCard/CharacterCard";
import { useLocation } from "react-router-dom";

// Page exportée
export default function CharactersPage() {
  // States setup
  const [isLoading, setIsLoading] = useState(true);
  const [charactersData, setCharactersData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  // Get skip and limit query params
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let skipValue = queryParams.get("skip");
  let limitValue = queryParams.get("limit");

  // Default values
  if (!skipValue) skipValue = 0;
  if (!limitValue) limitValue = 100;

  // Récupère les données sur le back au chargement de la page
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:3000/marvel/api/characters?${`skip=${skipValue}`}${`&limit=${limitValue}`}`
      );

      // console.log("CharactersPage - FetchData =>\n", response.data.data.results);

      setCharactersData(response.data.data.results);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  // JSX retourné
  return (
    <main className="characters-container">
      {isLoading ? (
        <div className="loader"></div>
      ) : (
        charactersData.map((characterData, index) => (
          <CharacterCard key={characterData._id} characterData={characterData} />
        ))
      )}
    </main>
  );
}
