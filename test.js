var Contacts = require('./models/contact');







// Contacts.find(function(err, contacts) {
//   if (err) {
//     console.log('error with find')  
//     return; 
//   }
//   console.log('found contacts: ', contacts);
// });

// var contact = {name: 'thingy', phone: '555-2625', email: 'me@me.com'};

Contacts.create(contact, function(err) {
  if (err) {
    console.log('ERROR WITH CREATE', err);
  } else {
    console.log('contact create successfully');
  }
});
