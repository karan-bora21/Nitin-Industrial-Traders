const express = require('express');
const { createBill, getBills, deleteBill, updateBill, searchBills, getCompanyNames, addPartyName, getMaterialNames, addMaterialName, registerUser,  loginUser} = require("../controllers/inventoryControllers");
const router = express.Router();


//Register
router.post('/register', registerUser);

//Login
router.post('/login', loginUser);

//GET all bill
router.get('/', getBills);

//Post a bill
router.post('/', createBill);

//Search a bill
router.post('/searchBill', searchBills);

//Delete a bill
router.delete('/:id', deleteBill);

//Update a bill
router.patch('/:id', updateBill);

//Get all company names
router.get('/getCompanyNames', getCompanyNames);

//Add a new company
router.post('/addNewCompany', addPartyName);

//Add pre-existing companies
// router.get('/addCompany', addCompanyName);

//Get all item names
router.get('/getMaterialNames', getMaterialNames);

//add pre-existing material
// router.get('/addMaterial', addMaterialName);

//Add a new material
router.post('/addNewMaterial', addMaterialName);

module.exports = router;