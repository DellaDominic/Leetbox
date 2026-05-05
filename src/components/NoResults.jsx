import './noResults.css';

const NoResults = ({ text = 'No cards found' }) => {
  return (
    <div className="empty-state">
      <svg width="300" height="220" viewBox="0 0 300 220">
        <svg
          width="300"
          height="220"
          viewBox="0 0 300 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* <!-- Background --> */}
          <rect width="300" height="220" fill="#ffffff" />

          {/* <!-- Back card (accent) --> */}
          <rect
            x="110"
            y="50"
            width="110"
            height="140"
            rx="10"
            fill="#f7dd7d"
          />

          {/* <!-- Front card --> */}
          <rect
            x="90"
            y="40"
            width="110"
            height="140"
            rx="10"
            fill="#ffffff"
            stroke="#000"
            stroke-width="2"
          />

          {/* <!-- Lines (text placeholder) --> */}
          <rect
            x="105"
            y="60"
            width="80"
            height="6"
            rx="3"
            fill="#000"
            opacity="0.15"
          />
          <rect
            x="105"
            y="75"
            width="60"
            height="6"
            rx="3"
            fill="#000"
            opacity="0.15"
          />

          {/* <!-- Face container (accent) --> */}
          <circle
            cx="145"
            cy="110"
            r="35"
            fill="#f7dd7d"
            stroke="#000"
            stroke-width="2"
          />

          {/* <!-- Eyes --> */}
          <circle cx="130" cy="105" r="3" fill="#000" />
          <circle cx="160" cy="105" r="3" fill="#000" />

          {/* <!-- Sad mouth --> */}
          <path
            d="M130 125 Q145 115 160 125"
            stroke="#000"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
          />

          {/* <!-- Magnifying glass handle --> */}
          <rect
            x="165"
            y="130"
            width="40"
            height="10"
            rx="5"
            transform="rotate(45 165 130)"
            fill="#000"
          />

          {/* <!-- Decorative shapes (subtle) --> */}
          <circle cx="40" cy="50" r="3" fill="#000" opacity="0.1" />
          <circle cx="260" cy="160" r="3" fill="#000" opacity="0.1" />
          <path d="M250 40 L255 50 L245 50 Z" fill="#000" opacity="0.1" />
        </svg>
      </svg>
      <p>{text}</p>
    </div>
  );
};

export default NoResults;
