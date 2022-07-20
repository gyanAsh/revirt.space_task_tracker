const mongoose = require('mongoose');
const config = require('config');

const connectDB = async () => {
    const mongoURI = config.mongoURI;
    try {
        await mongoose.connect(mongoURI);
        console.log('Database Connected');
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;