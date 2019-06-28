// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

window.onload = function() {
  var employers = document.querySelectorAll('.employer')
  for (let i=0; i < employers.length; i++) {
    employers[i].addEventListener('click', (event) => {
      fetch(`/employers/${event.target.id}/checks.json`)
      .then(response => response.json())
      .then(json => {
        json.forEach( function(checkData) {
          check = new Check(checkData)
          let ul = document.getElementById(check.employer)
          let li = document.createElement('LI')
          ul.appendChild(li).innerHTML= `${check.name}-$${check.amount}`
        })
      })
    })
  }
}
