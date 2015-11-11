'use strict';

var express = require('express');
var router = express.Router();

var Contacts = require('../models/contact');

router.get('/', function(req, res) {
  Contacts.find(function(err, contacts) {
    if (err) {
      return res.status(404).send(err);
    }
    console.log(contacts);
    res.send(contacts);
  });
});

router.post('/', function(req, res) {
  var contact = request.body.contact;
  Contacts.create(contact, function(err) {
    if (err) {
      res.status(404).send(err);
    } else {
      res.send();
    }
  });
});