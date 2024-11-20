const fs = require('fs');
const { Inventory, CompanyName, MaterialName } = require('../models/InventoryModel');
const { search } = require('../routes/inventoryRoutes');
const CsvParser = require('json2csv').Parser;

//get all bill
const getBills = async(req, res) => {
    const bills = await Inventory.find({}).sort({createdAt: -1})

    res.status(200).json(bills)
}

//enter new bill
const createBill = async(req, res) => {
    const {
        PartyName, InvoiceDate, InvoiceNumber, Transporter, LRNumber, Material, Quantity, NumberOfBox
    } = req.body;

    const noOfBills = await Inventory.find({});
    const GRNNumber = noOfBills.length + 1;

    try {
        const bill = await Inventory.create({
            GRNNumber, PartyName, InvoiceDate, InvoiceNumber, Transporter, LRNumber, Material, Quantity, NumberOfBox
        });
        res.status(200).json(bill);
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

//search a bill
const searchBills = async(req, res) => {
    const {GRNNumber, PartyName, MaterialName} = req.body

    const bills = await Inventory.find({$or: [{GRNNumber: GRNNumber}, {PartyName: PartyName}, {Material: MaterialName}]});

    if(!bills) {
        return res.status(400).json({error: "No such bill"})
    }

    res.status(200).json(bills)
}

//delete a bill
const deleteBill = async(req, res) => {
    const GRNNumber = parseInt(req.params.id)

    const bill = await Inventory.findOneAndDelete({GRNNumber: GRNNumber})

    if(!bill) {
        return res.status(400).json({error: "No such bill"})
    }

    res.status(200).json(bill)
}

//update a bill
const updateBill = async(req, res) => {
    const GRNNumber = parseInt(req.params.id)

    const bill = await Inventory.findOneAndUpdate({GRNNumber: GRNNumber}, {...req.body})

    if(!bill) {
        return res.status(400).json({error: "No such workout"})
    } 

    res.status(200).json(bill)
}

//add party to database
const addPartyName = async(req, res) => {
    try {
        const {party} = req.body;

        console.log(req.body)

        const searchForCompany = await CompanyName.find({CompanyName: party});

        console.log(searchForCompany);

        if(searchForCompany.length === 0) {
            const NewParty = await CompanyName.create({
                CompanyName: party
            });

            res.status(200).json(NewParty);
        }
        else {
            res.status(409).json({ message: "Party already exists" });
        }
        
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

//get all company names
const getCompanyNames = async(req, res) => {
    const companyNames = await CompanyName.find({}).sort({CompanyName: 1});

    res.status(200).json(companyNames);
}

//add company name
// const addCompanyName = async(req, res) => {
//     const jsonData = JSON.parse(fs.readFileSync('csvjson.json', 'utf-8'));

//     const companyData = jsonData.map(item => ({CompanyName: item.Name}));

//     CompanyName.insertMany(companyData)
//     .then(() => {
//       console.log('Company data inserted successfully!');
//     })
//     .catch(err => {
//       console.error('Error inserting data:', err);
//     });
// }

//get all material names
const getMaterialNames = async(req, res) => {
    const materialNames = await MaterialName.find({}).sort({MaterialName: 1});

    res.status(200).json(materialNames);
}

//add material name
// const addMaterialName = async(req, res) => {
//         const jsonData = JSON.parse(fs.readFileSync('material_json.json', 'utf-8'));

//         const materialData = jsonData.map(item => ({MaterialName: item.Name}))
//         MaterialName.insertMany(materialData)
//         .then(() => {
//           res.status(200).json({message: "Items entered successfully"})
//         })
//         .catch(err => {
//           res.send(400).json({error: "Error entering data"})
//         });
// }

module.exports = { createBill, getBills, deleteBill, updateBill, searchBills, getCompanyNames, addPartyName, getMaterialNames }