import { Fragment, useEffect, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { getAllCards } from '../utils/helper';
import PageHeader from '../components/PageHeader';
import './study.css';
// import '../index.css';
import NoResults from '../components/NoResults';
import CardQuestionContent from '../components/CardQuestionContent';
import CardSolutionContent from '../components/CardSolutionContent';
import CardQuestionHeader from '../components/CardQuestionHeader';

const Study = () => {
  const [cards, setCards] = useState([]);
  const [flipState, setFlipState] = useState('front');

  useEffect(() => {
    const loadCards = async () => {
      const cards = await getAllCards();
      setCards(cards);
    };
    loadCards();
  }, []);

  const dueCards = cards.filter((card) => card.title);
  const [selectedDueCardIndex, setSelectedDueCardIndex] = useState(0);
  // const [visitedCards, setVisitedCards] = useState(dueCards);

  const total = dueCards.length;
  const visited = selectedDueCardIndex;

  const cardsCountContent = (
    <span className="count-text">
      Revised <b>{visited}</b> out of <b>{total}</b> Cards
    </span>
  );

  return (
    <div>
      <PageHeader heading="Flashcards" rightHeaderContent={cardsCountContent} />

      <div className="flashcard-container">
        <div className="progress-bar"></div>
        {dueCards.length > 0 && selectedDueCardIndex < dueCards.length ? (
          <Fragment key={dueCards[selectedDueCardIndex].id}>
            <div className="card-header">
              <CardQuestionHeader
                card={dueCards[selectedDueCardIndex]}
                showReview={false}
              />
            </div>
            <div
              className={`flashcard-card-content ${flipState === 'back' ? 'flip' : ''}`}
            >
              <div className="card-flipper">
                <div className="front-card">
                  <div className="card-scrollable-content">
                    <CardQuestionContent
                      card={dueCards[selectedDueCardIndex]}
                      showQuestionHeader={false}
                      title={dueCards[selectedDueCardIndex].title}
                    />
                  </div>
                  <div
                    className="flip-section"
                    onClick={() =>
                      setFlipState(flipState === 'front' ? 'back' : 'front')
                    }
                  >
                    <RotateCcw />
                    Click to reveal solution
                  </div>
                </div>
                <div className="back-card">
                  <div className="card-scrollable-content">
                    <CardSolutionContent
                      card={dueCards[selectedDueCardIndex]}
                    />
                  </div>
                  <div
                    className="flip-section"
                    onClick={() =>
                      setFlipState(flipState === 'front' ? 'back' : 'front')
                    }
                  >
                    <RotateCcw />
                    Click to Flip back
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer-ctas">
              <button
                onClick={() => {
                  setSelectedDueCardIndex((prev) => prev + 1);
                  setFlipState('front');
                }}
              >
                Revisit - Reset to Box 1
              </button>
              <button
                onClick={() => {
                  setSelectedDueCardIndex((prev) => prev + 1);
                  setFlipState('front');
                }}
              >
                Got it - Move to Box{' '}
                {Number(dueCards[selectedDueCardIndex].box || 1) + 1}
              </button>
            </div>
          </Fragment>
        ) : (
          <NoResults text="No Due cards" />
        )}
      </div>
    </div>
  );
};

export default Study;
