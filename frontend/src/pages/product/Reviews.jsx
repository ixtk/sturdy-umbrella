import React, { useState } from "react"
import { Star } from "lucide-react"
import "./Review.scss"

const Review = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      stars: 5,
      headline: "Amazing product!",
      text: "I loved using this every day. High quality and fast shipping."
    },
    {
      id: 2,
      stars: 4,
      headline: "Pretty good",
      text: "It met my expectations. Could be a bit cheaper though."
    }
  ])

  const [newReview, setNewReview] = useState({
    stars: 0,
    headline: "",
    text: ""
  })

  const [hoveredStar, setHoveredStar] = useState(0)
  const [showForm, setShowForm] = useState(false)

  const handleStarClick = star => {
    setNewReview({ ...newReview, stars: star })
  }

  const handleChange = e => {
    setNewReview({ ...newReview, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (newReview.stars && newReview.headline && newReview.text) {
      const newEntry = {
        ...newReview,
        id: Date.now()
      }
      setReviews([newEntry, ...reviews])
      setNewReview({ stars: 0, headline: "", text: "" })
      setHoveredStar(0)
      setShowForm(false)
    }
  }

  const handleCancel = () => {
    setNewReview({ stars: 0, headline: "", text: "" })
    setHoveredStar(0)
    setShowForm(false)
  }

  return (
    <div className="review-container">
      {!showForm && (
        <button onClick={() => setShowForm(true)} className="show-form-button">
          Write a Review
        </button>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="review-form">
          <h3>Write Your Review</h3>
          <label>Rating</label>
          <div className="stars">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
                className={
                  star <= (hoveredStar || newReview.stars)
                    ? "star filled"
                    : "star"
                }
                aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
              >
                <Star size={24} />
              </button>
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
      )}

      <div className="submitted-reviews">
        <h3>Customer Reviews</h3>
        {reviews.map(rev => (
          <div key={rev.id} className="review-card">
            <div className="review-stars">
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  size={20}
                  className={star <= rev.stars ? "star filled" : "star"}
                />
              ))}
            </div>
            <strong>{rev.headline}</strong>
            <p>{rev.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Review
