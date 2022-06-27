const express = require("express");
const router = express.Router();
const assinController = require('../controllers/assignments-controller');
const bodyParser = require('body-parser');

router.post('/add',bodyParser.json(),assinController.add);
router.put('/update',bodyParser.json(),assinController.update);
router.get('/getById/:id',assinController.getById);
router.get('/getByIdAssign/:id',assinController.getByIdAssign);
 
module.exports = router;