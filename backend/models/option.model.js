const mongoose= require('mongoose');

const Schema=mongoose.Schema;

const validOptionTypes = ['Buy Call', 'Buy Put', 'Cash Secured Put', 'Covered Call', 'Credit Put Spread', 'Credit Call Spread']

const optionSchema= new Schema({
    symbol:{type:String,required:true},
    strike_price:{type:String,required:true},
    date_opened:{type:Date,required:false},
    date_closed:{type:Date,required:false},
    date_of_expiry:{type:Date,required:true},
    type:{
        type: String,
        validate: {
            validator: function (value) {
                return validOptionTypes.includes(value);
            },
            message: 'Invalid option type',
        },
        required:true},
    premium:{type:Number,required:true},
    collateral:{type:Number,required:true},
    is_open:{type:Boolean, required:true},
    realized_gain_loss:{type:Number, required:false},
    option_return:{type:Number, required:true},
    option_arr:{type:Number, required:true},
    },{
    timestamps:true,
});

const Option=mongoose.model('Option',optionSchema);

module.exports=Option;
