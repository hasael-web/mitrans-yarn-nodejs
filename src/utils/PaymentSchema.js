const Joi = require("joi")

const User_Order = Joi.object({
    order_id: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().regex(/^\d{11,12}$/).required()
})

const User_item_detail = Joi.object({
    id_item: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    name: Joi.string().required(),
    brand: Joi.string().required(),
    category: Joi.string().required(),
    merchant_name: Joi.string().required(),
})

module.exports = { User_Order, User_item_detail }
