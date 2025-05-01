import React from "react"

const ProductCard = ({ product }) => (
  <div className="border rounded-xl p-4 shadow-sm hover:shadow-md">
    <div className="w-full h-40 bg-gray-200 mb-2">
      <img
        src={`http://localhost:5000/images/${product.image}`}
        alt={product.name}
        className="w-full h-full object-cover rounded-md"
      />
    </div>

    <h2 className="font-semibold">{product.name}</h2>
    <p className="text-sm text-gray-500">{product.category}</p>
    <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
    {product.original && (
      <p className="text-sm line-through text-gray-400">
        ${product.original.toFixed(2)}
      </p>
    )}
    <p className="text-sm text-gray-600">
      {product.colors} Color{product.colors > 1 ? "s" : ""}
    </p>
  </div>
)

export default ProductCard
