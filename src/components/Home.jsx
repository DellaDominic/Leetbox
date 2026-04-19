import './home.css';
import { BOX_INTERVALS } from '../utils/helper';

const Home = () => {
  return (
    <div className="home">
      <div className="home-header">
        <h1>
          <span className="heading-leetbox">LeetBox</span>, the leitner box for
          your leetcode flashcards
        </h1>
        <p className="sub-title">
          Spaced repetition study system — 7 boxes, doubling review intervals.
        </p>
      </div>
      <div className="due-banner">
        you have <span className="due-count">3</span> cards due for review
        today!
      </div>
      <div className="leitner-boxes"></div>
    </div>
  );
};

export default Home;
