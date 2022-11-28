// const app = require('../app');
// const port = normalizaPort(process.env.PORT || '4000');
// // const access = process.env.DATABASE_ACCESS;
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const express = require('express');

// const db = require('../src/models');
// const Role = db.role;


// function normalizaPort(val) {
//     const port = parseInt(val, 10);
//     if (isNaN(port)) {
//         return val;
//     }

//     if (port >= 0) {
//         return port;
//     }

//     return false;
// }

// app.use(cors());
// app.use(express.json());
// dotenv.config();
// db.mongoose.connect(process.env.DATABASE_ACCESS).then(() => {
//     app.listen(port, function() {
//         console.log(`Successfully connect to MongoDB. Port: ${port}`);
//         initial();
//     });
// }).catch((err) => {
//     console.log("Error: ", err);
//     process.exit();
// })

// function initial() {
//     Role.estimatedDocumentCount((err, count) => {
//         if (!err && count ===0) {
//             new Role({
//                 name: "user"
//             }).save(err => {
//                 if (err) {
//                     console.log("error", err);
//                 }

//                 console.log("addes 'user' to roles collection");
//             });
//             new Role({
//                 name: "moderator"
//             }).save(err => {
//                 if (err) {
//                     console.log("error", err);
//                 }

//                 console.log("addes 'moderator' to roles collection");
//             });
//             new Role({
//                 name: "admin"
//             }).save(err => {
//                 if (err) {
//                     console.log("error", err);
//                 }

//                 console.log("addes 'admin' to roles collection");
//             });
//         }
//     })
// }