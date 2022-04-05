const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userType: {
        type: mongoose.Schema.Types.String,
        default: "user"
    },
    name: {
        type: String,
        require: true,
        unique: false,
    },
    phone: {
        type: String,
        require: true,
        unique: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { 
        type: String, required: true 
    },
    // addresses: [{
    //     contact: {type: String, required: false, description: "use if client is not your contact"},
    //     street: { type: String, required: false },
    //     city: { type: String, required: false },
    //     province: { type: String, required: false },
    //     zip: { type: String, required: false },
        
    //     required: false
    // }],
},

 { timestamps: { createdAt: 'created_at' } }

);

module.exports = mongoose.model('User', userSchema);