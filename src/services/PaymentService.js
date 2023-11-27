const { snap } = require("../../config/midtrans/midtransConfig");
const { User_Order, User_item_detail } = require("../utils/PaymentSchema");

class PaymentService {
  async payment(req, res) {
    try {

      const
        {
          user_order,
          user_item_detail
        } = req.body

      const { value: VUO, error: EVUO } = User_Order.validate(user_order)
      if (EVUO) {
        return res.status(404).json({ status: 404, message: EVUO })
      }
      const { value: UID, error: EUID } = User_item_detail.validate(user_item_detail)
      if (EUID) {
        return res.status(404).json({ status: 404, message: EUID })
      }

      let gross_amount
      const { order_id, first_name, last_name, email, phone } = VUO
      const { price, quantity, id_item, name, brand, category, merchant_name } = UID
      if (price && quantity) {
        gross_amount = quantity * price
      }

      let parameter = {
        "transaction_details": {
          "order_id": order_id,
          "gross_amount": gross_amount
        },
        "credit_card": {
          "secure": true
        },
        "customer_details": {
          "first_name": first_name,
          "last_name": last_name,
          "email": email,
          "phone": phone
        },
        "item_details": {
          "id": id_item,
          "price": price,
          "quantity": quantity,
          "name": name,
          "brand": brand,
          "category": category,
          "merchant_name": merchant_name,
        }
      };

      const transaction = await snap.createTransaction(parameter);






      return res.status(200).json({ status: 200, message: "success", data: transaction });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: 500, message: "internal server error on payment service", error });
    }
  }
}

module.exports = PaymentService;
