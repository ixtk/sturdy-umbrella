import "./Home.scss"
import { useEffect, useState } from "react"

export const Home = () => {
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
          <p className="cat">Categorry: {product.category}</p>
          <p className="price">
            Price: ${product.price}
            <span>{product.originalPrice}</span>
          </p>
          <p className="colors">Colors: {product.colors}</p>
        </div>
      ))}
    </div>
  )
}

export default Home
