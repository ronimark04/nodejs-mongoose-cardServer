const bcrypt = require('bcryptjs');

const generatePassword = async (password) => bcrypt.hashSync(password, 10); // hashsync takes two arguments: the password and the number of rounds to hash the password. the higher the number, the more secure the hash. this sets the default to 10 rounds.

const comparePasswords = async (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
} // compareSync takes two arguments: the password and the hashed password. it returns true if the password matches the hash, and false if it doesn't. this is meant to check if the user input password matches the hashed password in the database.

module.exports = { generatePassword, comparePasswords };