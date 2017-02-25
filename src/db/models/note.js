var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var noteModel = mongoose.model('note', new Schema({
    id: String,
    content: String
}));

export default noteModel;