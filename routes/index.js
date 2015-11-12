'use strict';

var express = require('express');
var router = express.Router();

var Contacts = require('../models/contact');

router.get('/', function(req, res) {
  Contacts.find(function(err, contacts){
    res.render('index', {contacts: contacts});
    
  });
});

//router.put

// router.delete('/', function(req, res) {
//   Contacts.delete(function(err, contact) {
//     if (err) {
//       return res.status(404).send(err);
//     }
//     console.log(req.body.contact);
//     res.send(req.body.contact); 
//   });
// });

module.exports = router;
