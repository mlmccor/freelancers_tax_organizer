class Check {
  constructor(attributes) {
    this.id = attributes['id']
    this.name = attributes['name']
    this.check_date = attributes['check_date']
    this.amount = attributes['amount']
    this.mileage = attributes['mileage']
    this.description = attributes['description']
    this.employer = attributes['employer']['name']
  }

  rowDisplay(date) {
    let row = document.createElement('TR')
    row.id = this.id
    let newDate = document.createElement('TD')
    newDate.innerHTML = `${date.toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit' })}`
    let name = document.createElement('TD')
    name.innerHTML = `<a href="#" id= check-${this.id}>${this.name}</a>`
    let amount = document.createElement('TD')
    amount.innerHTML = `$${this.amount}`
    let mileage = document.createElement('TD')
    mileage.innerHTML = `${this.mileage}`
    row.appendChild(newDate)
    row.appendChild(name)
    row.appendChild(amount)
    row.appendChild(mileage)
    return row
  }

  noFormDisplay(date) {
    let row = document.createElement('TR')
    row.id = this.id
    let newDate = document.createElement('TD')
    newDate.innerHTML = `${date.toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit' })}`
    let name = document.createElement('TD')
    name.innerHTML = `<a href="#" id= check-${this.id}>${this.name}</a>`
    let employer = document.createElement('TD')
    employer.innerHTML = `<a href="#" id= employer->${this.employer}</a>`
    let amount = document.createElement('TD')
    amount.innerHTML = `$${this.amount}`
    let mileage = document.createElement('TD')
    mileage.innerHTML = `${this.mileage}`
    row.appendChild(newDate)
    row.appendChild(name)
    row.appendChild(employer)
    row.appendChild(amount)
    row.appendChild(mileage)
    return row
  }



}

function createAndDisplayCheck(event)  {
  event.preventDefault();
  document.querySelector('.newForm').style.display= "none"
  document.querySelector('#checkResult').style.display= "inline"
  debugger
  var values = $(event.target).serialize()
  var posting = $.post(`${event.target.action}.json`, values)
  posting.done(function(data) {
    check = new Check(data)
    $('#yourNew').text('Your Check:')
    $('#checkName').text(`Name: ${check['name']}`)
    let date = new Date(check['check_date'])
    $('#checkDate').text(`Date: ${date.toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit' })}`)
    $('#checkAmount').text(`Amount: ${check['amount']}`)
    $('#checkMileage').text(`Mileage: ${check['mileage']}`)
    debugger
    $('#checkEmployer').text(`Employer: ${check['employer']}`)
    $('#checkDescription').text(`Description: ${check['description']}`)
    if (data['employer']['tax_form'] === true) {
      table = document.querySelector(`#table-${data['employer']['id']}`)
      total = document.querySelector(`#total-${data['employer']['id']}`)
      table.insertBefore(check.rowDisplay(date), total)
    } else {
      table = document.querySelector(`#no-form-table`)
      total = document.querySelector(`#no-form-total`)
      table.insertBefore(check.noFormDisplay(date), total)
    }
  })
}
