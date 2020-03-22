const mongoLib = require('../lib/mongo')

class UserOfferService {
  constructor() {
    this.collection = 'user-offert';
    this.mongoDB = new mongoLib();
  }

  async getUserOffert({ userId, productId }) {
    const query = (userId && productId) && { userId, productId };
    const userOffert = await this.mongoDB.getAll(this.collection, query);

    return userOffert || [];
  }

  async createUserOffert({ userOffert }) {
    const createUserOffert = await this.mongoDB.create(this.collection, userOffert);
    return createUserOffert;
  }
}

module.exports = UserOfferService;