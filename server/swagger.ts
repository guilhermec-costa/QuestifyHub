const swaggerAutogen = require('swagger-autogen')()

const docOutputFile = "./docs.json"
const routesSource = [
    /* "./src/routes/users", */
    /* "./src/routes/auth", */
    "./src/routes/index"
]

swaggerAutogen(docOutputFile, routesSource);
