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
    let tax_year_id = document.querySelector('.id').dataset.temp
    let employers = document.querySelector('#employers')
    let newEm = document.createElement('div')
    let b = document.createElement('br')
    newEm.id = `employer-${this.id}`
    let emName= document.createElement('h4')
    emName.innerHTML = `<a href= "/tax_years/${tax_year_id}/employers/${this.id}/edit">${this.name}</a>`
    newEm.appendChild(emName)
    let oldEm = document.getElementById(`employer-${this.id}`)
    if (oldEm) {
      oldEm.remove()
    }
    employers.appendChild(newEm)
    let firstBreak = document.createElement('br')
    newEm.appendChild(firstBreak)
    var newTable = document.createElement('table')
    newTable.id = `table-${this.id}`
    newEm.appendChild(newTable)
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
    headers.querySelectorAll('td').forEach((cell) => {
      cell.addEventListener('click', this.sortData)
    })
    for (let i = 0;i<this.checks.length;i++) {
      var newTable = document.querySelector(`#table-${this.id}`)
      let newCheck = new Check (this.checks[i])
      let date = new Date(newCheck.check_date)
      newTable.appendChild(newCheck.rowDisplay(date))
    }
    newTable.appendChild(this.totalsRow())
    newEm.appendChild(b)
  }

  totalsRow() {
    let row = document.createElement('TR')
    row.id = `total-${this.id}`
    let blank = document.createElement('TD')
    let text = document.createElement('TD')
    text.innerText = 'Total'
    let amountTotal = document.createElement('TD')
    amountTotal.id = 'amount'
    amountTotal.innerHTML = `$${this.checks.reduce(totalAmount, 0)}`
    let mileageTotal = document.createElement('TD')
    mileageTotal.id = 'mileage'
    mileageTotal.innerHTML = this.checks.reduce(totalMileage, 0)
    row.appendChild(blank)
    row.appendChild(text)
    row.appendChild(amountTotal)
    row.appendChild(mileageTotal)
    return row
  }

  sortData = (event) => {
    this.checks.sort((checkA, checkB) => {
      let dateA = new Date(checkA.check_date)
      let dateB = new Date(checkB.check_date)
      return dateA - dateB
    })
    this.displayEmployer()
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
