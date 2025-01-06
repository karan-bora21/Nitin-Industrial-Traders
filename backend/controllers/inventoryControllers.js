const fs = require('fs');
const { User, Inventory, CompanyName, MaterialName } = require('../models/InventoryModel');
const { search } = require('../routes/inventoryRoutes');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//register
const registerUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create new user
        const NewUser = await User.create({
            username: username,
            password: hashedPassword
        });
        console.log(NewUser)


        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

//login
const loginUser = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(400).json({ message: 'User not found. Please register first.' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid password' });
      }
  
      // Create a JWT token
      const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
      console.log(token);
  
      res.status(200).json({ message: 'Login successful', token: token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//get all bill
const getBills = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        const bills = await Inventory.find(
            startDate && endDate
                ? { InvoiceDate: { $gte: startDate, $lte: endDate } }
                : {} // If no date range, fetch all documents
            )
            .sort({ GRNNumber: -1 }) // Sort by 'createdAt' in descending order
            .limit(startDate && endDate ? 0 : 10);

        res.status(200).json(bills);
    } catch (error) {
        console.error("Error fetching bills:", error);
        res.status(500).json({ error: "An error occurred while fetching bills." });
    }
};

//enter new bill
const createBill = async(req, res) => {
    const {
        PartyName, InvoiceDate, InvoiceNumber, InvertDate, Transporter, LRNumber, Material, Quantity, NumberOfBox
    } = req.body;

    const noOfBills = await Inventory.find({});
    const GRNNumber = noOfBills.length + 1;

    try {
        const bill = await Inventory.create({
            GRNNumber, PartyName, InvoiceDate, InvoiceNumber, InvertDate, Transporter, LRNumber, Material, Quantity, NumberOfBox
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

//search bill by GRN Number
const getBillByGRN = async (req, res) => {
    const { GRNNumber } = req.params;

    try {
        const bill = await Inventory.findOne({ GRNNumber });
        if (!bill) {
            return res.status(404).json({ error: "Bill not found" });
        }
        res.status(200).json(bill);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


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
    const { GRNNumber } = req.params;

    try {
        const updatedBill = await Inventory.findOneAndUpdate(
            { GRNNumber },
            { ...req.body },
            { new: true }
        );
        if (!updatedBill) {
            return res.status(404).json({ error: "Bill not found" });
        }
        res.status(200).json(updatedBill);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
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

// add company name
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
// const addMaterialNames = async(req, res) => {
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

// add material to database
const addMaterialName = async(req, res) => {
    try {
        const {material} = req.body;

        console.log(req.body)

        const searchForMaterial = await MaterialName.find({MaterialName: material});

        console.log(searchForMaterial);

        if(searchForMaterial.length === 0) {
            const NewMaterial = await MaterialName.create({
                MaterialName: material
            });

            res.status(200).json(NewMaterial);
        }
        else {
            res.status(409).json({ message: "Material already exists" });
        }
        
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { createBill, getBills, deleteBill, updateBill, searchBills, getCompanyNames, addPartyName, getMaterialNames, addMaterialName, registerUser, loginUser, getBillByGRN }