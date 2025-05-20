import products from "@/mock-data/products.json"
import { useParams } from "react-router"
import { Star } from "lucide-react"
import { useState } from "react"

export const Reviews = () => {
  const { productId } = useParams()
  const [writingReview, setWritingReview] = useState(false)

  const product = products.find((product, i) => i === Number(productId))

  const reviewElements = product.reviews.map((review, index) => (
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

  return (
    <div>
      <div className="reviews-header">
        <h3>Product reviews</h3>
        {!writingReview && <button onClick={() => setWritingReview(true)} className="btn btn-primary">Write a review</button>}
      </div>
      {writingReview ? (
        <form className="card review-form">
          <div className="form-group">
            <label htmlFor="rating">Rating</label>
            <div className="star-container">
              {Array.from({ length: 5 }).map((_, i) => (
                <button type="button">
                  <Star
                    key={i}
                    stroke="#fecd55"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="headline">Headline</label>
            <input type="text" id="headline" />
          </div>

          <div className="form-group">
            <label htmlFor="description">Review</label>
            <textarea id="description" rows="3"></textarea>
          </div>
          <div className="btn-container">
            <button className="btn btn-outline" onClick={() => setWritingReview(false)}>Cancel</button>
            <button className="btn btn-primary">Submit</button>
          </div>
        </form>
      ) : (<div className="reviews-container">
        {reviewElements}
      </div>)}
    </div>
  )
}