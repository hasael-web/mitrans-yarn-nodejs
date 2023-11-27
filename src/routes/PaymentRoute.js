const MidtransCallbackController = require("../controllers/MidtransCallbackController")
const PaymentController = require("../controllers/PaymentController")

const Router = require("express")

const router = Router()

router.post("/payment", async (req, res) => {
    try {
        const paymentController = new PaymentController()
        await paymentController.payment(req, res)
    } catch (error) {
        return res.status(500).json({ status: 500, message: "internal server error on router get payment ", error })
    }
})
router.post("/midtrans-callback", async (req, res) => {
    try {
        const midtransCallbackController = new MidtransCallbackController
        await midtransCallbackController.callbackFunc(req, res)
    } catch (error) {
        return res.status(500).json({ status: 500, message: "internal server error on midtrans callback router ", error })
    }
})

module.exports = router