'use strict';

var fs = require('fs');

var Contacts = {};

// FINDS ALL CONTACTS
Contacts.find = function(cb) {
  fs.readFile('db/contacts.json', function(err, data) {
    if (err) {
      cb(err);
    } else {
      var contacts = JSON.parse(data);
      cb(null, contacts);
    }
  });
};

// CREATE A CONTACT
Contacts.create = function(contact, cb) {
  Contacts.find(function(err, contacts) {
    if (err) return cb(err);
    contacts.push(contact);
    var data = JSON.stringify(contacts);
    fs.writeFile('db/contacts.json', data, function(err) {
      if (err) return cb(err);
      cb(null);
    });
  });
}

// EDIT A CONTACT
Contacts.edit = function()

module.exports = Contacts;