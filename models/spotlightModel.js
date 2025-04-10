const { Schema, model } = require("mongoose");

const SpotlightSchema = new Schema({
    shoeType: {
        type: String
    },
    image: {
        type: String
    }
});

const SpotlightModel = model("spotlightData", SpotlightSchema, "spotlightData");

module.exports = SpotlightModel;