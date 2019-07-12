class Check {
  constructor(attributes) {
    this.id = attributes['id']
    this.name = attributes['name']
    this.check_date = attributes['check_date']
    this.amount = attributes['amount']
    this.mileage = attributes['mileage']
    this.description = attributes['description']
    if (attributes['employer']) {
      this.employer = attributes['employer']['name']
    }
  }

  rowDisplay(date) {
    let row = document.createElement('TR')
    row.id = this.id
    let newDate = document.createElement('TD')
    newDate.innerHTML = `${date.toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit' })}`
    let name = document.createElement('TD')
    name.innerHTML = `<a href="#" onclick="loadCheckResults(); return false" class='check' id=${this.id}>${this.name}</a>`
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

  checkRow() {
    let row = document.createElement('TR')
    row.id = this.id
    let newDate = document.createElement('TD')
    debugger
  }

  noFormDisplay(date) {
    let row = document.createElement('TR')
    row.id = this.id
    let newDate = document.createElement('TD')
    newDate.innerHTML = `${date.toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit' })}`
    let name = document.createElement('TD')
    name.innerHTML = `<a href="#" onclick= "loadCheckResults(); return false" class='check' id=${this.id}>${this.name}</a>`
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

function displayCheck(event) {
  document.querySelector('.newForm').style.display= "none"
  document.querySelector('#checkResult').style.display= "inline"
  let id = $('.id').data('temp')
  event.preventDefault()
  let answer= fetch(`/tax_years/${id}/checks/${event.target.id}.json`)
  .then(response => response.json())
  .then(json => {
    check = new Check(json)
    $('#checkName').text(`Name: ${check['name']}`)
    let date = new Date(check['check_date'])
    $('#checkDate').text(`Date: ${date.toDateString()}`)
    $('#checkAmount').text(`Amount: $${check['amount']}`)
    $('#checkMileage').text(`Mileage: ${check['mileage']}`)
    $('#checkEmployer').text(`Employer: ${check['employer']}`)
    $('#checkDescription').text(`Description: ${check['description']}`)
    let edit = document.querySelector('#checkEditLink')
    edit.innerHTML = `<a href="/checks/${check.id}/edit">Edit Check</a>`
  })
}

function addCheckListeners() {
  $(function () {
    $('.check').click(function(event) {
      debugger
      document.querySelector('.newForm').style.display= "none"
      document.querySelector('#checkResult').style.display= "inline"
      let id = $('.id').data('temp')
      event.preventDefault()
      let answer= fetch(`/tax_years/${id}/checks/${event.target.id}.json`)
      .then(response => response.json())
      .then(json => {
        check = new Check(json)
        $('#checkName').text(`Name: ${check['name']}`)
        let date = new Date(check['check_date'])
        $('#checkDate').text(`Date: ${date.toDateString()}`)
        $('#checkAmount').text(`Amount: $${check['amount']}`)
        $('#checkMileage').text(`Mileage: ${check['mileage']}`)
        $('#checkEmployer').text(`Employer: ${check['employer']}`)
        $('#checkDescription').text(`Description: ${check['description']}`)
        let edit = document.querySelector('#checkEditLink')
        edit.innerHTML = `<a href="/checks/${check.id}/edit">Edit Check</a>`
      })
    })
  })
}

function loadCheckResults() {
  debugger
  document.querySelector('.newForm').style.display= "none"
  document.querySelector('#checkResult').style.display= "inline"
  let id = $('.id').data('temp')
  let answer= fetch(`/tax_years/${id}/checks/${event.target.id}.json`)
  .then(response => response.json())
  .then(json => {
    debugger
    check = new Check(json)
    $('#checkName').text(`Name: ${check['name']}`)
    let date = new Date(check['check_date'])
    $('#checkDate').text(`Date: ${date.toDateString()}`)
    $('#checkAmount').text(`Amount: $${check['amount']}`)
    $('#checkMileage').text(`Mileage: ${check['mileage']}`)
    $('#checkEmployer').text(`Employer: ${check['employer']}`)
    $('#checkDescription').text(`Description: ${check['description']}`)
    let edit = document.querySelector('#checkEditLink')
    edit.innerHTML = `<a href="/checks/${check.id}/edit">Edit Check</a>`
  })
}
