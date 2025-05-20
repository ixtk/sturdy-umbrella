import products from "@/mock-data/products.json"
import Filters from "@/pages/products/Filters.jsx"
import { useEffect } from "react"
import { axiosInstance } from "@/lib/axiosInstance.js"

export const ProductListPage = () => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get("/products/")

      console.log(response)
    }

    fetchData()
  }, [])

  return (
    <div className="container">
      <Filters />
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="card product-card">
            <img src="https://i.imgur.com/EJLFNOwg.jpg" alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="cat">
              Category: <span className="badge">{product.category}</span>
            </p>
            <p className="price">
              Price:{" "}
              <span className="badge badge-success">${product.price}</span>
              {product.originalPrice && (
                <span className="badge badge-outline">
                  ${product.originalPrice}
                </span>
              )}
            </p>
            <p className="colors">
              Colors:{" "}
              {/* {product.colors.split(",").map(color => (
                <span key={color} className="badge badge-secondary">
                  {color.trim()}
                </span>
              ))} */}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
