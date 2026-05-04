import './modal.css';

const Modal = ({ onClose, onConfirm, title, content, confirmCtaText }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h1 className="highlight">{title}</h1>
        <p>{content}</p>
        <div className="modal-footer">
          <button onClick={onClose}> cancel </button>
          <button onClick={onConfirm} className={confirmCtaText}>
            {' '}
            {confirmCtaText}{' '}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
