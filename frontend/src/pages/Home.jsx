import React, { useEffect, useState } from "react"
import ProductCard from "../components/ProductCard"
import { fetchProducts } from "../api"

const Home = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchProducts().then(res => setProducts(res.data))
  }, [])

  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map(p => (
        <ProductCard key={p._id} product={p} />
      ))}
    </main>
  )
}

export default Home
