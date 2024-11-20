const express = require('express');
const { createBill, getBills, deleteBill, updateBill, searchBills, getCompanyNames, addPartyName, getMaterialNames } = require("../controllers/inventoryControllers");
const router = express.Router();

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

module.exports = router;