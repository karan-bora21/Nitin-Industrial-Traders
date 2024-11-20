const mongoose = require('mongoose');
const Schema = mongoose.Schema

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
        type: Number,
        required: true
    },
    Transporter: {
        type: String
    },
    LRNumber: {
        type: Number,
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

module.exports = {
    Inventory,
    CompanyName,
    MaterialName
}

