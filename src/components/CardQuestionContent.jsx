import CardQuestionHeader from './CardQuestionHeader';
import './cardContent.css';

const CardQuestionContent = ({ card, showQuestionHeader = true, title }) => {
  return (
    <div className="card-question">
      {showQuestionHeader && <CardQuestionHeader card={card} />}
      <h1>{title || 'Problem Statement'}</h1>
      <p>{card.problem}</p>
    </div>
  );
};

export default CardQuestionContent;
