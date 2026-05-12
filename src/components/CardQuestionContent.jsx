import CardQuestionHeader from './CardQuestionHeader';
import { ExternalLink } from 'lucide-react';
import './cardContent.css';

const CardQuestionContent = ({
  card,
  showQuestionHeader = true,
  title,
  showLink,
}) => {
  return (
    <div className="card-question">
      {showQuestionHeader && <CardQuestionHeader card={card} />}
      <div className="header-title">
        <h1>{title || 'Problem Statement'}</h1>
        {showLink && (
          <a
            className={`header-icon link ${!card.link ? 'disabled' : ''}`}
            href={card.link}
            target="_blank"
          >
            <ExternalLink />
          </a>
        )}
      </div>
      <p>{card.problem}</p>
    </div>
  );
};

export default CardQuestionContent;
