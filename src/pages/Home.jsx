import './home.css';
import { useEffect, useState } from 'react';
import { getBoxDetails, getAllCards, getDueCards } from '../utils/helper';
import { BookOpen, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const loadCards = async () => {
      const cards = await getAllCards();
      setCards(cards);
    };
    loadCards();
  }, []);

  const total = cards.length;
  const totalDue = getDueCards(cards).length;
  const boxData = getBoxDetails(cards);

  return (
    <div className="home-container">
      <div className="header-container">
        {/* left header section */}
        <div>
          <div className="home-header">
            <h1 className="heading-leetbox">LEETBOX.</h1>
            <div className="sub-title">
              <p>The leitner box for your leetcode flashcards</p>
              <p>
                <span className="highlight">
                  Spaced repetition study system
                </span>{' '}
                — 7 boxes, doubling review intervals.
              </p>
            </div>
          </div>
        </div>
        {/* right is due note section */}
        {totalDue > 0 && (
          <div className="due-banner">
            <h4 className="highlight date">
              {new Date().toLocaleDateString()}
            </h4>
            <p>
              You have <span className="due-count highlight">{totalDue}</span>{' '}
              cards due for review today!
            </p>
          </div>
        )}
      </div>
      {/* leitner boxes section */}
      <div className="sub-heading">LEITNER BOXES</div>
      <div className="leitner-boxes">
        {Object.entries(boxData).map(
          ([number, { count, reviewDays, isDue }]) => (
            <div className="leitner-box-container" key={number}>
              <div
                key={number}
                className={`box-content ${isDue ? 'due-box' : ''} ${number === '7' ? 'last-box' : ''}`}
              >
                <div className="box-count">{count}</div>
                <br />
              </div>
              <p className={`box-label ${isDue ? 'highlight' : ''}`}>
                Box{' '}
                {number === '7'
                  ? `${number}- Mastered!`
                  : ` ${number} ${isDue ? '- Due Today!' : `- ${reviewDays} d`}`}
              </p>
              {/* <p>{label}</p> */}
            </div>
          ),
        )}
      </div>
      {/* Add and browse cards section */}
      <div className="add-or-browse-section">
        <Link className="dashed-section" to="/add">
          <Plus className="icon" />
          <div className="button-text">
            <span>Add New Card</span>
            <p>Create a new flashcard.</p>
          </div>
        </Link>
        <Link className="dashed-section" to="/cards">
          <BookOpen className="icon" />
          <div className="button-text">
            <span>Browse Cards</span>
            <p>Total {total} cards</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
