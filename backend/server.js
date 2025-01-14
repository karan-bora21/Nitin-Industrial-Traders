const express = require('express');
const mongoose = require('mongoose');
const inventoryRoutes = require("./routes/inventoryRoutes");
const path = require('path');
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

// ---------------- Deployment ---------------------

// const __dirname1 = path.resolve(__dirname, '../');

// if(process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname1,"/frontend/build")));

//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
//     })
// } else {
//     app.get("/", (req, res) => {
//         res.send("API is running successfully");
//     })
// }

//--------------------------------------------------


