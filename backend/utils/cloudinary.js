const cloudinary = require('cloudinary').v2;


// Configuration 
cloudinary.config({
  cloud_name: "dlyp8rj8i",
  api_key: "413241581482263",
  api_secret: "ipitWYjqt0IykwG0O0x_Rf36QQU"
});





// const cloudinary = require("cloudinary").v2;
// require("dotenv").config({
//   path: "./.env",
// });
// // Configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_KEY,
//   api_secret: process.env.CLOUD_KEY_SECRET,
// });

module.exports = cloudinary;