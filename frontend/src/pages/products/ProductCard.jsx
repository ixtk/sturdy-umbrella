import "./Products.scss"
import { Link } from "react-router"

export const ProductCard = ({
  imageUrl,
  id,
  title,
  category,
  regularPrice,
  salePrice = null,
  variantNumber
}) => {
  return (
    <div className="product-card">
      <img src={imageUrl} />
      <h3 className="title"><Link to={`/products/${id}`}>{title}</Link></h3>
      <p className="category">{category}</p>
      <div className="price-col">
        <div className="price-container">
          <p className="regular-price">${regularPrice}</p>
          {salePrice && <p className="sale-price">${salePrice}</p>}
        </div>
        <div className="badge badge-secondary variants-number">
          {variantNumber} colors
        </div>
      </div>
    </div>
  )
}
