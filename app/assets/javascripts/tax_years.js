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
      employer.displayEmployer()
    })

  })
}

function displayNoFormChecks() {
  var id = $('.id').data('temp')
  let noFormContainer = document.querySelector('#no_form_container')
  var newTable = document.createElement('table')
  newTable.id = `table-no-form`
  noFormContainer.appendChild(newTable)
  let thead = newTable.createTHead()
  let headers = thead.insertRow(0)
  let dateHeader = headers.insertCell(0)
  dateHeader.innerText = 'Date'
  let nameHeader = headers.insertCell(1)
  nameHeader.innerText = 'Name'
  let employerHeader = headers.insertCell(2)
  employerHeader.innerText = 'Employer'
  let amountHeader = headers.insertCell(3)
  amountHeader.innerText = 'Amount'
  let mileageHeader = headers.insertCell(4)
  mileageHeader.innerText = 'Mileage'
  let answer= fetch(`/tax_years/${id}/check/no_form.json`)
  .then(response => response.json())
  .then(json => {
    json.forEach( function(check){
      let table = document.querySelector('#table-no-form')
      let newCheck = new Check(check)
      let date = new Date(newCheck.check_date)
      table.appendChild(newCheck.noFormDisplay(date))
    })
    noFormTotalRow(json)
  })
}

function totalAmount(total, check) {
  return total + check.amount
}

function totalMileage(total, check) {
  return total + check.mileage
}

function noFormTotalRow(json) {
  let table = document.querySelector('#table-no-form')
  let row = document.createElement('TR')
  row.id = 'no-form-totals'
  let blank = document.createElement('TD')
  let blank2 = document.createElement('TD')
  let text = document.createElement('TD')
  text.innerText = 'Total'
  let amountTotal = document.createElement('TD')
  amountTotal.id = 'amount'
  amountTotal.innerHTML = `$${json.reduce(totalAmount, 0)}`
  let mileageTotal = document.createElement('TD')
  mileageTotal.id = 'mileage'
  mileageTotal.innerHTML = json.reduce(totalMileage, 0)
  row.appendChild(blank)
  row.appendChild(blank2)
  row.appendChild(text)
  row.appendChild(amountTotal)
  row.appendChild(mileageTotal)
  table.appendChild(row)
}

function refreshTotals() {
  // TODO: add functionality to refresh tables total rows
}
