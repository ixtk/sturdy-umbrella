import express from "express"

const app = express()
const port = 3000

app.get("/", (req, res) => {
  return res.json({ message: "Hello World" })
})

app.listen(port, () => console.log(`Running on port ${port}`))
