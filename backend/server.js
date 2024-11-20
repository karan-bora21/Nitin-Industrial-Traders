const express = require('express');
const mongoose = require('mongoose');
const inventoryRoutes = require("./routes/inventoryRoutes");
require('dotenv').config();

//Express App
const app = express();

//Middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

//Routes
app.use("/api/inventory", inventoryRoutes);

//Connet to Database
mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Connected to DB and listening on port", process.env.PORT)
    });
}).catch((error) => {
    console.log(error)
});


