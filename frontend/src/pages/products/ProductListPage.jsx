import products from "@/mock-data/products.json"
import Filters from "@/pages/products/Filters.jsx"

export const ProductListPage = () => {
  return (
    <>
      <Filters />
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src="https://i.imgur.com/EJLFNOwg.jpg" alt={product.name} />
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
      </div></>
  )
}
