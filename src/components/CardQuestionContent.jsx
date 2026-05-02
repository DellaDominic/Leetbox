import { formatDate, getIsDue } from '../utils/helper';
import './cardContent.css';

const CardQuestionContent = ({ card }) => {
  const isDue = getIsDue(card.box || 1);

  return (
    <div className="card-question">
      <div className="content-header">
        <div>
          {card.tags.map((tag) => (
            <div className="tag-chip" key={tag}>
              {tag}
            </div>
          ))}
        </div>
        <div>
          <div className={`date ${isDue ? 'highlight-red' : 'highlight'}`}>
            Next Review: {isDue ? 'today!' : formatDate(card.nextReview)}
          </div>
        </div>
      </div>
      <h1>Problem Statement</h1>
      <p>{card.problem}</p>
    </div>
  );
};

export default CardQuestionContent;
