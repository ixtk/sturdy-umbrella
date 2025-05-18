import { useParams } from "react-router"
import { Formik, Form } from "formik"
import productData from "@/mock-data/existing-product.json"
import VariantsSection from "./Variants.jsx"
import ProductDetailsSection from "./ProductDetails.jsx"
import "./EditProduct.scss"

export function EditProductPage() {
  const { productId } = useParams()
  // useParams გვეხმარბა პროდუქტის id გამოვიყენოთ route-ში, მას გადააქცევს ცვლადად და საძიებო ველში მნიშვნელობას გამოიტანს.

  return (
    <div>
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
        // formik-ში გვიწერია default ობიექტი როგორი უნდა იყოს და გამოვიყენებთ default-ს თუ id-ს შესაბამისი პროდუქტი არ გვაქვს, თუ გვაქვს მოვძებნით და მასში შემავალ მნიშვნელობებს გამოვიყენებთ default-ად.
        enableReinitialize
        // ეს გვაძლევს უფლებას შევცვალოთ საწყისი მნიშვნელობები
      >
        {({ values, setFieldValue }) => (
          <Form>
            <ProductDetailsSection values={values} />
            <VariantsSection values={values} setFieldValue={setFieldValue} />
            <div className="save-changes-box">
              <button className="save-changes" type="submit">
                Save Changes
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
