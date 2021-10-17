const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    userName:   {type: String, required: true, max: 100},
    userHead:   {type: String, required: true, max: 100},
    userBody: {type: String, required: true, max: 100},
    office:   {type: String, required: true, max: 100}
});

var user = module.exports = mongoose.model('userDatas', userSchema);

module.exports.get = function (callback, limit) {
    user.find(callback).limit(limit);
}