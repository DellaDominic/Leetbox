const AddCard = () => {
  return (
    <div className="add-card-container">
      <h2>Add New Card</h2>
      <form className="add-card-form">
        <div className="form-group">
          <label htmlFor="question">Question:</label>
          <input type="text" id="question" name="question" required />
        </div>
        <div className="form-group">
          <label htmlFor="answer">Answer:</label>
          <input type="text" id="answer" name="answer" required />
        </div>
        <button type="submit">Add Card</button>
      </form>
    </div>
  );
};

export default AddCard;
