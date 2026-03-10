require('dotenv').config();
const express = require('express')
const cors = require('cors');
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./swagger')

const testRoutes = require('./routes/test.routes');
const usersRoutes = require('./routes/users.routes');

const app = express()

// Global middlewares.
app.use(cors({
  origin: 'http://localhost:8000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', testRoutes);
app.use('/api/users', usersRoutes);

/*app.get('/', (req, res) => {
  res.send('API funcionando 🚀')
})*/

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`)
})
