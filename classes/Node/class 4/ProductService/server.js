const express = require("express");
const connectDB = require("./config/db");
const app = express();
const port = 3000;
const productRoutes = require("./routes/productRoutes");
const errorHandler = require("./middlewares/errorHandler");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swagger");

connectDB();

app.use(express.json());

app.use("/shopApi/v1/", productRoutes);

app.use(errorHandler);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.listen(port, () => {
  console.log(`server is running on port : ${port}`);
});
