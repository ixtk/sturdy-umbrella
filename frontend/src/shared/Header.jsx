import { NavLink } from "react-router"
import { useContext, useState } from "react"
import { AuthContext } from "@/lib/AuthContext.jsx"
import { ShoppingCart, X } from "lucide-react"
import cartProducts from "@/mock-data/cartProducts.json"
import { signInWithPopup, signOut } from "firebase/auth"
import { auth, provider } from "@/lib/firebase.js"

export const Header = () => {
  const { authState, setAuthState } = useContext(AuthContext)
  const [cartOpen, setCartOpen] = useState(false)

  const logout = async () => {
    await signOut(auth)
    setAuthState({
      user: null
    })
  }

  const loginWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider)
    const user = result.user

    setAuthState({
      user: {
        username: user.displayName || user.name,
        email: user.email
      }
    })
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
            {!authState.loading &&
              (authState.user ? (
                <>
                {/*  */}
                </>
              ) : (
                <>
                  <button onClick={loginWithGoogle} className="social-btn btn btn-secondary">
                    <img src="/google-logo.webp" />
                    <span>Sign in</span>
                  </button>
                </>
              ))}
          </ul>
        </nav>
        <div className="profile-actions">
          {authState.user && (
            <>
              <p className="username">{authState?.user?.name}</p>
              <img src={authState.user.picture} className="pfp" />
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
