'use strict';

$(document).ready(init);

function init(){
  $('.addContact').click(addContact);
  $('#contactList').on('click', '.delete', deleteContact);
}

function deleteContact(e) {
  var $target = $(e.target);
  var $deleteRow = $target.closest('tr');
  var name = $deleteRow.find('.name').text();
  var phone = ($($deleteRow).find('.phone')).text();
  var email = ($($deleteRow).find('.email')).text();
  console.log('contact info', name, phone, email);
  $.ajax({
    method: 'DELETE',
    url: '/contacts',
    data: {name: name, phone: phone, email: email}
  })
  .done(function(data){
    console.log('delete data: ', data);
    $deleteRow.remove();
  })
  .fail(function(err){
    console.error(err);
  });
}

function addContact() {
  var contact = {};
  contact.name = $('input#name').val();
  contact.phone = $('input#phone').val();
  contact.email = $('input#email').val();

  $('input').each(function(index, input){
    $(input).val('');
  });

  console.log(contact);
  $.post('/contacts', {contact: contact})
  .done(function(data){
    console.log("data", data);
    var $contactRow = contactRow(contact);
    $('tbody').append($contactRow);

  })
  .fail(function(err){
    console.error(err)
  });
}

function contactRow(contact) {
  var $tr = $('<tr>');
  var $name = $('<td>').text(contact.name).addClass('name');
  var $phone = $('<td>').text(contact.phone).addClass('phone');
  var $email = $('<td>').text(contact.email).addClass('email');
  var $edit = $('<td>').append($('<div>').text('Edit Contact').addClass('btn btn-primary btn-xs edit'));
  var $delete = $('<td>').append($('<div>').text('Delete Contact').addClass('btn btn-danger btn-xs delete'));
  $tr.append($name, $phone, $email, $edit, $delete);
  return $tr;
}