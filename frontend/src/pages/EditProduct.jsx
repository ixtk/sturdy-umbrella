import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import productData from "./fake.json"

export default function EditProductPage() {
  const { productId } = useParams()

  const [product, setProduct] = useState(null)

  useEffect(() => {
    if (productId) {
      const foundProduct = productData.find(item => item.id === productId)
      console.log("Found product:", foundProduct)
      setProduct(foundProduct)
    }
  }, [productId])

  if (!product) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1>Edit Product</h1>
      <p>Product Name</p>
      <input type="text" value={product.productName} />

      <p>Category</p>
      <select>
        {product.categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>

      <h1>Pricing</h1>
      <div className="pricing">
        <div className="regular-price">
          <p>Regular Price ($)</p>
          <input type="text" value={product.pricing.regularPrice} />
        </div>
        <div className="sale-price">
          <p>Sale Price ($)</p>
          <input type="text" value={product.pricing.salePrice} />
        </div>
        <div className="on-sale">
          <div className="toggle-switch"></div> <p>On Sale</p>
        </div>
      </div>

      <h1>Variants</h1>
      {product.variants.map((variant, index) => (
        <div className="variants">
          <h1>Variant Details</h1>
          <div className="colorName-quantity-images">
            <div className="colorName">
              <p>Color Name</p>
              <input type="text" value={variant.colorName} />
            </div>
            <div className="quantity">
              <p>Stock Quantity</p>
              <input type="text" value={variant.stockQuantity} />
            </div>
            <div className="uploadImages">
              <p>Images</p>
              <button>
                <i class="fi fi-rr-upload"></i> Upload images
              </button>
            </div>
            <div className="image-previews">
              <p>Image Previews</p>
              <div className="images">
                {variant.images.map((image, index) => (
                  <img src={image} alt="" />
                ))}
              </div>
            </div>
          </div>

          <div className="sizes">
            <div className="available-sizes">
              <p>Available Sizes</p>
              <button>
                <i class="fi fi-rr-plus-small"></i> add size
              </button>
            </div>
            {variant.availableSizes.map((size, index) => {
              return (
                <div className="men-women-size">
                  <div className="men-size">
                    <p>Men's Size</p>
                    <input type="text" value={size.mensSize} />
                  </div>
                  <div className="wemen-size">
                    <p>Wemen's Size</p>
                    <input type="text" value={size.womensSize} />
                  </div>
                  <i class="fi fi-rr-cross-small"></i>
                </div>
              )
            })}
          </div>

          <p>Size Summary</p>
          {variant.availableSizes.map((size, index) => {
            return (
              <div className="size-summary">
                <p>
                  M {size.mensSize}/W {size.womensSize}
                </p>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
