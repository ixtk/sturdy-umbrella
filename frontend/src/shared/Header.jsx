import { useState } from "react"

export const Header = () => {
  const [view, setView] = useState("")
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <div className="container">
      <div className="header">
        <div className="links">
          <a href="#">Men</a>
          <a href="#">Women</a>
        </div>
        <input
          type="text"
          placeholder="Search products..."
          className="search"
        />
        <div className="icons">
          <span onClick={() => setView("favorites")} className="icon">
            ❤️<span className="badge">{favorites.length}</span>
          </span>
          <span onClick={() => setView("cart")} className="icon">
            🛒<span className="badge">{cartItems.length}</span>
          </span>
        </div>
      </div>

      {view === "cart" && (
        <div className="dropdown">
          <h3>Shopping Cart</h3>
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div key={index} className="item">
                <div className="item-info">
                  <div className="placeholder"></div>
                  <div>
                    <p>{item.name}</p>
                    <p className="color">{item.color}</p>
                    <p>
                      ${item.price} x {item.qty}
                    </p>
                  </div>
                </div>
                <button className="remove">X</button>
              </div>
            ))
          ) : (
            <p>No items in your cart.</p>
          )}
          <div className="total">Total: ${total.toFixed(2)}</div>
          <button className="checkout-btn">Checkout</button>
        </div>
      )}

      {view === "favorites" && (
        <div className="dropdown">
          <h3>Favorites</h3>
          {favorites.length > 0 ? (
            favorites.map((item, index) => (
              <div key={index} className="item">
                <div className="item-info">
                  <div className="placeholder"></div>
                  <div>
                    <p>{item.name}</p>
                    <p className="color">{item.color}</p>
                    <p>${item.price}</p>
                  </div>
                </div>
                <button className="remove">X</button>
              </div>
            ))
          ) : (
            <p>No favorites yet.</p>
          )}
          <button className="view-all-btn">View All Favorites</button>
        </div>
      )}
    </div>
  )
}
