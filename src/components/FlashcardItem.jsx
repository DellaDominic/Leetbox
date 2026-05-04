import { useEffect } from 'react';
import './flashcardItem.css';
import {
  SquarePen,
  ExternalLink,
  Trash2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { getIsDue } from '../utils/helper';
import { Link } from 'react-router-dom';
import CardSolutionContent from './CardSolutionContent';
import CardQuestionContent from './CardQuestionContent';

const FlashcardItem = ({ openIds, onToggle, card, onDeleteClick }) => {
  const isOpen = openIds.includes(card.id);
  const isDue = getIsDue(card.box || 1);
  useEffect(() => {
    if (isOpen) {
      document
        .getElementById(`card-${card.id}`)
        ?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [card.id, isOpen]);

  return (
    <div className="accordion" id={`card-${card.id}`}>
      <div
        className={`accordion-header ${isOpen ? 'header-open' : ''} ${isDue ? 'due-header' : ''}`}
      >
        <div className="accordion-header-left">
          <span className="box-number">Box {card.box || 1}</span>
          <span className="card-title">{card.title}</span>
          <a
            className={`header-icon link ${!card.link ? 'disabled' : ''}`}
            href={card.link}
            target="_blank"
          >
            <ExternalLink />
          </a>
          <Link className="header-icon edit" to={`/edit/${card.id}`}>
            <SquarePen />
          </Link>
          <span className="header-icon delete" onClick={onDeleteClick}>
            <Trash2 />
          </span>
        </div>
        <div className="accordion-header-right">
          {isDue && (
            <span className="due">
              {/* {' '}
              <CircleAlert className="header-icon" /> */}
              due today !
            </span>
          )}
          <span
            className={`difficulty-chip ${card.difficulty.toLowerCase() || 'easy'}`}
          >
            {card.difficulty || 'Easy'}
          </span>
          <span onClick={() => onToggle(card.id)} className="chevron">
            {isOpen ? <ChevronUp /> : <ChevronDown />}
          </span>
        </div>
      </div>
      {isOpen && (
        <div
          className={`accordion-content-container parched-notebook  ${isOpen ? 'content-open' : ''} ${isDue ? 'due-content' : ''}`}
        >
          <div className="accordion-content">
            <CardQuestionContent card={card} />
            <CardSolutionContent card={card} />
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashcardItem;
