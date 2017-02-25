var express = require('express');
var noteService = require('../src/babeled/service/servicelayer');
var router = express.Router();
var errorCodes = require("../src/errorcodes");

router.get('/:noteid?', function(req, res, next) {
  var noteId = req.params.noteid;

  if(noteId) {
    noteService.getNoteContent(noteId).then((content) => {
      res.render('note', {text: content});
    }).catch((err) => {
      if(err === errorCodes.noteDoesNotExist) {
        res.render('notFound', {});
      }
      else {
        res.send(err);
      }
    });
  }
  else {
    res.render('note', {text: ""});
  }
});

/**
 * Can be used for creating a new note as well as modifying an existing one
 */
router.post('/:noteid?', function(req, res, next) {
  var noteid = req.params.noteid;
  var content = req.body.noteContent;

  if(noteid) {
    noteService.updateNote(noteid, content).then(()=>{
      res.send(noteid);
    }).catch((err) => {
      res.status(500).send(err);
    });
  }
  else {
    noteService.createNote(content).then((noteId) => {
      res.send(noteId);
    }).catch((err) => {
      res.status(500).send(err);
    });
  }
});

module.exports = router;
