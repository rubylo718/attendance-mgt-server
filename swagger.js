const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endPointFiles = ['./app.js']

swaggerAutogen(outputFile, endPointFiles)