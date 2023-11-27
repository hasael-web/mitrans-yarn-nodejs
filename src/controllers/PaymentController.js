const {PaymentService} = require("../services")

  class PaymentController{
    async payment(req,res){
        try {
            const paymentservice = new PaymentService()
            await paymentservice.payment(req,res)
        } catch (error) {
            return res.status(500).json({status:500,message:"internal server error on payment controller",error})
        }
    }
}


module.exports = PaymentController