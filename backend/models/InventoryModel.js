const mongoose = require('mongoose');
const Schema = mongoose.Schema

// User Schema for Registration and Login (Only Username and Password)
const userSchema = new Schema({
    username: {
      type: String,
      required: true,
      unique: true, // Ensure the username is unique
    },
    password: {
      type: String,
      required: true,
    },
  }, { timestamps: true });


const inventorySchema = new Schema({
    GRNNumber: {
        type: Number,
        required: true
    },
    PartyName: {
        type: String,
        required: true
    },
    InvoiceDate: {
        type: String,
        required: true
    },
    InvoiceNumber: { 
        type: String,
        required: true
    },
    InvertDate: {
        type: String,
        required: true
    },
    Transporter: {
        type: String
    },
    LRNumber: {
        type: String,
        required: true
    },
    Material: {
        type: [String],
        required: true
    },
    Quantity: {
        type: [Number],
        required: true
    },
    NumberOfBox: {
        type: Number,
        required: true
    }
}, {timestamps: true});

const companyNameSchema = new Schema({
    CompanyName: {
        type: String,
        required: true
    }
})

const materialNameSchema = new Schema({
    MaterialName: {
        type: String,
        required: true
    }
})

const Inventory = mongoose.model('Inventory', inventorySchema);
const CompanyName = mongoose.model('CompanyName', companyNameSchema);
const MaterialName = mongoose.model('MaterialName', materialNameSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
    User,
    Inventory,
    CompanyName,
    MaterialName
}

