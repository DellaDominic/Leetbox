import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAllCards, deleteCard } from '../utils/helper';
import NoResults from '../components/NoResults';
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

  const [search, setSearch] = useState('');
  const [level, setLevel] = useState('all');
  const [box, setBox] = useState('all');
  const [tag, setTag] = useState('all');

  const allTags = [
    ...new Set(
      cards.flatMap((card) =>
        (card.tags || []).map((card) => card.toLowerCase()),
      ),
    ),
  ].sort();

  const filteredCards = cards.filter((card) => {
    const matchesSearch =
      card.title?.toLowerCase().includes(search.toLowerCase()) ||
      card.approach?.toLowerCase().includes(search.toLowerCase());

    const matchesLevel = level === 'all' || card.difficulty === level;
    const matchesTag =
      tag === 'all' ||
      (card.tags &&
        card.tags.map((tag) => tag.toLowerCase()).includes(tag.toLowerCase()));
    const matchesBox = box === 'all' || card.box === Number(box);

    return matchesSearch && matchesLevel && matchesTag && matchesBox;
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

  const total = cards.length;
  const showing = filteredCards.length;

  const cardsCountContent = (
    <span className="count-text">
      <b>{showing}</b> out of <b>{total}</b> Cards
    </span>
  );

  return (
    <div>
      <PageHeader heading="Flashcards" rightHeaderContent={cardsCountContent} />
      <div className="filter-and-search-container">
        <div className="search-bar-section">
          <input
            value={search}
            placeholder="Search Cards..."
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <div className="filter-section">
          <select
            value={level}
            onChange={(e) => {
              setLevel(e.target.value);
            }}
          >
            <option value="all">All Levels</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <select
            value={box}
            onChange={(e) => {
              setBox(e.target.value);
            }}
          >
            <option value="all">All Boxes</option>
            {[1, 2, 3, 4, 5, 6, 7].map((b) => (
              <option key={b} value={b}>
                Box {b}
              </option>
            ))}
          </select>
          <select value={tag} onChange={(e) => setTag(e.target.value)}>
            <option value="all">All Tags</option>
            {allTags.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="header-cta">
          <button
            className={`${!openIds.length ? 'disabled' : ''}`}
            onClick={() => {
              if (openIds.length) setOpenIds([]);
            }}
          >
            Collapse All
          </button>
        </div>
      </div>
      <div className="flashcard-container">
        {filteredCards.length > 0 ? (
          <div className="accordion-container">
            {filteredCards.map((card) => {
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
          <NoResults text="No matching cards" />
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
