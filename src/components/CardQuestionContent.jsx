import { formatDate, getIsDue, getNextReviewDate } from '../utils/helper';
import './cardContent.css';

const CardQuestionContent = ({ card }) => {
  const isDue = getIsDue(card.box || 1);

  return (
    <div className="card-question">
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
        <div>
          <div className={`date ${isDue ? 'highlight-red' : 'highlight'}`}>
            Next Review:{' '}
            {isDue ? 'today!' : formatDate(getNextReviewDate(card.box || 1))}
          </div>
        </div>
      </div>
      <h1>Problem Statement</h1>
      <p>{card.problem}</p>
    </div>
  );
};

export default CardQuestionContent;
