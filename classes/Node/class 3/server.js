const express = require("express");
const port = 3000;
const app = express();
const mongoose = require("mongoose");
const swaggerSpec = require("./swagger");
const swaggerUi = require("swagger-ui-express");

app.use(express.json());

const errorHandler = (err, req, res, next) => {
  res.status(res.statusCode || 404).json({
    message: err.message,
  });
};

mongoose
  .connect(
    "mongodb+srv://kachwalsharma1:kn3mjWY6bcPLTnb8@cluster0.wdlkgvp.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Database is connected Successfully");
  })
  .catch((err) => {
    console.log("Database connection error ", err);
  });

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - product_name
 *         - product_price
 *         - isInStock
 *         - category
 *         - product_description
 *       properties:
 *         id:
 *           type: string
 *         product_name:
 *           type: string
 *         product_price:
 *           type: number
 *         isInStock:
 *           type: boolean
 *         category:
 *           type: string
 *         product_description:
 *           type: string
 */
const productSchema = new mongoose.Schema(
  {
    product_name: { type: String, required: true },
    product_price: { type: Number, required: true },
    isInStock: { type: Boolean, required: true },
    category: { type: String, required: true },
    product_description: { type: String, required: true },
  },
  { timestamps: true }
);

const productModel = mongoose.model("product", productSchema);

app.get("/", (req, res) => {
  res.send("Hello From Express");
});

/**
 * @swagger
 * /ecommerce/getAllProducts:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
app.get("/ecommerce/getAllProducts", async (req, res) => {
  try {
    const allProducts = await productModel.find();
    const html = `
    ${allProducts
      .map(
        (product) => `<div>
    <ul>
        <li>${product.product_name}</li>
        <li>${product.product_price}</li>
        <li>${product.isInStock}</li>
        <li>${product.category}</li>
    </ul>
    </div>`
      )
      .join("")}
    `;
    res.send(html);
  } catch (err) {
    res.status(400).json({ message: error?.message });
  }
});

/**
 * @swagger
 * /ecommerce/addProduct:
 *   post:
 *     summary: Add a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product added successfully
 *       400:
 *         description: Bad request
 */
app.post("/ecommerce/addProduct", async (req, res) => {
  try {
    const {
      product_name,
      product_price,
      isInStock,
      category,
      product_description,
    } = req?.body;
    const product = await productModel.create({
      product_name,
      product_price,
      isInStock,
      category,
      product_description,
    });
    res.status(201).json({ message: "Product Added", product });
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
});

app.patch("/ecommerce/updateProduct/:id", async (req, res) => {
  try {
    const Id = req.params.id;
    const product = await productModel.findByIdAndUpdate(Id, req.body);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
    }
    const getUpdatedProduct = await productModel.findById(Id);
    res.status(200).json({ message: "product updated", getUpdatedProduct });
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
});

app.delete("/ecommerece/deleteProduct/:id", async (req, res, next) => {
  try {
    const Id = req.params.id;
    const product = await productModel.findByIdAndDelete(Id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "product deleted" });
  } catch (error) {
    res.status(404);
    next(error);
  }
});

app.use(errorHandler);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.listen(port, () => {
  console.log(`Server is runnning on ${port}`);
});
