import { Star } from "lucide-react"
import { useState } from "react"

export const Reviews = ({ reviews }) => {
  const [writingReview, setWritingReview] = useState(false)
  const [newReview, setNewReview] = useState({
    starRating: 0,
    title: "",
    description: ""
  })

  const reviewElements = reviews.map((review, index) => (
    <div className="review" key={index}>
      <div className="star-container">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            fill={i < review.starRating ? "#fecd55" : "none"}
            stroke="#fecd55"
          />
        ))}
      </div>
      <p className="title">{review.title}</p>
      <p className="description">{review.description}</p>
    </div>
  ))

  console.log(newReview)

  const saveReview = event => {
    event.preventDefault()

    // TODO: send newReview state values to backend, add a new review to THIS product
    // TODO: using axiosInstance.post
  }

  return (
    <div>
      <div className="reviews-header">
        <h3>Product reviews</h3>
        {!writingReview && (
          <button
            onClick={() => setWritingReview(true)}
            className="btn btn-primary"
          >
            Write a review
          </button>
        )}
      </div>
      {writingReview ? (
        <form className="card review-form" onSubmit={saveReview}>
          <div className="form-group">
            <label htmlFor="rating">Rating</label>
            <div className="star-container">
              {Array.from({ length: 5 }).map((_, starIndex) => {
                // starIndex = 0, 1, 2, 3, 4
                return (
                  <button
                    key={starIndex}
                    type="button"
                    onClick={() =>
                      setNewReview({ ...newReview, starRating: starIndex + 1 })
                    }
                  >
                    <Star key={starIndex} stroke="#fecd55" />
                  </button>
                )
              })}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="headline">Headline</label>
            <input
              type="text"
              id="headline"
              onChange={event =>
                setNewReview({ ...newReview, title: event.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Review</label>
            <textarea
              id="description"
              rows="3"
              onChange={event =>
                setNewReview({ ...newReview, description: event.target.value })
              }
            ></textarea>
          </div>
          <div className="btn-container">
            <button
              className="btn btn-outline"
              onClick={() => setWritingReview(false)}
            >
              Cancel
            </button>
            <button className="btn btn-primary">Submit</button>
          </div>
        </form>
      ) : (
        <div className="reviews-container">{reviewElements}</div>
      )}
    </div>
  )
}
