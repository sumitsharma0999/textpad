'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var noteModel = mongoose.model('note', new Schema({
    id: String,
    content: String
}));

exports.default = noteModel;