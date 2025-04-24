import React, { useState } from 'react';
import './review.css';

const Review = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      stars: 5,
      headline: 'Amazing product!',
      text: 'I loved using this every day. High quality and fast shipping.',
    },
    {
      id: 2,
      stars: 4,
      headline: 'Pretty good',
      text: 'It met my expectations. Could be a bit cheaper though.',
    },
  ]);

  const [newReview, setNewReview] = useState({
    stars: 0,
    headline: '',
    text: '',
  });

  const handleStarClick = (star) => {
    setNewReview({ ...newReview, stars: star });
  };

  const handleChange = (e) => {
    setNewReview({ ...newReview, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newReview.stars && newReview.headline && newReview.text) {
      const newEntry = {
        ...newReview,
        id: Date.now(),
      };
      setReviews([newEntry, ...reviews]);
      setNewReview({ stars: 0, headline: '', text: '' });
    }
  };

  const handleCancel = () => {
    setNewReview({ stars: 0, headline: '', text: '' });
  };

  return (
    <div className="review-container">
      <form onSubmit={handleSubmit} className="review-form">
        <h3>Write Your Review</h3>
        <label>Rating</label>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => handleStarClick(star)}
              className={star <= newReview.stars ? 'filled' : ''}
            >
              ★
            </span>
          ))}
        </div>
        <label>Headline</label>
        <input
          type="text"
          name="headline"
          placeholder="Summarize your experience"
          value={newReview.headline}
          onChange={handleChange}
        />
        <label>Review</label>
        <textarea
          name="text"
          placeholder="Share your experience with this product"
          value={newReview.text}
          onChange={handleChange}
        />
        <div className="buttons">
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit">Submit Review</button>
        </div>
      </form>

      <div className="submitted-reviews">
        <h3>Customer Reviews</h3>
        {reviews.map((rev) => (
          <div key={rev.id} className="review-card">
            <div className="review-stars">
              {'★'.repeat(rev.stars)}{'☆'.repeat(5 - rev.stars)}
            </div>
            <strong>{rev.headline}</strong>
            <p>{rev.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;
