// Import du style
import "./CardsPage.css";

// Import des packages
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

// Import des composants
import CharacterCard from "../../Components/CharacterCard/CharacterCard";
import ComicsCard from "../../Components/ComicsCard/ComicsCard";
import Pagination from "../../Components/Pagination/Pagination";

// ======================================= \\
// =========== Page exportée ============= \\
// ======================================= \\

// LoadType correspond au type de cards à charger (characters, comics)
export default function CardsPage({ cardsType }) {
  const location = useLocation();

  // States setup
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimitValue, setCurrentLimitValue] = useState(100);

  // Ref to store previous value
  const previousCardsType = useRef(cardsType);

  // Au chargement de la page + changement de loadType
  useEffect(() => {
    setIsLoading(true);

    // Récupère les données
    const fetchData = async () => {
      // Analyse query string
      const queryParams = new URLSearchParams(location.search);

      // If there's limit -> adjust limit, else default value of 100
      setCurrentLimitValue(queryParams.get("limit") ? queryParams.get("limit") : 100);

      // If there's skip -> adjust skip, else default value depending of currentPage
      let currentSkipValue = queryParams.get("skip")
        ? queryParams.get("skip")
        : currentLimitValue * (currentPage - 1);

      // Récupère les données correspondantes au type de cartes
      const response = await axios.get(
        `http://localhost:3000/marvel/api/${cardsType}?${`skip=${currentSkipValue}`}${`&limit=${currentLimitValue}`}`
      );

      setTotalResults(response.data.data.count);
      setData(response.data.data.results);
      setIsLoading(false);
    };

    // Permet de réinitialiser la pagination lorsqu'il y a changement de cardsType
    if (cardsType !== previousCardsType.current) {
      setCurrentPage(1);
      previousCardsType.current = cardsType;
    }

    fetchData();
  }, [cardsType, currentPage]);

  // JSX retourné

  /*
    Affiche dans un premier temps le loader.
    Une fois les données récupérées charge les cartes correspondantes
  */

  return (
    <main className="characters-container">
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        resultsNumber={totalResults}
        limitValue={currentLimitValue}
      />
      {isLoading ? (
        <div className="loader"></div>
      ) : (
        <>
          {cardsType === "characters"
            ? data.map((characterData, index) => (
                <CharacterCard key={characterData._id} characterData={characterData} />
              ))
            : cardsType === "comics" &&
              data.map((comicsData, index) => (
                <ComicsCard key={comicsData._id} comicsData={comicsData} />
              ))}
        </>
      )}
    </main>
  );
}
