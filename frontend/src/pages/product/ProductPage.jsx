import { Reviews } from "@/pages/product/Reviews.jsx"
import "./Product.scss"
import { useParams } from "react-router"
import { useEffect, useState } from "react"
import { Minus, Plus } from "lucide-react"
import { axiosInstance } from "@/lib/axiosInstance.js"
import { auth } from "@/lib/firebase.js"

export const ProductPage = () => {
  const { productId } = useParams()
  const [itemQuantity, setItemQuantity] = useState(1)

  const [product, setProduct] = useState({})

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axiosInstance.get(`/products/${productId}`)

      setProduct(response.data)
    }

    fetchProduct()
  }, [productId])

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
          {auth.currentUser && (
            <div className="cart-actions">
              <div className="quantity-container">
                <button
                  className="btn"
                  onClick={() => setItemQuantity(itemQuantity - 1)}
                >
                  <Minus size={16} />
                </button>
                <input
                  onChange={e => setItemQuantity(Number(e.target.value))}
                  type="text"
                  value={itemQuantity}
                />
                <button
                  className="btn"
                  onClick={() => setItemQuantity(itemQuantity + 1)}
                >
                  <Plus size={16} />
                </button>
              </div>
              <button className="btn btn-secondary">Add to cart</button>
            </div>
          )}
        </div>
      </div>
      <div className="divider"></div>
      <Reviews reviews={product.reviews ?? []} />
    </div>
  )
}
