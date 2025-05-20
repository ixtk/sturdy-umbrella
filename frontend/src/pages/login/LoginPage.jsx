import { useContext } from "react"
import { AuthContext } from "@/lib/AuthContext"
import { useNavigate } from "react-router"
import { Form } from "@/shared/Form"
import { string, object } from "yup"
import { useFormik } from "formik"
import { axiosInstance } from "@/lib/axiosInstance"

export const LoginPage = () => {
  const { setAuthState } = useContext(AuthContext)
  const navigate = useNavigate()

  const loginSchema = object({
    email: string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email format"
      )
      .required(),
    password: string().min(8).required()
  })

  const loginUser = async values => {
    const response = await axiosInstance.post("/users/login", values)
    const json = response.data.user

    setAuthState({
      user: {
        username: json.username,
        email: json.email
      }
    })

    navigate("/")
  }

  const form = useFormik({
    initialValues: {
      password: "",
      email: ""
    },
    onSubmit: loginUser,
    validationSchema: loginSchema
  })

  const fields = [
    { name: "email", placeholder: "abc@company.com", type: "text" },
    { name: "password", placeholder: "", type: "password" }
  ]

  return (
    <Form
      description="Enter your credentials to access your account"
      title="Login"
      onSubmit={loginUser}
      fields={fields}
      form={form}
    />
  )
}
