//Chargement des styles
import "./ComicsCard.css";

export default function ComicsCard({ comicsDetails }) {
  console.log("ComicsCard - ComicsDetails =>", comicsDetails);

  return (
    <div className="ComicsCard-container">
      <p>Ceci est une comics card</p>
    </div>
  );
}
