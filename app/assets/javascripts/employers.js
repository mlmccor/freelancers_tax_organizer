// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/


class Employer {
  constructor(attributes) {
    this.id = attributes['id']
    this.name = attributes['name']
    this.checks = attributes['checks']
  }

  displayEmployer() {
    let employers = document.querySelector('#employers')
    let newEm = document.createElement('div')
    let b = document.createElement('br')
    newEm.id = this.id
    newEm.innerHTML = this.name
    this.checks
    // TODO: impliment listChecks into this method
    debugger
    newEm.appendChild(b)
    employers.appendChild(newEm)
    newEm.addEventListener('click', function(event) {
      if (!document.querySelector(`#table-${event.target.id}`) || !document.querySelector(`#${event.target.id}`) ) {
        listChecks(event)
      }
    })
  }
}

function listChecks(event) {
  event.preventDefault()
  let firstBreak = document.createElement('br')
  event.target.appendChild(firstBreak)
  var newTable = document.createElement('table')
  newTable.id = `table-${event.target.id}`
  event.target.appendChild(newTable)
  let thead = newTable.createTHead()
  let headers = thead.insertRow(0)
  let dateHeader = headers.insertCell(0)
  dateHeader.innerText = 'Date'
  let nameHeader = headers.insertCell(1)
  nameHeader.innerText = 'Name'
  let amountHeader = headers.insertCell(2)
  amountHeader.innerText = 'Amount'
  let mileageHeader = headers.insertCell(3)
  mileageHeader.innerText = 'Mileage'
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
  let lastBreak= document.createElement('br')
  event.target.appendChild(lastBreak)
}
