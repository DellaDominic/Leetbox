import './flashcardItem.css';
import {
  SquarePen,
  ExternalLink,
  Trash2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { formatDate } from '../utils/helper';

const FlashcardItem = ({ openIds, onToggle, card }) => {
  return (
    <div className="accordion">
      <div
        className={`accordion-header ${openIds.includes(card.id) ? 'header-open' : ''}`}
      >
        <div className="accordion-header-left">
          <span>{card.title}</span>
          <span style={{ cursor: 'pointer' }}>
            <ExternalLink />
          </span>
          <span style={{ cursor: 'pointer' }}>
            <SquarePen />
          </span>
          <span style={{ cursor: 'pointer' }}>
            <Trash2 />
          </span>
        </div>
        <div className="accordion-header-right">
          <span className="difficulty-chip" style={{ cursor: 'pointer' }}>
            {card.difficulty || 'Easy'}
          </span>
          <span style={{ cursor: 'pointer' }} onClick={() => onToggle(card.id)}>
            {openIds.includes(card.id) ? <ChevronUp /> : <ChevronDown />}
          </span>
        </div>
      </div>
      {openIds.includes(card.id) && (
        <div
          className={`accordion-content-container ${openIds.includes(card.id) ? 'content-open' : ''}`}
        >
          <div className="accordion-content">
            <p>
              <b>Next Review:</b> {formatDate(card.nextReviewAt)}
            </p>
            <p>{card.problem}</p>
            <p>{card.complexity}</p>
            <p>{card.mistakes}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashcardItem;
