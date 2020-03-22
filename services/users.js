const mongodb = require('../lib/mongo')
const bcrypt = require('bcrypt')

class userService {
    constructor() {
        this.collection = "users";
        this.mongoDB = new mongodb();
    }
    async getUser({ email }) {
        const [user] = await this.mongoDB.getAll(this.collection, { email });
        return user;
    }

    async createUser({ user }) {
        const { name, email, password, isAdmin } = user;
        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUserId = await this.mongoDB.create(this.collection, {
            name,
            email,
            password: hashedPassword,
            isAdmin
        })

        return createdUserId;
    }
}

module.exports = userService;