const express = require('express');
const ProductService = require('../services/products');
const passport = require('passport');
const {
  productIdSchema,
  createProductSchema,
  updateProductSchema
} = require('../utils/schemas/product');

const validationHandler = require('../utils/middleware/validationHandler');

const cacheResponse = require('../utils/cacheResponse');
const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS
} = require('../utils/time');
//JWT strategy
require('../utils/auth/strategies/jwt');

function moviesApi(app) {
  const router = express.Router();
  app.use('/api/product', router);

  const productService = new ProductService();

  router.get('/',
    passport.authenticate('jwt', { session: false }),
    async function (req, res, next) {
      cacheResponse(res, FIVE_MINUTES_IN_SECONDS);

      try {
        const products = await productService.getProducts();

        res.status(200).json({
          data: products,
          message: 'product listed'
        });
      } catch (err) {
        next(err);
      }
    });

  router.get('/',
    passport.authenticate('jwt', { session: false }),
    async function (req, res, next) {
      cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
      const { tags } = req.query;

      try {
        const products = await productService.getProduct({ tags });

        res.status(200).json({
          data: products,
          message: 'product listed'
        });
      } catch (err) {
        next(err);
      }
    });

  router.get(
    '/:productId',
    passport.authenticate('jwt', { session: false }),
    validationHandler({ productId: productIdSchema }, 'params'),
    async function (req, res, next) {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
      const { productId } = req.params;

      try {
        const product = await productService.getProduct({ productId });

        res.status(200).json({
          data: product,
          message: 'product retrieved'
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post('/',
    passport.authenticate('jwt', { session: false }),
    validationHandler(createProductSchema), async function (
      req,
      res,
      next
    ) {
    const { body: product } = req;
    try {
      const createdProductId = await productService.createProduct({ product });

      res.status(201).json({
        data: createdProductId,
        message: 'product created'
      });
    } catch (err) {
      next(err);
    }
  });

  router.put(
    '/:productId',
    passport.authenticate('jwt', { session: false }),
    validationHandler({ productId: productIdSchema }, 'params'),
    validationHandler(updateProductSchema),
    async function (req, res, next) {
      const { productId } = req.params;
      const { body: product } = req;

      try {
        const updatedProductId = await productService.updateProduct({
          productId,
          product
        });

        res.status(200).json({
          data: updatedProductId,
          message: 'product updated'
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = moviesApi;
