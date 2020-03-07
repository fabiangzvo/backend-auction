const mongodb = require('../lib/mongo')

class productService {
  constructor() {
    this.collection = "products";
    this.mongoDB = new mongodb();
  }

  /***
   * Function to search a specific product
   * @param {ObjectId} productId id of product to search
   */
  async getProduct({ productId }) {
    const movie = await this.mongoDB.get(this.collection, productId);
    return movie || {};
  }
  /**
   * Function to create a new product
   * @param {Object} product object of product to persist 
   * @return ObjectId
   */
  async createProduct({ product }) {
    //get all variables of product
    const { name, description, image_url, price, status, visible, auction } = product;
    //create new record and get the objectId
    const createdUserId = await this.mongoDB.create(this.collection, {
      name,
      description,
      image_url,
      price,
      status,
      visible,
      auction
    })

    return createdUserId;
  }
}

module.exports = productService;