// Chargement des styles
import axios from "axios";
import "./ComicsPage.css";

// import des packages
import { useEffect, useState } from "react";

// Import des composants
import ComicsCard from "../../Components/ComicsCard/ComicsCard";

// Page retournée
export default function ComicsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [comicsData, setComicsData] = useState([]);

  // Récupère les données au chargement de la page
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/marvel/api/comics");

        console.log(response.data.data.results);

        setComicsData(response.data.data.results);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, []);

  //JSX Retourné
  return (
    <main className="comics-container">
      {isLoading ? (
        <div className="loader"></div>
      ) : (
        comicsData.map((comics) => <ComicsCard key={comics._id} comicsDetails={comics} />)
      )}
    </main>
  );
}
