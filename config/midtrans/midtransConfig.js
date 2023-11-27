require("dotenv").config()
//SAMPLE REQUEST START HERE by snap


const midtransClient = require('midtrans-client');

// env
const { M_SERVER_KEY, M_CLIENT_KEY, M_ID_MERCHANT } = process.env
// Create Snap API instance
let snap = new midtransClient.Snap({
    // Set to true if you want Production Environment (accept real transaction).
    isProduction: false,
    serverKey: M_SERVER_KEY,
    clientKey: M_CLIENT_KEY
});

// let core = new midtransClient.CoreApi({
//     // Set to true if you want Production Environment (accept real transaction).
//     isProduction: false,
//     serverKey: M_SERVER_KEY,
//     clientKey: M_CLIENT_KEY
// });



module.exports = { snap }