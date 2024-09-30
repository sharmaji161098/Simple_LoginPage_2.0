const { Router } = require('express');
const controller = require('./controller');

const router = Router();

//ROUTES//

//add employee
router.post('/addEmp', controller.addEmp);

//---View Employee
router.get('/getEmp', controller.getEmp);

//view client by user_id
router.get('/getEmpByID', controller.getEmpByID);

//View employy by email
router.post('/getEmpByEmail', controller.getEmpByEmail);

//sending to server
router.post('/validateEmp', controller.validateEmp);

//update client
router.put('/updateEmp', controller.updateEmp);

module.exports = router;
