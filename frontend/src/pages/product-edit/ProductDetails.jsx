import { Field } from "formik"

export default function ProductDetailsSection({ values }) {
  return (
    <div className="form-section">
      <div className="form-group">
        <label>Product Name</label>
        <Field name="productName" type="text" />
      </div>

      <div className="form-group">
        <label>Category</label>
        <Field as="select" name="category">
          {values.categories?.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </Field>
      </div>

      <h2>Pricing</h2>
      <div className="form-row">
        <div className="form-group half">
          <label>Regular Price ($)</label>
          <Field name="pricing.regularPrice" type="number" />
        </div>
        <div className="form-group half">
          <div className="form-row">
            <div className="form-group">
              <label>Sale Price ($)</label>
              <Field name="pricing.salePrice" type="number" />
            </div>
            <div className="form-group" style={{ flex: 0 }}>
              <label>On Sale</label>
              <Field name="onSale">
                {({ field }) => (
                  <button
                    type="button"
                    className={`toggle-switch ${field.value ? "active" : ""}`}
                    onClick={() =>
                      field.onChange({
                        target: { name: "onSale", value: !field.value }
                      })
                    }
                    aria-label="Toggle sale status"
                  />
                )}
              </Field>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
