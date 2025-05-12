import React from 'react'
import './ProductPage.scss'

export default function ProductPage() {
  return (
    <div className="product-page">
      <h1>Product Details</h1>

      <div className="product-card">
        <img/>
        <h2>Awesome Product</h2>
        <p>Price: $49.99</p>
        <p>This is a great product that you'll love to use every day.</p>
        <button>Add to Cart</button>
      </div>
    </div>
  )
}
