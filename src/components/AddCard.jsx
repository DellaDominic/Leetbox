import { useState } from 'react';
import './addCard.css';
import PageHeader from './PageHeader';

const AddCard = ({ saveCard, getNextReviewDate }) => {
  const clearFormState = {
    title: '',
    link: '',
    difficulty: '',
    tags: '',
    problem: '',
    solution: '',
    complexity: '',
    mistakes: '',
    nextReview: '',
    createdOn: '',
    id: '',
  };
  const [form, setForm] = useState(clearFormState);
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const card = {
      ...form,
      tags: form.tags.split(',').map((tag) => tag.trim()),
      id: Date.now(),
      createdOn: new Date().toISOString(),
      nextReview: getNextReviewDate(1),
    };
    console.log({ card });
    await saveCard(card);
    setForm(clearFormState);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="add-card-container">
      <PageHeader heading="Add a Leetcode FlashCard" />
      <form className="add-card-form" onSubmit={handleFormSubmit}>
        <div className="inline-form-group">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Eg. Two Sum"
            />
          </div>
          <div className="form-group">
            <label htmlFor="link">Link</label>
            <input
              type="text"
              name="link"
              value={form.link}
              onChange={handleChange}
              placeholder="Question link"
            />
          </div>
        </div>
        <div className="inline-form-group">
          <div className="form-group">
            <label htmlFor="difficulty">Difficulty</label>
            <select
              name="difficulty"
              value={form.difficulty}
              onChange={handleChange}
            >
              <option value=""> Choose Level</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="tags">
              Tags <span>(comma-separated)</span>
            </label>
            <input
              type="text"
              name="tags"
              value={form.tags}
              onChange={handleChange}
              placeholder="Eg. Array, Hash Map"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="problem">Problem</label>
          <textarea
            name="problem"
            value={form.problem}
            onChange={handleChange}
            placeholder="Describe the Problem Statement..."
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="solution">Solution</label>
          <textarea
            name="solution"
            value={form.solution}
            onChange={handleChange}
            placeholder="Explain the approach and add code & other links ..."
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="complexity">Complexity Analysis</label>
          <textarea
            name="complexity"
            value={form.complexity}
            onChange={handleChange}
            placeholder="Add Time and Space complexity analysis..."
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="mistakes">Mistakes</label>
          <textarea
            name="mistakes"
            value={form.mistakes}
            onChange={handleChange}
            placeholder="Jot Down the mistakes you made while solving this problem..."
          ></textarea>
        </div>

        <button type="submit">Add to Box 1</button>
      </form>
    </div>
  );
};

export default AddCard;
