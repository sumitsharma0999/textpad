import * as dblayer from '../db/dblayer'

/**
 * Creates a new note with given content
 * @returns id of the newly created note
 */
export function createNote(content) {
  var promise = new Promise((resolve, reject) => {
    dblayer.createNewNote(content).then((newNoteId) => {
      resolve(newNoteId);
    }).catch((reason) => {
      reject(reason);
    });
  });

  return promise;
}

/**
 * Gets the note content for the given note id
 * @returns content of the note
 */
export function getNoteContent(id) {
  var promise = new Promise((resolve, reject) => {
    dblayer.getNoteContent(id).then((content) => {
      resolve(content);
    }).catch((reason) => {
      reject(reason);
    });
  });

  return promise;
}

/**
 *  Updates the given note with the specified content
 */
export function updateNote(id, content) {
  var promise = new Promise((resolve, reject) => {
    dblayer.updateNote(id, content).then(() => {
      resolve();
    }).catch((reason) => {
      reject(reason);
    });
  });

  return promise;
}