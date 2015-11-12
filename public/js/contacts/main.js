'use strict';

$(document).ready(init);

function init(){
  $('.addContact').click(addContact);
  $('#contactList').on('click', '.delete', deleteContact);
  $('#contactList').on('click', '.edit', editContact);
}

var db = './db/contacts.json'

function editContact(e) {
  var $target = $(e.target);
  console.log('edit target', $target);
  var $editRow = $target.closest('tr');
  // var ident = $target.closest('tr').attr('ident');
  console.log($editRow.attr());
  var name = $editRow.find('.name').text();
  var phone = $editRow.find('.phone').text();
  var email = $editRow.find('.email').text();
  console.log('existing values: ', name, phone, email);
  var $editName = $('.editName').val(name);
  var $editPhone = $('.editPhone').val(phone);
  var $editEmail = $('.editEmail').val(email);
  $('.save-changes').click(saveChanges);

  function saveChanges(e) {
    $target = $(e.target);
    var newNameVal = $('.editName').val();
    var newPhoneVal = $('.editPhone').val();
    var newEmailVal = $('.editEmail').val();
    $.ajax({
      method: 'PUT',
      url: '/contacts',
      data: {ident: ident, name: newNameVal, phone: newPhoneVal, email: newEmailVal}
    })
    .done(function(data){
      console.log('Changes saved!');
    })
    .fail(function(err){
      console.error(err);
    });
  }
}

function deleteContact(e) {
  var $target = $(e.target);
  var $deleteRow = $target.closest('tr');
  var ident = $deleteRow.attr('class');
  console.log('deleted ident: ', ident);
  var name = $deleteRow.find('.name').text();
  var phone = $deleteRow.find('.phone').text();
  var email = $deleteRow.find('.email').text();
  $.ajax({
    method: 'DELETE',
    url: '/contacts',
    data: {ident: ident, name: name, phone: phone, email: email}
  })
  .done(function(data){
    $deleteRow.remove();
  })
  .fail(function(err){
    console.error(err);
  });
}

function addContact() {
  var contact = {};
  var ident = Date.now();
  contact.ident = ident;
  contact.name = $('input#name').val();
  contact.phone = $('input#phone').val();
  contact.email = $('input#email').val();

  $('input').each(function(index, input){
    $(input).val('');
  });
  $.post('/contacts', {contact: contact})
  .done(function(data){
    var $contactRow = contactRow(contact);
    
    function contactRow(contact) {
      var $tr = $('<tr>');
      var $name = $('<td>').text(contact.name).addClass('name');
      var $phone = $('<td>').text(contact.phone).addClass('phone');
      var $email = $('<td>').text(contact.email).addClass('email');
      var $edit = $('<td>').append($('<button>').text('Edit Contact').addClass('btn btn-primary btn-xs edit'));
      var $delete = $('<td>').append($('<button>').text('Delete Contact').addClass('btn btn-danger btn-xs delete'));
      $tr.append($name, $phone, $email, $edit, $delete).addClass(`${ident}`);
      return $tr;
    }

    $('tbody').append($contactRow);

  })
  .fail(function(err){
    console.error(err)
  });
}






