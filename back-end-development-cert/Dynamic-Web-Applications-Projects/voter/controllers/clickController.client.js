'use strict';

(function () {

  window.onload=function(){
    // var deletePollButtons = getElementsByClassName('poll-button-delete');


  function addEventListenerByClass(className, event, fn) {
      var list = document.getElementsByClassName(className);
      for (var i = 0, len = list.length; i < len; i++) {
          list[i].addEventListener(event, fn, false);
      }
  }; // addEventListenerByClass

  addEventListenerByClass('poll-button-delete', 'click', handlePollDelete);
  addEventListenerByClass('poll-button-link', 'click', handlePollLink);
  addEventListenerByClass('vote-button', 'click', handleVote);

  function handlePollLink() {
    window.location.href = '/polls/' + this.value;
  }

  function handlePollDelete() {
    ajaxRequest('DELETE', '/polls/' + this.value, function() {
      location.reload();
    });
  } // handlePollDelete()

  function handleVote() {
    ajaxRequest('PUT', '/api' + this.value, function() {
      location.reload();
    });
  }

} // window.onload

// ***************************************
// ***************************************
// ***************************************

  function ready (fn) {
    if (typeof fn !== 'function') {
      return;
    }

    if (document.readyState === 'complete') {
      return fn();
    }

    document.addEventListener('DOMContentLoaded', fn, false);
  }

  function ajaxRequest (method, url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        callback(xmlhttp.response);
      }
    };
    xmlhttp.open(method, url, true);
    xmlhttp.send();
  }

})();
