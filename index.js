const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./src/routes/todos.route');
const swaggerRoute = require('./src/swagger/swagger.route');
const port = { port: 3003 };

process.env.NODE_ENV !== 'production'
  ? (require('dotenv').config(),
    (port.port = 3003),
    (port.url = process.env.devURL))
  : ((port.port = process.env.PORT), (port.url = port.port));

const connectToDatabase = require('./src/database/database');

connectToDatabase();

app.use(express.json());
app.use(cors());
app.use('/bicycles', routes);
app.use('/api-docs', swaggerRoute);

app.listen(port.port, () => {
  console.log(`Server listening on ${port.port}`);
});

/*    npm run dev     */
