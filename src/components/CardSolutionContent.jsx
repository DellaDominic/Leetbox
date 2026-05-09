import './cardContent.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { ExternalLink } from 'lucide-react';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CardSolutionContent = ({ card, showLink }) => {
  return (
    <div className="card-solution">
      <div className="solution-header">
        <h1>Solution</h1>
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
      <h2>Intuition and Approach</h2>
      <p className="">{card.approach}</p>
      <h2>Code</h2>
      <SyntaxHighlighter
        language={'javascript'}
        style={vscDarkPlus}
        showLineNumbers
        wrapLongLines
      >
        {card.code}
      </SyntaxHighlighter>
      <h2>Complexity Analysis</h2>
      <p className="quote">{card.complexity}</p>
      <h2>Mistakes</h2>
      <p className="quote">{card.mistakes}</p>
    </div>
  );
};

export default CardSolutionContent;
