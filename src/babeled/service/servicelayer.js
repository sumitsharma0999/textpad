'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createNote = createNote;
exports.getNoteContent = getNoteContent;
exports.updateNote = updateNote;

var _dblayer = require('../db/dblayer');

var dblayer = _interopRequireWildcard(_dblayer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Creates a new note with given content
 * @returns id of the newly created note
 */
function createNote(content) {
  var promise = new Promise(function (resolve, reject) {
    dblayer.createNewNote(content).then(function (newNoteId) {
      resolve(newNoteId);
    }).catch(function (reason) {
      reject(reason);
    });
  });

  return promise;
}

/**
 * Gets the note content for the given note id
 * @returns content of the note
 */
function getNoteContent(id) {
  var promise = new Promise(function (resolve, reject) {
    dblayer.getNoteContent(id).then(function (content) {
      resolve(content);
    }).catch(function (reason) {
      reject(reason);
    });
  });

  return promise;
}

/**
 *  Updates the given note with the specified content
 */
function updateNote(id, content) {
  var promise = new Promise(function (resolve, reject) {
    dblayer.updateNote(id, content).then(function () {
      resolve();
    }).catch(function (reason) {
      reject(reason);
    });
  });

  return promise;
}