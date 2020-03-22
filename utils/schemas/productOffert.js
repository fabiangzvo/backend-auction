const joi = require('@hapi/joi');

const { productIdSchema } = require('./product');
const { userId } = require('./users');

const userProductIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const productPriceSchema = joi
  .number()
  .min(1)
  .max(1000000);

const createUserMovieSchema = {
  userId: userId.required(),
  productId: productIdSchema.required(),
  price_offert: productPriceSchema.required()
}

module.exports = {
  userProductIdSchema,
  createUserMovieSchema
}