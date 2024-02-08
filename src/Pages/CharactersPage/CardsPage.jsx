// Import du style
import "./CardsPage.css";

// Import des packages
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

// Import des composants
import CharacterCard from "../../Components/CharacterCard/CharacterCard";
import ComicsCard from "../../Components/ComicsCard/ComicsCard";

// Page exportée
// LoadType correspond au type de cards à charger (characters, comics)
export default function CharactersPage({ cardsType }) {
  console.log(cardsType);

  const location = useLocation();

  // States setup
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  // Au chargement de la page + changement de loadType
  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      // Get skip and limit query params
      const queryParams = new URLSearchParams(location.search);
      let skipValue = queryParams.get("skip");
      let limitValue = queryParams.get("limit");

      // Default values
      if (!skipValue) skipValue = 0;
      if (!limitValue) limitValue = 100;

      // Récupère les données correspondantes au type de cartes
      const response = await axios.get(
        `http://localhost:3000/marvel/api/${cardsType}?${`skip=${skipValue}`}${`&limit=${limitValue}`}`
      );

      setData(response.data.data.results);
      setIsLoading(false);
    };

    fetchData();
  }, [cardsType]);

  // JSX retourné

  /*
    Affiche dans un premier temps le loader.
    Une fois les données récupérées charge les cartes correspondantes
  */

  return (
    <main className="characters-container">
      {isLoading ? (
        <div className="loader"></div>
      ) : cardsType === "characters" ? (
        data.map((characterData, index) => (
          <CharacterCard key={characterData._id} characterData={characterData} />
        ))
      ) : (
        cardsType === "comics" &&
        data.map((comicsData, index) => <ComicsCard key={comicsData._id} comicsData={comicsData} />)
      )}
    </main>
  );
}
