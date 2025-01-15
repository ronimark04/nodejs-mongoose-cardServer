const connectToAtlasDB = require("./mongodb/connectToAtlas");
const connectToLocalDB = require("./mongodb/connectToMongoLocally");
const config = require("config");

const ENVIROMENT = config.get("ENVIROMENT");

const connectToDB = async () => {
    if (ENVIROMENT === "development") {
        await connectToLocalDB();
    }
    if (ENVIROMENT === "production") {
        await connectToAtlasDB();
    }
};

module.exports = connectToDB;