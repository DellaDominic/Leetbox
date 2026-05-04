import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAllCards } from '../utils/helper';
import PageHeader from './PageHeader';
import FlashcardItem from './FlashcardItem';
import './cards.css';

const Cards = () => {
  const location = useLocation();
  const [openIds, setOpenIds] = useState(
    location.state?.openId ? [location.state.openId] : [],
  );
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const loadCards = async () => {
      const cards = await getAllCards();
      setCards(cards);
    };
    loadCards();
  }, []);

  return (
    <div>
      <PageHeader heading="Flashcards" />
      <div className="flashcard-container">
        {cards.length > 0 ? (
          <div className="accordion-container">
            {cards.map((card) => {
              return (
                <FlashcardItem
                  key={card.id}
                  card={card}
                  openIds={openIds}
                  onToggle={(id) => {
                    setOpenIds((prev) =>
                      prev.includes(id)
                        ? prev.filter((i) => i !== id)
                        : [...prev, id],
                    );
                  }}
                />
              );
            })}
          </div>
        ) : (
          <>todoloo.. nothing to see here! are you not studying?</>
        )}
      </div>
    </div>
  );
};

export default Cards;
