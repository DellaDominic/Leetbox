import './cardContent.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CardSolutionContent = ({ card }) => {
  return (
    <div className="card-solution">
      <h1>Solution</h1>
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
