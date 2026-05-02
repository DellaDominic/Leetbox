import './cardContent.css';

const CardSolutionContent = ({ card }) => {
  return (
    <div className="card-solution">
      <h1>Solution</h1>
      <p>{card.solution}</p>
      <p>{card.complexity}</p>
      <p>{card.mistakes}</p>
    </div>
  );
};

export default CardSolutionContent;
