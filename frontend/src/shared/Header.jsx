import { NavLink } from "react-router"
import { useState } from "react"
import { ShoppingCart, X } from "lucide-react"
import cartProducts from "@/mock-data/cartProducts.json"
import { signInWithPopup, signOut } from "firebase/auth"
import { googleProvider, facebookProvider, auth } from "@/lib/firebase.js"
import { axiosInstance } from "@/lib/axiosInstance.js"

export const Header = () => {
  const [cartOpen, setCartOpen] = useState(false)

  const logout = async () => {
    await signOut(auth)
  }

  const loginWithProvider = async (provider) => {
    await signInWithPopup(auth, provider)
    await axiosInstance.post("/users/social-auth")
  }

  const totalPrice = cartProducts.reduce((sum, item) => {
    return sum + item.price * item.quantity
  }, 0)

  return (
    <header>
      <div className="container">
        <nav>
          <ul>
            <li>
              <NavLink to="/products">Products</NavLink>
            </li>
          </ul>
        </nav>
        {!auth.currentUser && (
          <div className="social-auth-container">
            <p>Sign in with</p>
            <div className="social-btns">
              <button onClick={() => loginWithProvider(googleProvider)} className="social-btn btn btn-secondary">
                <img src="/google-logo.webp" />
                {/*<span>Sign in</span>*/}
              </button>
              <button onClick={() => loginWithProvider(facebookProvider)} className="social-btn btn btn-secondary">
                <img src="/facebook-logo.png" />
                {/*<span>Sign in</span>*/}
              </button>
            </div>
          </div>
        )}
        <div className="profile-actions">
          {auth.currentUser && (
            <>
              <p className="username">{auth.currentUser?.displayName}</p>
              <img src={auth.currentUser.photoURL} className="pfp" />
              <button className="btn btn-outline" onClick={logout}>
                Logout
              </button>
              <button
                className="btn btn-icon"
                onClick={() => setCartOpen(!cartOpen)}
              >
                <ShoppingCart />
              </button>
            </>
          )}
        </div>
        {cartOpen && (
          <div className="cart card">
            <h3>Shopping cart</h3>
            {cartProducts.map(product => (
              <div className="cart-item" key={product.title}>
                <img src={product.imageUrl} />
                <div className="wrapper">
                  <p className="title">{product.title}</p>
                  <p className="category">{product.category}</p>
                  <p className="price">
                    ${product.price} x {product.quantity}
                  </p>
                </div>
                <p className="quantity"></p>
                <button className="btn btn-icon">
                  <X />
                </button>
              </div>
            ))}
            <h4>Total: {totalPrice.toFixed(2)}</h4>
            <button
              className="btn btn-primary"
              onClick={() => setCartOpen(false)}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
