const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const UsersService = require('../services/users');
const validationHandler = require('../utils/middleware/validationHandler');

const { createUserSchema } = require('../utils/schemas/users');

const { config } = require('../config');

// Basic strategy
require('../utils/auth/strategies/basic');

function authApi(app) {
    const router = express.Router();
    app.use('/api/auth', router);

    const usersService = new UsersService();

    router.post('/sign-in', async function (req, res, next) {
        console.log('melo')
        passport.authenticate('basic', function (error, user) {
            try {
                if (error || !user) {
                    next(boom.unauthorized());
                }

                req.login(user, { session: false }, async function (error) {
                    if (error) {
                        next(error);
                    }

                    const { _id: id, name, email, isAdmin } = user;

                    const payload = {
                        sub: id,
                        name,
                        email
                    };

                    const token = jwt.sign(payload, config.authJwtSecret, {
                        expiresIn: '15m'
                    });

                    return res.status(200).json({ token, user: { id, name, email, isAdmin } });
                });
            } catch (error) {
                next(error);
            }
        })(req, res, next);
    });

    router.post('/sign-up', validationHandler(createUserSchema), async function (
        req,
        res,
        next
    ) {
        const { body: user } = req;

        try {
            const createdUserId = await usersService.createUser({ user });

            res.status(201).json({
                data: createdUserId,
                message: 'user created'
            });
        } catch (error) {
            next(error);
        }
    });
}

module.exports = authApi;