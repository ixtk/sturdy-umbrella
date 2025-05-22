import { Reviews } from "@/pages/product/Reviews.jsx"
import "./Product.scss"
import { useParams } from "react-router"
import products from "@/mock-data/products.json"
import { useContext } from "react"
import { AuthContext } from "@/lib/AuthContext.jsx"

export const ProductPage = () => {
  const { productId } = useParams()
  const { authState } = useContext(AuthContext)

  const product = products.find((product, i) => i === Number(productId))

  return (
    <div>
      <div className="product-container">
        <div className="thumbnail">
          <img src={product?.images?.[0]} />
        </div>
        <div className="details">
          <h2 className="title">{product.title}</h2>
          <p className="category">{product.category}</p>
          <div className="price-container">
            <p className="price">${product.regularPrice}</p>
            {product.salePrice && (
              <p className="sale-price">${product.salePrice}</p>
            )}
          </div>
          {authState.user && (
            <button className="btn btn-secondary">Add to cart</button>
          )}
        </div>
      </div>
      <div className="divider"></div>
      <Reviews reviews={product.reviews} />
    </div>
  )
}
