import { FieldArray, Field } from "formik"
import { Plus, Trash, Upload, X } from "lucide-react"

export default function VariantsSection({ values, setFieldValue }) {
  const handleImageChange = (e, index) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const updatedImages = [...values.variants[index].images, reader.result]
        setFieldValue(`variants[${index}].images`, updatedImages)
      }
      reader.readAsDataURL(file)
    }
  }
  // ამ ფუნქციით ვამატებთ ფოტოს. ფაილს ვკითხულობთ და ვამატებთ სთეითში.
  return (
    <FieldArray name="variants">
      {/* FieldArray გვაძლევს საშუალებას ვიმუშაოთ სიებთან და გვაძლევს დამატება და წაშლის ფუნქციებს. name="variants" არის ის სია რომელზეც მუშაობა გვინდა. existing-product.json-ში ერთ-ერთი key არის variants რომლის მნიშვნელობაც არის სია, სწორედ ამ სიასთან გვინდა მუშაობა. */}
      {({ push, remove }) => (
        <>
          <div className="variants-header">
            <h1>Variants</h1>
            <button
              type="button"
              onClick={() =>
                push({
                  colorName: "",
                  stockQuantity: "",
                  images: [],
                  availableSizes: []
                })
              }
            >
              <Plus className="lucide-icon" /> Add Variant
              {/* ამ ღილაკით ვამატებთ existing-product.json-ში ახალ ობიექტს, სადაც საწყისი მნიშვნელობები ცარიელია */}
            </button>
          </div>

          {values.variants.map((variant, index) => (
            <div className="variants" key={index}>
              <div className="variant-details">
                <p>Variant Details</p>
                <button
                  className="remove-variant-btn"
                  onClick={() => remove(index)}
                >
                  <Trash className="lucide-icon" />
                </button>
                {/* remove(index) არის FieldArray-ს ფუნქცია რომელიც შლის ვარიანტს შესაბამისი ინდექსის მიხედვით */}
              </div>

              <div className="colorName-quantity-images">
                <div className="colorName">
                  <p>Color Name</p>
                  <Field
                    className="color-name-input"
                    name={`variants[${index}].colorName`}
                    type="text"
                  />
                </div>
                <div className="quantity">
                  <p>Stock Quantity</p>
                  <Field
                    className="stock-quantity-input"
                    name={`variants[${index}].stockQuantity`}
                    type="number"
                  />
                  {/* [${index}] გვეხმარება შესაბამისი ინდექსის შესაბამისი item შევცვალოთ ამ შემთხვევაში stockQuantity */}
                </div>
                <div className="uploadImages">
                  <p>Images</p>
                  <button
                    className="uploadImages-btn"
                    type="button"
                    onClick={() =>
                      document.getElementById(`image-upload-${index}`).click()
                    }
                  >
                    <Upload className="lucide-icon" /> Upload Images
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => handleImageChange(e, index)}
                    style={{ display: "none" }}
                    id={`image-upload-${index}`}
                  />
                  {/* ამ ინპუტით ვამატებთ ფოტოს. თვითონ ინპუტი არ ჩანს და ღილაკს რომ დავაჭერთ მაშინ შეგვიძლია ფოტოს დამატება */}
                </div>

                <div className="image-previews">
                  <p>Image Previews</p>
                  {variant.images.length > 0 && (
                    <div className="image-thumbnails">
                      {variant.images.map((image, id) => (
                        <div key={id} className="image-thumbnail">
                          <img src={image} />
                          <button
                            type="button"
                            onClick={() => {
                              const updatedImages = variant.images.filter(
                                (_, i) => i !== id
                              )
                              setFieldValue(
                                `variants[${index}].images`,
                                updatedImages
                              )
                            }}
                          >
                            <X className="lucide-icon" />
                          </button>
                          {/* ამ ღილაკით შეგვიძლია წავშალოთ ფოტო. id-ის მიხედვით ვპოულობთ ფოტოს სთეითში და ვშლით */}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="sizes">
                <div className="available-sizes">
                  <p>Available Sizes</p>
                  <button
                    type="button"
                    onClick={() =>
                      setFieldValue(`variants[${index}].availableSizes`, [
                        ...variant.availableSizes,
                        { mensSize: "", womensSize: "" }
                      ])
                    }
                  >
                    <Plus className="lucide-icon" /> Add Size
                    {/* ამ ღილაკით ვამატებთ ახალ ზომას. */}
                  </button>
                </div>

                {variant.availableSizes.map((size, sizeIndex) => (
                  <div className="men-women-size" key={sizeIndex}>
                    <div className="men-size">
                      <p>Men's Size</p>
                      <Field
                        className="mens-size-input"
                        name={`variants[${index}].availableSizes[${sizeIndex}].mensSize`}
                        type="number"
                      />
                    </div>
                    <div className="women-size">
                      <p>Women's Size</p>
                      <Field
                        className="womens-size-input"
                        name={`variants[${index}].availableSizes[${sizeIndex}].womensSize`}
                        type="number"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setFieldValue(
                          `variants[${index}].availableSizes`,
                          variant.availableSizes.filter(
                            (size, i) => i !== sizeIndex
                          )
                        )
                      }
                    >
                      <X className="lucide-icon" />
                    </button>
                    {/* ეს ღილაკი შლის ზომას შემდეგნაირად: ფილტრით აკეთებს ახალ სიას, სადაც შესაბამის ინდექსზე მყოფი ზომა აღარ იქნება */}
                  </div>
                ))}
              </div>

              <p className="size-summary-header">Size Summary</p>
              <div className="size-summary">
                {variant.availableSizes.map((size, i) => (
                  <div key={i}>
                    <p>
                      M {size.mensSize}/W {size.womensSize}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </FieldArray>
  )
}
