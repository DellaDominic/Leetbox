import './pageHeader.css';
// import { arrowLeft } from 'lucide';

const PageHeader = ({ heading, rightHeaderContent }) => {
  return (
    <div className="page-header-section">
      <h1>{heading}</h1>
      {rightHeaderContent && (
        <div className="header-right-content">{rightHeaderContent}</div>
      )}
    </div>
  );
};

export default PageHeader;
