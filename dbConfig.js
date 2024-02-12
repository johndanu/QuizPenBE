const mongoose = require('mongoose');

const dbURL = 'mongodb+srv://achchu0103:achchu0103@clustera.nouyojv.mongodb.net/App?retryWrites=true&w=majority'

module.exports = () => {
    return mongoose.connect(dbURL);
}