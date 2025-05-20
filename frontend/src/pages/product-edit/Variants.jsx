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
      {({ push, remove }) => (
        <div className="variants">
          <div className="variants-header">
            <h2>Variants</h2>
            <button
              className="btn btn-primary btn-with-icon"
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
              <Plus size={18} /> <span>Add Variant</span>
            </button>
          </div>

          {values.variants.map((variant, index) => (
            <div className="variant-section" key={index}>
              <div className="variant-header">
                <h3>Variant Details</h3>
                <button
                  className="btn btn-icon remove-btn btn-danger"
                  type="button"
                  onClick={() => remove(index)}
                >
                  <Trash size={18} />
                </button>
              </div>

              <div className="form-row wrap">
                <div className="form-group third">
                  <label>Color Name</label>
                  <Field name={`variants[${index}].colorName`} type="text" />
                </div>
                <div className="form-group third">
                  <label>Stock Quantity</label>
                  <Field
                    name={`variants[${index}].stockQuantity`}
                    type="number"
                  />
                </div>
                <div className="form-group third">
                  <label>Images</label>
                  <button
                    className="btn btn-outline btn-with-icon"
                    type="button"
                    onClick={() =>
                      document.getElementById(`image-upload-${index}`).click()
                    }
                  >
                    <Upload size={18} /> <span>Upload Images</span>
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => handleImageChange(e, index)}
                    style={{ display: "none" }}
                    id={`image-upload-${index}`}
                  />
                </div>
                {variant.images.length > 0 && (
                  <div className="form-group">
                    <label>Image Previews</label>
                    <div className="image-grid">
                      {variant.images.map((image, id) => (
                        <div key={id} className="image-item">
                          <img
                            src={image}
                            alt={`Variant ${index} preview ${id}`}
                          />
                          <button
                            type="button"
                            className="btn btn-icon btn-danger remove-image"
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
                            <X size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}{" "}
                <FieldArray name={`variants[${index}].availableSizes`}>
                  {({ push, remove }) => (
                    <div className="form-group">
                      <label>Available Sizes</label>

                      {variant.availableSizes.map((size, sizeIndex) => (
                        <div key={sizeIndex} className="sizes-row">
                          <div className="form-group">
                            <label>Men's Size</label>
                            <Field
                              name={`variants[${index}].availableSizes[${sizeIndex}].mensSize`}
                              type="text"
                            />
                          </div>
                          <div className="form-group">
                            <label>Women's Size</label>
                            <Field
                              name={`variants[${index}].availableSizes[${sizeIndex}].womensSize`}
                              type="text"
                            />
                          </div>
                          <button
                            type="button"
                            className="btn btn-icon btn-danger remove-btn"
                            onClick={() => remove(sizeIndex)}
                          >
                            <X size={18} />
                          </button>
                        </div>
                      ))}

                      <button
                        type="button"
                        className="btn btn-outline btn-with-icon add-size"
                        onClick={() => push({ mensSize: "", womensSize: "" })}
                      >
                        <Plus size={18} /> <span>Add Size</span>
                      </button>

                      {variant.availableSizes.length > 0 && (
                        <div className="size-summary">
                          <label className="size-summary-label">
                            Size Summary
                          </label>
                          <div className="size-badges">
                            {variant.availableSizes.map((size, idx) => (
                              <div key={idx} className="badge badge-outline">
                                <span>
                                  {size.mensSize && `M ${size.mensSize}`}
                                  {size.mensSize && size.womensSize && " / "}
                                  {size.womensSize && `W ${size.womensSize}`}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </FieldArray>
              </div>
            </div>
          ))}
        </div>
      )}
    </FieldArray>
  )
}
