import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import { BrowserRouter } from "react-router"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)



import React, { useState } from "react"
import "./App.scss"

const colors = ["Red", "Black", "White", "Blue", "Gray", "Green"];
const sizes = [
  "M 6 / W 7.5",
  "M 6.5 / W 8",
  "M 7 / W 8.5",
  "M 7.5 / W 9",
  "M 8 / W 9.5",
  "M 8.5 / W 10",
];

export default function ProductPage() {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [cart, setCart] = useState([]);

  const addToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert("Please select a color and size");
      return;
    }

    const item = {
      name: "Nike Air Max Dn8",
      price: 190,
      color: selectedColor,
      size: selectedSize,
    };

    setCart([...cart, item]);
    alert("Product added to cart!");
  };

  return (
    <div className="product-container">
      <div className="product-image">Product Image</div>

      <div className="product-info">
        <h2 className="product-title">Nike Air Max Dn8</h2>
        <p className="product-subtitle">Men's Shoes</p>
        <div className="product-rating">★★★★★ <span>(4.5)</span></div>
        <p className="product-price">$190</p>

        <div className="option-group">
          <p className="option-label">Select Color</p>
          <div className="color-options">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`color-btn ${selectedColor === color ? "selected" : ""}`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        <div className="option-group">
          <p className="option-label">Select Size</p>
          <div className="size-options">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`size-btn ${selectedSize === size ? "selected" : ""}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button className="add-to-cart-btn" onClick={addToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  )
}
