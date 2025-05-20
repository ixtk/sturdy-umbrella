import { NavLink } from "react-router"
import { useContext, useState } from "react"
import { AuthContext } from "@/lib/AuthContext.jsx"
import { axiosInstance } from "@/lib/axiosInstance.js"
import { ShoppingCart, X } from "lucide-react"
import cartProducts from "@/mock-data/cartProducts.json"

export const Header = () => {
  const { authState, setAuthState } = useContext(AuthContext)
  const [cartOpen, setCartOpen] = useState(false)

  const logout = async () => {
    await axiosInstance.delete("/users/logout")
    setAuthState({
      user: null
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
                  <li>
                    <NavLink to="/secret">Secret</NavLink>
                  </li>
                  {/*<li>*/}
                  {/*  <NavLink to="/products/1">Demo product</NavLink>*/}
                  {/*</li>*/}
                  {/*<li>*/}
                  {/*  <NavLink to="/products/1/edit">Edit demo product</NavLink>*/}
                  {/*</li>*/}
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
                  <li>
                    <NavLink to="/register">Register</NavLink>
                  </li>
                </>
              ))}
          </ul>
        </nav>
        <div className="profile-actions">
          <p className="username">{authState?.user?.username}</p>
          <button className="btn btn-outline" onClick={logout}>
            Logout
          </button>
          <button
            className="btn btn-icon"
            onClick={() => setCartOpen(!cartOpen)}
          >
            <ShoppingCart />
          </button>
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
