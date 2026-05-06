import { Fragment, useEffect, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import {
  getAllCards,
  saveCard,
  getNextReviewDate,
  getDueCards,
} from '../utils/helper';
import PageHeader from '../components/PageHeader';
import './study.css';
import NoResults from '../components/NoResults';
import CardQuestionContent from '../components/CardQuestionContent';
import CardSolutionContent from '../components/CardSolutionContent';
import CardQuestionHeader from '../components/CardQuestionHeader';

const Study = () => {
  const [dueCards, setDueCards] = useState([]); // ✅ session snapshot
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [flipState, setFlipState] = useState('front');

  // ✅ Initialize session once
  useEffect(() => {
    const loadCards = async () => {
      const allCards = await getAllCards();
      const due = getDueCards(allCards);
      setDueCards(due);
    };

    loadCards();
  }, []);

  const totalDueCards = dueCards.length;

  const progress =
    totalDueCards > 0 ? (reviewedCount / totalDueCards) * 100 : 0;

  const cardsCountContent =
    reviewedCount < totalDueCards ? (
      <span className="count-text">
        Card <b>{totalDueCards ? reviewedCount + 1 : 0}</b> out of{' '}
        <b>{totalDueCards}</b> Cards
      </span>
    ) : (
      <></>
    );

  const handleCorrect = (card) => {
    const newBox = Math.min((card.box || 1) + 1, 7);

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

    // optional debug
    // console.log('saved card:', updatedCard);

    setCurrentIndex((prev) => prev + 1);
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

        {dueCards.length > 0 && currentIndex < dueCards.length ? (
          <Fragment key={dueCards[currentIndex].id}>
            <div className="card-header">
              <CardQuestionHeader
                card={dueCards[currentIndex]}
                showReview={false}
                showBoxAndLevel
              />
            </div>

            <div
              className={`flashcard-card-content ${
                flipState === 'back' ? 'flip' : ''
              }`}
            >
              <div className="card-flipper">
                {/* FRONT */}
                <div className="front-card">
                  <div className="card-scrollable-content">
                    <CardQuestionContent
                      card={dueCards[currentIndex]}
                      showQuestionHeader={false}
                      title={dueCards[currentIndex].title}
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

                {/* BACK */}
                <div className="back-card">
                  <div className="card-scrollable-content">
                    <CardSolutionContent card={dueCards[currentIndex]} />
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

            {/* CTA */}
            <div className="card-footer-ctas">
              <button
                onClick={() =>
                  handleReview(dueCards[currentIndex], handleWrong)
                }
              >
                Revisit - Reset to Box 1
              </button>

              <button
                onClick={() =>
                  handleReview(dueCards[currentIndex], handleCorrect)
                }
              >
                Got it - Move to Box{' '}
                {Number(dueCards[currentIndex].box || 1) + 1}
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
