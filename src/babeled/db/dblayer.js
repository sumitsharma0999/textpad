'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createNewNote = createNewNote;
exports.getNoteContent = getNoteContent;
exports.updateNote = updateNote;

var _randomstring = require('randomstring');

var _randomstring2 = _interopRequireDefault(_randomstring);

var _note = require('./models/note');

var _note2 = _interopRequireDefault(_note);

var _errorcodes = require('../errorcodes');

var _errorcodes2 = _interopRequireDefault(_errorcodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a new note with a new unique id, returns the unique id of the newly created note
 */
function createNewNote(content) {
    var promise = new Promise(function (resolve, reject) {
        var createUniqueIdPromise = createUniqueId();

        createUniqueIdPromise.then(function (uniqueId) {
            var newNote = new _note2.default({
                id: uniqueId,
                content: content
            });
            newNote.save(function (err) {
                if (err) {
                    reject(err);
                } else {
                    // created successfully
                    resolve(uniqueId);
                }
            });
        }).catch(function (err) {
            reject(err);
        });
    });

    return promise;
}

function getNoteContent(id) {
    var promise = new Promise(function (resolve, reject) {
        var noteExistsPromise = noteExists(id);
        noteExistsPromise.then(function (exists) {
            if (exists) {
                _note2.default.findOne({ id: id }, function (err, note) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(note.content);
                    }
                });
            } else {
                reject(_errorcodes2.default.noteDoesNotExist);
            }
        });
    });

    return promise;
}

/**
 *  Saves the given content in the note with given id
 */
function updateNote(id, content) {
    var noteExistsPromise = noteExists(id);
    var promise = noteExistsPromise.then(function (exists) {
        if (exists) {
            _note2.default.update({ id: id }, { content: content }, function (err, result) {
                if (err) {
                    throw err;
                } else {
                    return true;
                }
            });
        } else {
            reject(_errorcodes2.default.noteDoesNotExist);
        }
    });

    return promise;
}

/**
 * Generates a uniqueId for a note
 */
function createUniqueId() {
    var options = {
        length: 8,
        capitalization: 'lowercase'
    };

    var promise = new Promise(function (resolve, reject) {
        var noteId = _randomstring2.default.generate(options);
        var noteExistsPromise = noteExists(noteId);

        noteExistsPromise.then(function (exists) {
            if (exists) {
                createUniqueId().then(function (uniqueId) {
                    resolve(uniqueId);
                });
            } else {
                resolve(noteId);
            }
        });
    });

    return promise;
}

/**
 * Checks if a note with given id exists or not
 * @returns true or false
 */
function noteExists(noteId) {
    var promise = new Promise(function (resolve, reject) {
        _note2.default.findOne({ id: noteId }, function (err, result) {
            if (err) {
                promise.reject(err);
            } else {
                if (result) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }
        });
    });

    return promise;
}