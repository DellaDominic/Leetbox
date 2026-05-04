import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAllCards, deleteCard } from '../utils/helper';
import PageHeader from '../components/PageHeader';
import FlashcardItem from '../components/FlashcardItem';
import Modal from '../components/Modal';
import './cards.css';

const Cards = () => {
  const location = useLocation();
  const [openIds, setOpenIds] = useState(
    location.state?.openId ? [location.state.openId] : [],
  );
  const [cards, setCards] = useState([]);
  const [modal, setModal] = useState({
    isOpen: false,
    type: null,
    payload: null,
  });

  useEffect(() => {
    const loadCards = async () => {
      const cards = await getAllCards();
      setCards(cards);
    };
    loadCards();
  }, []);

  const handleClose = () => {
    setModal({
      isOpen: false,
      type: null,
      payload: null,
    });
  };

  const handleOpen = (type, payload = null) => {
    setModal({
      isOpen: true,
      type,
      payload,
    });
  };

  const handleDelete = async (deleteCardId) => {
    await deleteCard(deleteCardId);
    setCards((prev) => prev.filter((card) => card.id !== deleteCardId));
    handleClose();
  };

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
                  onDeleteClick={() => handleOpen('delete', card)}
                />
              );
            })}
          </div>
        ) : (
          <>todoloo.. nothing to see here! are you not studying?</>
        )}
      </div>
      {modal.isOpen && modal.type === 'delete' && (
        <Modal
          onClose={handleClose}
          onConfirm={() => handleDelete(modal.payload.id)}
          title="Delete this card?"
          content={
            <>
              Are you sure you want to delete the <b>{modal.payload.title}</b>{' '}
              card? This action cannot be undone.
            </>
          }
          confirmCtaText={modal.type}
        />
      )}
    </div>
  );
};

export default Cards;
