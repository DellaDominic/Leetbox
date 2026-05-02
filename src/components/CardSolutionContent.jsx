import './cardContent.css';

const CardSolutionContent = ({ card }) => {
  return (
    <div className="card-solution">
      <h1>Solution</h1>
      <h2>Intuition and Approach</h2>
      <p className="quote">{card.approach}</p>
      <h2>Code</h2>
      <p className="quote">{card.code}</p>
      <h2>Complexity Analysis</h2>
      <p className="quote">{card.complexity}</p>
      <h2>Mistakes</h2>
      <p className="quote">{card.mistakes}</p>
    </div>
  );
};

export default CardSolutionContent;
