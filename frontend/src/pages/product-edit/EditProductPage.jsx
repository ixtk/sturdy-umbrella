import { useParams } from "react-router"
import { Formik, Form } from "formik"
import productData from "@/mock-data/existing-product.json"
import VariantsSection from "./Variants.jsx"
import ProductDetailsSection from "./ProductDetails.jsx"
import "./EditProduct.scss"

export function EditProductPage() {
  const { productId } = useParams()

  return (
    <div className="container">
      <div className="form-section">
        <h1>Edit Product</h1>
        <Formik
          initialValues={
            productData.find(item => item.id === productId) || {
              productName: "",
              category: "",
              pricing: { regularPrice: "", salePrice: "" },
              onSale: false,
              variants: []
            }
          }
          enableReinitialize
        >
          {({ values, setFieldValue }) => (
            <Form className="form-section">
              <div className="card">
                <ProductDetailsSection values={values} />
              </div>

              <div className="card">
                <VariantsSection
                  values={values}
                  setFieldValue={setFieldValue}
                />
              </div>

              <div className="form-actions">
                <button className="btn btn-outline" type="button">
                  Cancel
                </button>
                <button className="btn btn-primary" type="submit">
                  Save Changes
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
