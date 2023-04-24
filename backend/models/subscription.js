const mongoose = require("mongoose");
// const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
    name: { type: String, required: true },
    trader_id: { type: String, required: true },

    membership:{
        type:String,
        required:true
    },
    bio:{
        type:String,
        required:true
    },
    ordertime: {
      type: Date,
      required: true,
      default: Date.now
    },
  });



// const subscription=mongoose.model("subscription", subscriptionSchema);
module.exports = mongoose.model("Subscription", subscriptionSchema)