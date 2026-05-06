import './cardContent.css';
import { formatDate, getIsDue, getNextReviewDate } from '../utils/helper';

const CardQuestionHeader = ({ card, showReview = true, showBoxAndLevel }) => {
  const isDue = getIsDue(card);

  return (
    <div className={`content-header ${!card.tags.length ? 'align-end' : ''}`}>
      {card.tags.length > 0 && (
        <div>
          {card.tags.map((tag) => (
            <div className="tag-chip" key={tag}>
              {tag}
            </div>
          ))}
        </div>
      )}
      {showReview && (
        <div>
          <div className={`date ${isDue ? 'highlight-red' : 'highlight'}`}>
            Next Review:{' '}
            {isDue ? 'today!' : formatDate(getNextReviewDate(card.box))}
          </div>
        </div>
      )}
      {showBoxAndLevel && (
        <div>
          <div className="tag-chip">{`Box ${card.box}`}</div>
          <div className="tag-chip">{card.difficulty}</div>
        </div>
      )}
    </div>
  );
};

export default CardQuestionHeader;
