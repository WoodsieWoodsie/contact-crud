'use strict';

var fs = require('fs');
var db = 'db/contacts.json';

var Contacts = {};

// FINDS ALL CONTACTS
Contacts.find = function(cb) {
  fs.readFile(db, function(err, data) {
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
    fs.writeFile(db, data, function(err) {
      if (err) return cb(err);
      cb(null);
    });
  });
}

// EDIT A CONTACT
// Contacts.edit = function()

// DELETE A CONTACT
Contacts.delete = function(contact, cb) {
  fs.readFile(db, function(err, data) {
    if (err) {
      cb(err);
    } else {
      var contacts = JSON.parse(data);
      var names = contacts.map(function(contact){
        return contact.name;
      });
      var index = names.indexOf(contact.name);
      if(index === -1){
        cb('name not found');
      } else {
        contacts.splice(index, 1);
        var data = JSON.stringify(contacts);
        console.log('after-delete data: ', data);
        fs.writeFile(db, data, function(err){
          if (err) return cb (err);
          cb(null);
        });
      }
    }
  });
};

module.exports = Contacts;