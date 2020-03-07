const joi = require('@hapi/joi');

const productIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const productNameSchema = joi.string().max(100);
const productDescriptionSchema = joi.string().max(300);;
const productImageSchema = joi.string().uri();
const productPriceSchema = joi
  .number()
  .min(1)
  .max(1000000);
const productVisibleSchema = joi.boolean();
const productAuctionSchema = joi.boolean();

const createProductSchema = {
  name: productNameSchema.required(),
  description: productDescriptionSchema.required(),
  image_url: productImageSchema.required(),
  price: productPriceSchema.required(),
  visible: productVisibleSchema.required(),
  auction: productAuctionSchema.required()
};

const updateProductSchema = {
  name: productNameSchema.required(),
  description: productDescriptionSchema.required(),
  image_url: productImageSchema.required(),
  price: productPriceSchema.required(),
  visible: productVisibleSchema.required(),
  auction: productAuctionSchema.required()
};

module.exports = {
  productIdSchema,
  createProductSchema,
  updateProductSchema
};
