import "./Products.scss"
import { Link } from "react-router"

export const ProductCard = ({
  thumbnail,
  id,
  title,
  category,
  regularPrice,
  salePrice = null
}) => {
  return (
    <div className="product-card">
      <img src={thumbnail} />
      <h3 className="title">
        <Link to={`/products/${id}`}>{title}</Link>
      </h3>
      <p className="category">{category}</p>
      <div className="price-col">
        <div className="price-container">
          <p className="regular-price">${regularPrice}</p>
          {salePrice && <p className="sale-price">${salePrice}</p>}
        </div>
      </div>
    </div>
  )
}
