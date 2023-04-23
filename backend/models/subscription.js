const mongoose = require("mongoose");
// const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
    name: { type: String, required: true },
    trader_id: { type: String, required: true },
    
    age: {
      type: String,
      required: true,
      // default: Date.now
    },
    bio:{
      type:String,
      required:true
    },
    rating:{
      type:String,
      required:true
    },
    address:{
      type:String,
      required:true
    },
    copiers:{
      type:String,
      required:true
    },
    profits:{
      type:String,
      required:true
    },
    membership:{
        type:String,
        required:true
    }
  });



// const subscription=mongoose.model("subscription", subscriptionSchema);
module.exports = mongoose.model("Subscription", subscriptionSchema)