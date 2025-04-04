import "./Home.scss"
import { useEffect, useState } from "react"

export const ProductList = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch("/data.json")
      .then(response => response.json())
      .then(data => {
        setProducts(data.products)
      })
      .catch(error => {
        console.error("Error fetching products:", error)
      })
  }, [])
  return (
    <div className="product-list">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <img src={product.imageUrl} alt={product.name} />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
        </div>
      ))}
    </div>
  )
}

export default ProductList
