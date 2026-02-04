const express = require('express')
const testRoutes = require('./routes/test.routes');
const usersRoutes = require('./routes/users.routes');

const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./swagger')

const app = express()
const PORT = 3000

app.use(express.json());

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', testRoutes);
app.use('/api/users', usersRoutes);

/*app.get('/', (req, res) => {
  res.send('API funcionando 🚀')
})*/

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
