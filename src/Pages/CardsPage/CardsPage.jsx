// Import du style
import "./CardsPage.css";

// Import des packages
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// Import des composants
import CharacterCard from "../../Components/CharacterCard/CharacterCard";
import ComicsCard from "../../Components/ComicsCard/ComicsCard";
import Pagination from "../../Components/Pagination/Pagination";
import SearchBar from "../../Components/SearchBar/SearchBar";

// ======================================= \\
// ======================================= \\

// CardsType correspond au type de cards à charger (characters || comics)
export default function CardsPage({ cardsType }) {
  const location = useLocation();
  const navigate = useNavigate();

  // States setup
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimitValue, setCurrentLimitValue] = useState(100);
  const [searchEntered, setSearchEntered] = useState("");
  const [previousSearchEntered, setPreviousSearchEntered] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);
  const [reload, setReload] = useState(false);

  // Ref to store previous value
  const previousCardsType = useRef(cardsType);

  // ======================================================================================== \\
  // ========== useEffect lié au chargement de la page + changement de cardsType ============ \\
  // ======================================================================================== \\
  useEffect(() => {
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
        `https://site--backend-marvel--s9nznht574vq.code.run/marvel/api/${cardsType}?${`skip=${currentSkipValue}`}${`&limit=${currentLimitValue}`}`
      );

      setTotalResults(response.data.data.count);
      setData(response.data.data.results);
      setIsLoading(false);
    };

    // |||||||||||| S'il y a un changement de cardsType ||||||||||| \\
    // ------------------------------------------------------------ \\
    if (cardsType !== previousCardsType.current) {
      setCurrentPage(1);
      previousCardsType.current = cardsType;
    }

    // Si pas de recherche en cours, recharge toutes les cartes
    if (!searchEntered) {
      setIsLoading(true);
      fetchData();
    }
  }, [cardsType, currentPage, reload]);

  // ======================================================== \\
  // ========= useEffect lié au champ de recherche ========== \\
  // ======================================================== \\
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      // Analyse query string
      const queryParams = new URLSearchParams(location.search);

      // Limit de 100 par défaut lors d'une recherche
      setCurrentLimitValue(100);

      // Skip calculé en fonction du numéro de la page
      const currentSkipValue = currentLimitValue * (currentPage - 1);

      const response = await axios.get(
        `https://site--backend-marvel--s9nznht574vq.code.run/marvel/api/${cardsType}/byname/${searchEntered}?${`skip=${currentSkipValue}`}${`&limit=${currentLimitValue}`}`
      );

      // States update
      setTotalResults(response.data.data.count);
      setData(response.data.data.results);
      setIsLoading(false);
    };

    // Conserve en mémoire l'ancienne valeur de recherche
    setPreviousSearchEntered(searchEntered);

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ \\
    // ~~~~~~ Mise en place d'un delay car composant recharge trop vite ~~~~~~~ \\
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ \\

    // ||||||||||||||| S'il y a un critère de recherche ||||||||||| \\
    // ------------------------------------------------------------ \\
    if (searchEntered) {
      if (searchEntered !== previousSearchEntered) {
        setCurrentPage(1);

        // S'il y a déjà un délai en route, l'efface pour le réinitialiser
        if (timeoutId) clearTimeout(timeoutId);

        // Définit un nouveau délai (350ms)
        const id = setTimeout(() => {
          // Si le critère de recherche évolue, go sur la page 1 avec une nouvelle recherche
          fetchData();
        }, 400);

        setTimeoutId(id);
      } else {
        fetchData();
      }
    }

    // |||||||||| S'il n'y a plus de critère de recherche ||||||||| \\
    // ------------------------------------------------------------ \\
    if (!searchEntered && searchEntered !== previousSearchEntered) {
      setCurrentPage(1);

      // S'il y a déjà un délai en route, l'efface pour le réinitialiser
      if (timeoutId) clearTimeout(timeoutId);

      // Définit un nouveau délai (350ms)
      const id = setTimeout(() => {
        // Relance le useEffect initial qui affiche tous les personnages
        setTimeoutId(id);
        setReload(!reload);
      }, 400);
    }
  }, [searchEntered, currentPage]);

  // ======================================================== \\
  // ================= Handle functions ===================== \\
  // ======================================================== \\
  const handleCharClick = (charId) => {
    navigate(`/characters/${charId}`, { state: { id: charId } });
  };

  // ======================================================== \\
  // ================== JSX retourné ======================== \\
  // ======================================================== \\
  /*
    Affiche dans un premier temps le loader.
    Une fois les données récupérées charge les cartes correspondantes
  */

  return (
    <main className="characters-container">
      <SearchBar searchEntered={searchEntered} setSearchEntered={setSearchEntered} />
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
                <CharacterCard
                  key={characterData._id}
                  characterData={characterData}
                  handleCharClick={handleCharClick}
                />
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
