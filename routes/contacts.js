'use strict';

var express = require('express');
var router = express.Router();

var Contacts = require('../models/contact');

router.get('/', function(req, res) {
  Contacts.find(function(err, contacts){
    if (err) return res.status(400).send(err);
    if (contacts.length) {
      res.render('index', {contacts: contacts});
    }
    
  });
});

router.post('/', function(req, res) {
  var contact = req.body.contact;
  console.log("contact to be added: ", contact);
  Contacts.create(contact, function(err) {
    res.status(err ? 400 : 200).send(err || 'contact created');
  });
});

router.delete('/', function(req, res) {
  // res.send(req.body);
  Contacts.delete(req.body, function(err) {
    if (err) {
      return res.status(400).send(err);
    }
    console.log('req.body: ', req.body);
    res.send(); 
  });
});

module.exports = router;
