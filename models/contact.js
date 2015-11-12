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
    console.log('contacts', contacts);
    var data = JSON.stringify(contacts);
    fs.writeFile(db, data, function(err) {
      if (err) return cb(err);
      cb(null);
    });
  });
}

// EDIT A CONTACT
Contacts.update = function(contact, cb) {
   fs.readFile(db, function(err, data) {
    if (err) {
      cb(err);
    } else {
      var contacts = JSON.parse(data);
      var index = contacts.filter(function(el){
        return el.ident === contact.ident;
      })[0];
      // var index = idents.indexOf(contact.ident);
      // if(index === -1){
      //   cb('contact not found');
      // } else {
      console.log('PUT CONTACT', contact)
      contacts.splice(index, 1, contact);
      var data = JSON.stringify(contacts);
      console.log('after-edit data: ', data);
      fs.writeFile(db, data, function(err){
        if (err) return cb(err);
        cb(null);
      });
      // }
    }
  });
}

// DELETE A CONTACT
Contacts.delete = function(contact, cb) {
  fs.readFile(db, function(err, data) {
    if (err) {
      cb(err);
    } else {
      var contacts = JSON.parse(data);
      var idents = contacts.map(function(contact){
        return contact.ident;
      });
      var index = idents.indexOf(contact.ident);
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