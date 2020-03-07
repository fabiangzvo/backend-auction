const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const boom = require('@hapi/boom')
const UsersService = require('../../../services/users')
const { config } = require('../../../config')
/**
 * Encargado de manejar la estrategia implementada con passportjs}
 * con los tokens
 */
passport.use(new Strategy({
    secretOrKey: config.authJwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
},
    async (tokenPayLoad, cb) => {
        const usersService = new UsersService();

        try {
            const user = usersService.getUser({
                email: tokenPayLoad
            })

            if (!user) return cb(boom.unauthorized(), false)

            delete user.password

            cb(null, { ...user })
        } catch (e) {
            cb(e)
        }
    }
))