import { useParams } from "react-router-dom"
import { Formik, Form, Field, FieldArray } from "formik"
// field ასრულებს ინპუტის ფუნქციას, რომელიც პირდაპირ formik-ს უკავშირდება. name ატრიბუტში ვწერთ key-ს სახელს, რომელიც გვინდა რომ შეცვალოს მოცემულმა ინპუტმა.
import productData from "./fake.json"
import "./EditProduct.scss"

export default function EditProductPage() {
  const { productId } = useParams()
  // useParams გვეხმარბა პროდუქტის id გამოვიყენოთ route-ში, მას გადააქცევს ცვლადად და საძიებო ველში მნიშვნელობას გამოიტანს.
  return (
    <div>
      <h1>Edit Product</h1>
      <Formik
        initialValues={productData.find(item => item.id === productId) || {
          productName: "",
          category: "",
          pricing: { regularPrice: "", salePrice: "" },
          onSale: false,
          variants: [],
        }}
        // formik-ში გვიწერია default ობიექტი როგორი უნდა იყოს და გამოვიყენებთ default-ს თუ id-ს შესაბამისი პროდუქტი არ გვაქვს, თუ გვაქვს მოვძებნით და მასში შემავალ მნიშვნელობებს გამოვიყენებთ default-ად.
        enableReinitialize
        // ეს გვაძლევს უფლებას შევცვალოთ საწყისი მნიშვნელობები
      >
        {({ values, setFieldValue }) => (
          <Form>
            <p className="product-name-header">Product Name</p>
            <Field name="productName" className="product-name" type="text" />

            <p className="category-header">Category</p>
            <Field as="select" className="category-select" name="category">
              {values.categories?.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </Field>

            <h1 className="pricing-header">Pricing</h1>
            <div className="pricing">
              <div className="regular-price">
                <p>Regular Price ($)</p>
                <Field className="regular-price-input" name="pricing.regularPrice" type="text" />
              </div>
              <div className="sale-price">
                <p>Sale Price ($)</p>
                <Field className="sale-price-input" name="pricing.salePrice" type="text" />
              </div>
              <div
                className="on-sale"
                onClick={() => setFieldValue("onSale", !values.onSale)}
              >
                <div className={`toggle-switch ${values.onSale ? "active" : ""}`}></div>
                <p>{values.onSale ? "On Sale" : "Not on Sale"}</p>
              </div>
            </div>

            <FieldArray name="variants">
            {/* FieldArray გვაძლევს საშუალებას ვიმუშაოთ სიებთან და გვაძლევს დამატება და წაშლის ფუნქციებს. name="variants" არის ის სია რომელზეც მუშაობა გვინდა. fake.json-ში ერთ-ერთი key არის variants რომლის მნიშვნელობაც არის სია, სწორედ ამ სიასთან გვინდა მუშაობა. */}
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
                      {/* ამ ღილაკით ვამატებთ fake.json-ში ახალ ობიექტს, სადაც საწყისი მნიშვნელობები ცარიელია */}
                      <i className="fi fi-rr-plus-small"></i> Add Variant
                    </button>
                  </div>  
                  {values.variants.map((variant, index) => (
                    <div className="variants" key={index}>
                      <div className="variant-details">
                        <p>Variant Details</p>
                        <button className="remove-variant-btn" onClick={() => remove(index)}>
                        {/* remove(index) არის FieldArray-ს ფუნქცია რომელიც შლის ვარიანტს შესაბამისი ინდექსის მიხედვით */}
                          <i className="fi fi-rs-trash"></i>
                        </button>
                      </div>

                      <div className="colorName-quantity-images">
                        <div className="colorName">
                          <p>Color Name</p>
                          <Field className="color-name-input" name={`variants[${index}].colorName`} type="text" />
                        </div>
                        <div className="quantity">
                          <p>Stock Quantity</p>
                          <Field className="stock-quantity-input" name={`variants[${index}].stockQuantity`} type="text" />
                          {/* [${index}] გვეხმარება შესაბამისი ინდექსის შესაბამისი item შევცვალოთ ამ შემთხვევაში stockQuantity  */}
                        </div>
                        <div className="uploadImages">
                          <p>Images</p>
                          <button type="button">
                            <i className="fi fi-rr-upload"></i> Upload Images
                          </button>
                        </div>
                        <div className="image-previews">
                          <p>Image Previews</p>
                        </div>
                      </div>

                      <div className="sizes">
                        <div className="available-sizes">
                          <p>Available Sizes</p>
                          <button
                            type="button"
                            onClick={() => setFieldValue(`variants[${index}].availableSizes`, [...variant.availableSizes, { mensSize: "", womensSize: "" }])}
                          >
                          {/* ამ ღილაკით ვამატებთ ახალ ზომას. */}
                            <i className="fi fi-rr-plus-small"></i> Add Size
                          </button>
                        </div>
                        {variant.availableSizes.map((size, sizeIndex) => (
                          <div className="men-women-size" key={sizeIndex}>
                            <div className="men-size">
                              <p>Men's Size</p>
                              <Field className="mens-size-input" name={`variants[${index}].availableSizes[${sizeIndex}].mensSize`} type="text" />
                            </div>
                            <div className="women-size">
                              <p>Women's Size</p>
                              <Field className="womens-size-input" name={`variants[${index}].availableSizes[${sizeIndex}].womensSize`} type="text" />
                            </div>
                            <button
                              type="button"
                              onClick={() => setFieldValue(`variants[${index}].availableSizes`, variant.availableSizes.filter((size, i) => i !== sizeIndex))}
                            >
                              <i className="fi fi-rr-cross-small"></i>
                            </button>
                            {/* ეს ღილაკი შლის ზომას შემდეგნაირად: ფილტრით აკეთებს ახალ სიას, სადაც შესაბამის ინდექსზე მყოფი ზომა აღარ იქნება */}
                          </div>
                        ))}
                      </div>

                      <p className="size-summary-header">Size Summary</p>
                      <div className="size-summary">
                        {variant.availableSizes.map((size, i) => (
                          <div key={i}>
                            <p>M {size.mensSize}/W {size.womensSize}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </FieldArray>

            <div className="save-changes-box">
              <button className="save-changes" type="submit">Save Changes</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
