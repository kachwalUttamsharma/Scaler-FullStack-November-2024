// swagger.js
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ecommerce Product API",
      version: "1.0.0",
      description: "API for managing products in a shop",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./server.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
