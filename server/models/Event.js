const mongoose = require('mongoose');

const schema = mongoose.Schema({
    
    userId:{
        type: String,
        require: true
    },
    description:{
        type: String,
    },
    date:{
        type: String,
    }

})

const Event = mongoose.model('event', schema);
module.exports = Event
