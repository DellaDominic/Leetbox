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
  const [visited, setVisited] = useState(0);
  const [flipState, setFlipState] = useState('front');

  useEffect(() => {
    const loadCards = async () => {
      const cards = await getAllCards();
      setCards(cards);
    };
    loadCards();
  }, []);

  const dueCards = cards.filter((card) => card.box === 2);

  const total = dueCards.length;

  const cardsCountContent = (
    <span className="count-text">
      <b>{visited}</b> out of <b>{total}</b> Cards
    </span>
  );

  return (
    <div>
      <PageHeader heading="Flashcards" rightHeaderContent={cardsCountContent} />

      <div className="flashcard-container">
        <div className="progress-bar"></div>
        {dueCards.length > 0 ? (
          dueCards.map((card) => (
            <Fragment key={card.id}>
              <div className="card-header">
                <CardQuestionHeader card={card} showReview={false} />
              </div>
              <div className="flashcard-card-content parched-notebook">
                <div className="card-scrollable-content">
                  {flipState === 'front' ? (
                    <CardQuestionContent
                      card={card}
                      showQuestionHeader={false}
                      title={card.title}
                    />
                  ) : (
                    <CardSolutionContent card={card} />
                  )}
                </div>
                <div
                  className="flip-section"
                  onClick={() =>
                    setFlipState(flipState === 'front' ? 'back' : 'front')
                  }
                >
                  {' '}
                  <RotateCcw />
                  {flipState === 'front' ? (
                    <>Click to reveal solution</>
                  ) : (
                    <>Click to Flip back</>
                  )}
                </div>
              </div>
              {/* <div className="flashcard-card-content back">
                <CardSolutionContent card={card} />
              </div> */}
            </Fragment>
          ))
        ) : (
          <NoResults text="No Due cards" />
        )}
      </div>
    </div>
  );
};

export default Study;
