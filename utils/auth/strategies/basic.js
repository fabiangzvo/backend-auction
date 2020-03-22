const passport = require('passport')
const { BasicStrategy } = require('passport-http')
const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')
const UserService = require('../../../services/users')

passport.use(new BasicStrategy(async (email, password, cb) => {

    const userService = new UserService()
    try {
        const user = await userService.getUser({ email })

        if (!user) {
            return cb(boom.unauthorized(), false)
        }
        var s = bcrypt.compareSync(password, user['password'])

        if (!(s)) {
            return cb(boom.unauthorized(), false)
        }
        delete user.password

        return cb(null, user)
    } catch (e) {
        return cb(e)
    }
}))