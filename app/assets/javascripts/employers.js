// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/


class Employer {
  constructor(attributes) {
    this.id = attributes['id']
    this.name = attributes['name']
  }

  displayEmployer() {
    let employers = document.querySelector('.employers')
    let newEm = document.createElement('div')
    let newBreak = document.createElement('br')
    newEm.id = this.id
    newEm.innerHTML = this.name
    newEm.appendChild(newBreak)
    employers.appendChild(newEm)
    newEm.addEventListener('click', function(event) {
      if (!document.querySelector(`#table-${event.target.id}`)) {
        listChecks(event)
      }
    })
  }
}

function listChecks(event) {
  event.preventDefault()
  var newTable = document.createElement('table')
  newTable.id = `table-${event.target.id}`
  event.target.appendChild(newTable)
  let answer = fetch(`/employers/${event.target.id}/checks.json`)
  .then(response => response.json())
  .then(json => {
    json.forEach( check => {
      var newTable = document.querySelector(`#table-${check.employer.id}`)
      let newCheck = new Check(check)
      let date = new Date(check['check_date'])
      newTable.appendChild(newCheck.rowDisplay(date))
    })
  })
}
