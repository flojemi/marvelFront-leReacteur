import "./Topnav.css";

import { Link, useNavigate } from "react-router-dom";

import marvelLogo from "../../assets/Marvel_Logo.svg";

export default function Topnav() {
  const navigate = useNavigate();

  const handleComicsClick = () => {
    navigate("/comics");
  };

  const handleCharactersClick = () => {
    navigate("/characters");
  };

  const handleFavoritesClick = () => {
    navigate("/favorites");
  };

  return (
    <nav>
      <div className="nav-container">
        <Link to="/">
          <img src={marvelLogo} alt="Logo Marvel" className="marvel-logo" />
        </Link>
        <div className="nav-buttons-container">
          <button className="nav-button" onClick={handleCharactersClick}>
            Characters
          </button>
          <button className="nav-button" onClick={handleComicsClick}>
            Comics
          </button>
          <button className="nav-button" onClick={handleFavoritesClick}>
            Favorites
          </button>
        </div>
      </div>
    </nav>
  );
}
