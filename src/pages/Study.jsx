import { Fragment, useEffect, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import {
  getAllCards,
  saveCard,
  getNextReviewDate,
  getDueCards,
  getCardById,
} from '../utils/helper';
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
  const [reviewedCount, setReviewedCount] = useState(0);

  useEffect(() => {
    const loadCards = async () => {
      const cards = await getAllCards();
      setCards(cards);
    };
    loadCards();
  }, []);

  const dueCards = getDueCards(cards);
  const [selectedDueCardIndex, setSelectedDueCardIndex] = useState(0);
  // const [visitedCards, setVisitedCards] = useState(dueCards);
  const totalDueCards = dueCards.length;
  const progress =
    totalDueCards > 0 ? (reviewedCount / totalDueCards) * 100 : 0;

  const cardsCountContent = (
    <span className="count-text">
      Revised <b>{reviewedCount}</b> out of <b>{totalDueCards}</b> Cards
    </span>
  );

  const handleCorrect = (card) => {
    const newBox = Math.min(card.box + 1, 7);

    return {
      ...card,
      box: newBox,
      nextReviewDate: getNextReviewDate(newBox),
    };
  };

  const handleWrong = (card) => {
    return {
      ...card,
      box: 1,
      nextReviewDate: getNextReviewDate(1),
    };
  };

  const handleReview = async (card, updater) => {
    const updatedCard = updater(card);

    await saveCard(updatedCard);

    const check = await getCardById(updatedCard.id);
    console.log('saved card:', check);

    const freshCards = await getAllCards();
    setCards(freshCards);

    setSelectedDueCardIndex((prev) => prev + 1);
    setReviewedCount((prev) => prev + 1);
    setFlipState('front');
  };

  return (
    <div>
      <PageHeader heading="Flashcards" rightHeaderContent={cardsCountContent} />

      <div className="flashcard-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        {dueCards.length > 0 && selectedDueCardIndex < dueCards.length ? (
          <Fragment key={dueCards[selectedDueCardIndex].id}>
            <div className="card-header">
              <CardQuestionHeader
                card={dueCards[selectedDueCardIndex]}
                showReview={false}
                showBoxAndLevel
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
                onClick={() =>
                  handleReview(dueCards[selectedDueCardIndex], handleWrong)
                }
              >
                Revisit - Reset to Box 1
              </button>
              <button
                onClick={() =>
                  handleReview(dueCards[selectedDueCardIndex], handleCorrect)
                }
              >
                Got it - Move to Box{' '}
                {Number(dueCards[selectedDueCardIndex].box) + 1}
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
