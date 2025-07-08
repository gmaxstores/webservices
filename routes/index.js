const express = require('express');
const router = new express.Router();
const baseController = require("../controllers/baseController");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

router.get("/", baseController.getIndex);

//route to api documentation
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));


module.exports = router;