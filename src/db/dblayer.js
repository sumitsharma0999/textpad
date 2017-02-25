import randomstring from "randomstring";
import NoteModel from './models/note';
import errorCodes from '../errorcodes';

/**
 * Creates a new note with a new unique id, returns the unique id of the newly created note
 */
export function createNewNote(content) {
    var promise = new Promise(function(resolve, reject) {
        var createUniqueIdPromise = createUniqueId();
    
        createUniqueIdPromise.then((uniqueId) => {
            var newNote = new NoteModel({
                id: uniqueId,
                content: content
            });
            newNote.save(function(err) {
                if(err) {
                    reject(err);
                }
                else {
                    // created successfully
                    resolve(uniqueId);
                }
            });
        }).catch((err) => {
            reject(err);
        });
    });
    

    return promise;    
}

export function getNoteContent(id) {
    var promise = new Promise(function(resolve, reject) {
        var noteExistsPromise = noteExists(id);
        noteExistsPromise.then((exists) => {
            if(exists) {
                NoteModel.findOne({id: id}, function(err, note) {
                    if(err) {
                        reject(err);
                    }
                    else {
                        resolve(note.content);
                    }
                });
            }
            else {
                reject(errorCodes.noteDoesNotExist);
            }
        });
    });

    return promise;
}

/**
 *  Saves the given content in the note with given id
 */
export function updateNote(id, content) {
    var noteExistsPromise = noteExists(id);
    var promise = noteExistsPromise.then((exists) => {
        if(exists) {
            NoteModel.update({id: id}, {content: content}, function(err, result) {
                if(err) {
                    throw err;
                }
                else {
                    return true;
                }
            });
        }
        else {
            reject(errorCodes.noteDoesNotExist);
        }
    });

    return promise;
}

/**
 * Generates a uniqueId for a note
 */
function createUniqueId() {
    let options = {
        length: 8,
        capitalization: 'lowercase'
    };

    var promise = new Promise((resolve, reject) => {
        let noteId = randomstring.generate(options);
        var noteExistsPromise = noteExists(noteId);

        noteExistsPromise.then((exists) => {
            if(exists) {
                createUniqueId().then((uniqueId) => {
                    resolve(uniqueId);
                });
            }
            else {
                resolve(noteId);
            }
        })
    });

    return promise;
}

/**
 * Checks if a note with given id exists or not
 * @returns true or false
 */
function noteExists(noteId) {
    var promise = new Promise(function(resolve, reject){
        NoteModel.findOne({id: noteId}, function(err, result) {
            if(err) {
                promise.reject(err);
            }
            else {
                if(result) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            }
        });
    });

    return promise;
}