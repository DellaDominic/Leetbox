import './pageHeader.css';
// import { arrowLeft } from 'lucide';

const PageHeader = ({ heading }) => {
  return (
    <div className="page-header-section">
      <h1>{heading}</h1>
      {/* <div>back</div> */}
    </div>
  );
};

export default PageHeader;
