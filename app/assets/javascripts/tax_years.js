// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

function loadEmployers() {
  var id = $('.id').data('temp')
  let answer= fetch(`/tax_years/${id}/employers.json`)
  .then(response => response.json())
  .then(json => {
    json.forEach( function(emp){
      let employer = new Employer(emp)
      employer.displayEmployer()
    })

  })
}

function displayFormEmployers() {
  var id = $('.id').data('temp')
  let answer= fetch(`/tax_years/${id}/employer/forms.json`)
  .then(response => response.json())
  .then(json => {
    json.forEach( function(emp){
      let employer = new Employer(emp)
      // TODO: change next line to new function
      employer.displayEmployer()
    })

  })
}

function displayNoFormChecks() {
  var id = $('.id').data('temp')
  let answer= fetch(`/tax_years/${id}/check/no_form.json`)
  .then(response => response.json())
  .then(json => {
    json.forEach( function(check){
       newCheck = new Check(check)
      debugger
      // TODO: add function to create table and add checks

    })

  })
}

// document.addEventListener('turbolinks:load', loadEmployers())





  // var employers = document.querySelectorAll('.employer')
  // for (let i=0; i < employers.length; i++) {
  //   employers[i].addEventListener('click', (event) => {
  //     fetch(`/employers/${event.target.id}/checks.json`)
  //     .then(response => response.json())
  //     .then(json => {
  //       json.forEach( function(checkData) {
  //         check = new Check(checkData)
  //         let ul = document.getElementById(check.employer)
  //         let li = document.createElement('LI')
  //         ul.appendChild(li).innerHTML= `${check.name}-$${check.amount}`
  //       })
  //     })
  //   })
  // }
// })
