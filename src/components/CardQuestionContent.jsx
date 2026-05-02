import { formatDate } from '../utils/helper';
import './cardContent.css';

const CardQuestionContent = ({ card }) => {
  return (
    <div className="card-question">
      <p>
        <b>Next Review:</b> {formatDate(card.nextReviewAt)}
      </p>
      <h1>PROBLEM STATEMENT</h1>
      <p>{card.problem}</p>
    </div>
  );
};

export default CardQuestionContent;
