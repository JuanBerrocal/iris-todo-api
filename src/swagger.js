const swaggerJSDoc = require('swagger-jsdoc')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Iris',
      version: '1.0.0',
      description: 'Documentación de la API del backend'
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ]
  },
  apis: ['./src/routes/*.js'] // dónde leer los comentarios
}

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
