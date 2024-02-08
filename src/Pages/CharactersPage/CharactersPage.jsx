// Import du style
import "./CharactersPage.css";

// Import des packages
import { useEffect, useState } from "react";
import axios from "axios";

// Import des composants
import CharacterCard from "../../Components/CharactersCard/CharactersCard";

// Page exportée
export default function CharactersPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [charactersData, setCharactersData] = useState([]);

  // Récupère les données sur le back au chargement de la page
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3000/marvel/api/characters");

      console.log("CharactersPage - FetchData =>\n", response.data.data.results);

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
