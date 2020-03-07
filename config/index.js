require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3000,
  cors: process.env.CORS,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  DefaultAdminPassword: process.env.DEFAULT_ADMIN_PASSWORD,
  DefaultUserPassword: process.env.DEFAULT_USER_PASSWORD,
  AuthJwtSecret: process.env.AUTH_JWT_SECRET,
  PublicApiKeyToken: process.env.PUBLIC_API_KEY_TOKEN,
  AdminApiKeyToken: process.env.ADMIN_API_KEY_TOKEN
};

module.exports = { config };
