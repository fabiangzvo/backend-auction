const express = require('express');
const UserOffertService = require('../services/userOffert');
const validationHanlder = require('../utils/middleware/validationHandler');
const passport = require('passport');
const { productIdSchema } = require('../utils/schemas/product');
const { userId } = require('../utils/schemas/users');
const { createUserMovieSchema } = require('../utils/schemas/productOffert')

//JWT strategy
require('../utils/auth/strategies/jwt');

function userOffertApi(app) {
  const router = express.Router();

  app.use('/api/user_offert', router);
  const userOffertService = new UserOffertService()

  router.get('/',
    passport.authenticate('jwt', { session: false }),
    validationHanlder({ userId: userId, productId: productIdSchema }, 'query'),
    async function (req, res, next) {
      const { userId, productId } = req
      try {
        const userOffert = await userOffertService.getUserOffert({ userId, productId })

        res.status(200).json({
          data: userOffert,
          message: 'user offert listed'
        })
      } catch (e) {
        next(e);
      };
    });

  router.post('/',
    passport.authenticate('jwt', { session: false }),
    validationHanlder(createUserMovieSchema), async (req, res, next) => {

      const { body: userOffert } = req

      try {
        const createdUserProductId = await userOffertService.createUserOffert({
          userOffert
        })

        res.status(200).json({
          data: createdUserProductId,
          message: "user offert created"
        })
      } catch (e) {
        next(e)
      }
    })
}

module.exports = userOffertApi