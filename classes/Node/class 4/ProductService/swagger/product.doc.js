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
 *           description: The auto-generated id of the product
 *         product_name:
 *           type: string
 *           description: The name of the product
 *         product_price:
 *           type: string
 *           description: The price of the product
 *         isInStock:
 *           type: boolean
 *           description: Stock availability
 *         category:
 *           type: string
 *           description: The category of the product
 *         product_description:
 *           type: string
 *           description: Description of the product
 *       example:
 *         product_name: T-shirt
 *         product_price: "19.99"
 *         isInStock: true
 *         category: Clothing
 *         product_description: A comfortable cotton t-shirt
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management APIs
 */

/**
 * @swagger
 * /shopApi/getAllProducts:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of all products
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: "<div><ul><li>Product 1</li>...</ul></div>"
 */

/**
 * @swagger
 * /shopApi/addProduct:
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product added
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /shopApi/updateProduct/{id}:
 *   patch:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The product ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: product updated
 *                 getUpdatedProduct:
 *                   $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /shopApi/deleteProduct/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The product ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: product deleted
 *       404:
 *         description: Product not found
 */
