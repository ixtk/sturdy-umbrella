import { Field } from "formik"

export default function ProductDetailsSection({ values }) {
  return (
    <>
      <p className="product-name-header">Product Name</p>
      <Field name="productName" className="product-name" type="text" />

      <p className="category-header">Category</p>
      <Field as="select" className="category-select" name="category">
        {values.categories?.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </Field>

      <h1 className="pricing-header">Pricing</h1>
      <div className="pricing">
        <div className="regular-price">
          <p>Regular Price ($)</p>
          <Field
            className="regular-price-input"
            name="pricing.regularPrice"
            type="number"
          />
        </div>
        <div className="sale-price">
          <p>Sale Price ($)</p>
          <Field
            className="sale-price-input"
            name="pricing.salePrice"
            type="number"
          />
        </div>
      </div>
    </>
  )
}
