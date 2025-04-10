const { Schema, model } = require("mongoose");

const ShoeSchema = new Schema({
    name: {
        type: String
    },
    type: {
        type: String
    },
    image: {
        type: String
    },
    colors: {
        type: String
    },
    price: {
        type: String
    },
    img: {
        type: [String],
    }
});


const ShoeModel = model("products", ShoeSchema, "products");

module.exports = ShoeModel;