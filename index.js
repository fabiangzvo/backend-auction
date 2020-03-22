const express = require('express');
const cors = require('cors');
const app = express();

const { config } = require('./config/index');
const authApi = require('./routes/auth.js');
const product = require('./routes/product.js');
const userOffertApi = require('./routes/userOffert.js');
const offert = require('./routes/Offert.js');
const server = app.listen(config.port, () => {
  console.log(`Listening http://localhost:${config.port}`);
})

const {
  logErrors,
  wrapErrors,
  errorHandler
} = require('./utils/middleware/errorHandlers.js');

const notFoundHandler = require('./utils/middleware/notFoundHandler');

// body parser
app.use(express.json());
app.use(cors())
// routes
authApi(app);
product(app);
userOffertApi(app);
offert(server);
// Catch 404
app.use(notFoundHandler);

// Errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);