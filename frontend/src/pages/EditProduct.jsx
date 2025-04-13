import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import productData from "./fake.json"
import "./EditProduct.scss"
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
      <input
        type="text"
        value={product.productName}
        onChange={e => setProduct({ ...product, productName: e.target.value })}
      />

      <p>Category</p>
      <select
        value={product.category}
        onChange={e => setProduct({ ...product, category: e.target.value })}
      >
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
          <input
            type="text"
            value={product.pricing.regularPrice}
            onChange={e =>
              setProduct({
                ...product,
                pricing: {
                  ...product.pricing,
                  regularPrice: e.target.value
                }
              })
            }
          />
        </div>
        <div className="sale-price">
          <p>Sale Price ($)</p>
          <input
            type="text"
            value={product.pricing.salePrice}
            onChange={e =>
              setProduct({
                ...product,
                pricing: {
                  ...product.pricing,
                  salePrice: e.target.value
                }
              })
            }
          />
        </div>
        <div className="on-sale">
          <div className="toggle-switch"></div> <p>On Sale</p>
        </div>
      </div>

      <h1>Variants</h1>
      {product.variants.map((variant, index) => (
        <div className="variants" key={index}>
          <div className="variant-details">
            <h1>Variant Details</h1>
            <button>
              <i className="fi fi-rr-plus-small"></i> Add Variant
            </button>
          </div>
          <div className="colorName-quantity-images">
            <div className="colorName">
              <p>Color Name</p>
              <input
                type="text"
                value={variant.colorName}
                onChange={e => {
                  const updatedVariants = [...product.variants]
                  updatedVariants[index] = {
                    ...variant,
                    colorName: e.target.value
                  }
                  setProduct({ ...product, variants: updatedVariants })
                }}
              />
            </div>
            <div className="quantity">
              <p>Stock Quantity</p>
              <input
                type="text"
                value={variant.stockQuantity}
                onChange={e => {
                  const updatedVariants = [...product.variants]
                  updatedVariants[index] = {
                    ...variant,
                    stockQuantity: e.target.value
                  }
                  setProduct({ ...product, variants: updatedVariants })
                }}
              />
            </div>
            <div className="uploadImages">
              <p>Images</p>
              <button>
                <i className="fi fi-rr-upload"></i> Upload Images
              </button>
            </div>
            <div className="image-previews">
              <p>Image Previews</p>
              <div className="images">
                {variant.images.map((image, i) => (
                  <img key={i} src={image} alt="" />
                ))}
              </div>
            </div>
          </div>

          <div className="sizes">
            <div className="available-sizes">
              <p>Available Sizes</p>
              <button>
                <i className="fi fi-rr-plus-small"></i> Add Size
              </button>
            </div>
            {variant.availableSizes.map((size, sizeIndex) => (
              <div className="men-women-size" key={sizeIndex}>
                <div className="men-size">
                  <p>Men's Size</p>
                  <input
                    type="text"
                    value={size.mensSize}
                    onChange={e => {
                      const updatedVariants = [...product.variants]
                      const updatedSizes = [...variant.availableSizes]
                      updatedSizes[sizeIndex] = {
                        ...size,
                        mensSize: e.target.value
                      }
                      updatedVariants[index] = {
                        ...variant,
                        availableSizes: updatedSizes
                      }
                      setProduct({ ...product, variants: updatedVariants })
                    }}
                  />
                </div>
                <div className="wemen-size">
                  <p>Wemen's Size</p>
                  <input
                    type="text"
                    value={size.womensSize}
                    onChange={e => {
                      const updatedVariants = [...product.variants]
                      const updatedSizes = [...variant.availableSizes]
                      updatedSizes[sizeIndex] = {
                        ...size,
                        womensSize: e.target.value
                      }
                      updatedVariants[index] = {
                        ...variant,
                        availableSizes: updatedSizes
                      }
                      setProduct({ ...product, variants: updatedVariants })
                    }}
                  />
                </div>
                <i className="fi fi-rr-cross-small"></i>
              </div>
            ))}
          </div>

          <p>Size Summary</p>
          {variant.availableSizes.map((size, i) => (
            <div className="size-summary" key={i}>
              <p>
                M {size.mensSize}/W {size.womensSize}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
