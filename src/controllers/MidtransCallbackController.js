const MidtransCallbackService = require("../services/MidtransCallbackService")

class MidtransCallbackController {
    async callbackFunc(req, res) {
        try {
            const midtransCallbackService = new MidtransCallbackService
            await midtransCallbackService.callbackFunc(req, res)
        } catch (error) {
            return res.status(500).json({ status: 500, message: "internal server error on midtrans callback controller", error })
        }
    }
}


module.exports = MidtransCallbackController