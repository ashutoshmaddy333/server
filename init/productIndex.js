const newData = require('./productData.js')
const mongoose = require("mongoose");
const Product = require("../models/Product.js");

require('dotenv').config();

const initDB = async () => {
    try {

        await mongoose.connect('mongodb+srv://ashutoshm416:ashutoshm416@db.4ed44.mongodb.net/Karushka?retryWrites=true&w=majority&appName=db');
        console.log("Connected to MongoDB");

        // Delete existing data
        await Product.deleteMany({});
        console.log("Existing data deleted");

        // If you need to modify the data before insertion, uncomment the following line:
        // newData.data = newData.data.map((obj) => ({ ...obj, instructorId: "67b30f4c85d5e83d336de516" }));

        // Insert new data
        const data = await Product.insertMany(newData.data);
        console.log(data)
        console.log("Data has been initialized");
    } catch (error) {
        console.error("Error initializing the database:", error);
    } finally {
        mongoose.connection.close(); // Close the connection after operations are complete
    }
};
initDB();
