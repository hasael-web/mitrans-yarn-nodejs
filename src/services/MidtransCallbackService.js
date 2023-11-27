require("dotenv").config()
const { snap } = require("../../config/midtrans/midtransConfig");
const crypto = require('crypto');



class MidtransCallbackService {
    createSignature(order_id, status_code, gross_amount, serverKey) {
        // Menggabungkan data menjadi satu string
        const data = order_id + status_code + gross_amount + serverKey;

        // Membuat hash SHA-512
        const hash = crypto.createHash('sha512');

        // Memperbarui hash dengan data
        const signature = hash.update(data, 'utf-8');

        // Menghasilkan signature dalam format hexadecimal
        return signature.digest('hex');
    }
    async callbackFunc(req, res) {
        try {

            const data = req.body
            // console.log(data);
            const { order_id, status_code, gross_amount, signature_key } = data
            const hashed = this.createSignature(order_id, status_code, gross_amount, process.env.M_SERVER_KEY)

            // const mockNotificationJson = req.body
            // const apiClient = snap
            // const response = apiClient.transaction.notification(mockNotificationJson)
            //     .then((statusResponse) => {
            //         let orderId = statusResponse.order_id;
            //         let transactionStatus = statusResponse.transaction_status;
            //         let fraudStatus = statusResponse.fraud_status;

            //         console.log(`Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`);

            //         // Sample transactionStatus handling logic

            //         if (transactionStatus == 'capture') {
            //             // capture only applies to card transaction, which you need to check for the fraudStatus
            //             console.log("capture", transactionStatus);
            //             if (fraudStatus == 'challenge') {
            //                 // TODO set transaction status on your databaase to 'challenge'
            //                 console.log("challenge", fraudStatus);
            //             } else if (fraudStatus == 'accept') {
            //                 // TODO set transaction status on your databaase to 'success'
            //                 console.log("accept", fraudStatus);
            //             }
            //         } else if (transactionStatus == 'settlement') {
            //             // TODO set transaction status on your databaase to 'success'
            //             console.log("settlement", transactionStatus);
            //         } else if (transactionStatus == 'deny') {
            //             // TODO you can ignore 'deny', because most of the time it allows payment retries
            //             // and later can become success
            //             console.log("deny", transactionStatus);
            //         } else if (transactionStatus == 'cancel' ||
            //             transactionStatus == 'expire') {
            //             console.log("cancel or expire", transactionStatus);
            //             // TODO set transaction status on your databaase to 'failure'
            //         } else if (transactionStatus == 'pending') {
            //             console.log("pending", transactionStatus);
            //             // TODO set transaction status on your databaase to 'pending' / waiting payment
            //         }
            //     });

            if (hashed == signature_key) {

                return res.status(200).json({ status: 200, message: "success" })
            }
            return res.status(404).json({ status: 404, data: req.body, hashed })
        } catch (error) {
            return res.status(500).json({ status: 500, message: "internal server error on midtrans callback service ", error })
        }
    }
}

module.exports = MidtransCallbackService