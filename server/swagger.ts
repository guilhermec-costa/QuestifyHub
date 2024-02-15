const swaggerAutogen = require('swagger-autogen')()

const docOutputFile = "./docs.json"
const routesSource = ["./src/routes/users"]

swaggerAutogen(docOutputFile, routesSource);
