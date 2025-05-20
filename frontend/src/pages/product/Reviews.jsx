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
    <div className="container">
      {!showForm && (
        <button onClick={() => setShowForm(true)} className="btn btn-primary">
          Write a Review
        </button>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="card review-form">
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
                className={`btn btn-icon ${
                  star <= (hoveredStar || newReview.stars)
                    ? "star filled"
                    : "star"
                }`}
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
            className="input"
          />
          <label>Review</label>
          <textarea
            name="text"
            placeholder="Share your experience with this product"
            value={newReview.text}
            onChange={handleChange}
            className="input"
          />

          <div className="buttons">
            <button
              type="button"
              onClick={handleCancel}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Submit Review
            </button>
          </div>
        </form>
      )}

      <div className="submitted-reviews">
        <h3>Customer Reviews</h3>
        {reviews.map(review => (
          <div key={review.id} className="card review-card">
            <div className="review-stars">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={`star ${i < review.stars ? "filled" : ""}`}
                />
              ))}
            </div>
            <h4>{review.headline}</h4>
            <p>{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Review
