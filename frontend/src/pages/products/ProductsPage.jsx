import products from "@/mock-data/products.json"
import { ProductCard } from "@/pages/products/ProductCard.jsx"

export const ProductsPage = () => {
  return (
    <>
      <h2 className="page-title">All products</h2>
      <div className="products-container">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            category={product.category}
            title={product.title}
            regularPrice={product.regularPrice}
            salePrice={product.salePrice}
            imageUrl={product.variants[0].images[0]}
            variantNumber={product.variants.length}
          />
        ))}
      </div>
    </>
  )
}
