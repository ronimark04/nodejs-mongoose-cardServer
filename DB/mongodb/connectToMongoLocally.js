const mongoose = require('mongoose');

const connectToLocalDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/CardsServer");
        console.log('Connected to MongoDB locally');
    } catch (error) { console.log('Error connecting to MongoDB:', error); }
};

module.exports = connectToLocalDB;
