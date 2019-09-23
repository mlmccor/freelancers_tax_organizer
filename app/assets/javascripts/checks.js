class Check {
  constructor(attributes) {
    this.id = attributes['id']
    this.name = attributes['name']
    this.check_date = attributes['check_date']
    this.amount = attributes['amount']
    this.mileage = attributes['mileage']
    this.description = attributes['description']
    if (attributes['employer']) {
      this.employer = attributes['employer']
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
    employer.innerHTML = `<a href="/employers/${this.employer.id}/edit" id= employer->${this.employer.name}</a>`
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
    $('#checkEmployer').text(`Employer: ${check['employer']['name']}`)
    $('#checkDescription').text(`Description: ${check['description']}`)
    if (data['employer']['tax_form'] === true) {
      const table = document.querySelector(`#table-${data['employer']['id']}`)
      const total = document.querySelector(`#total-${data['employer']['id']}`)
      const amount = document.querySelector(`#total-${data['employer']['id']} #amount`)
      const mileage = document.querySelector(`#total-${data['employer']['id']} #mileage`)
      table.insertBefore(check.rowDisplay(date), total)
      amount.innerHTML = `$${parseInt(amount.innerText.slice(1)) + check.amount}`
      mileage.innerHTML = parseInt(mileage.innerHTML) + check.mileage
    } else {
      const table = document.querySelector(`#table-no-form`)
      const total = document.querySelector(`#no-form-totals`)
      const amount = document.querySelector(`#no-form-totals #amount`)
      const mileage = document.querySelector(`#no-form-totals #mileage`)
      table.insertBefore(check.noFormDisplay(date), total)
      amount.innerHTML = `$${parseInt(amount.innerText.slice(1)) + check.amount}`
      mileage.innerHTML = parseInt(mileage.innerHTML) + check.mileage
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
    debugger
    $('#checkName').text(`Name: ${check['name']}`)
    let date = new Date(check['check_date'])
    $('#checkDate').text(`Date: ${date.toDateString()}`)
    $('#checkAmount').text(`Amount: $${check['amount']}`)
    $('#checkMileage').text(`Mileage: ${check['mileage']}`)
    $('#checkEmployer').text(`Employer: ${check.employer.name}`)
    $('#checkDescription').text(`Description: ${check['description']}`)
    let edit = document.querySelector('#checkEditLink')
    edit.innerHTML = `<a href="/checks/${check.id}/edit">Edit Check</a>`
  })
}

function addCheckListeners() {
  $(function () {
    $('.check').click(function(event) {
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
  document.querySelector('.newForm').style.display= "none"
  document.querySelector('#checkResult').style.display= "inline"
  let id = $('.id').data('temp')
  let answer= fetch(`/tax_years/${id}/checks/${event.target.id}.json`)
  .then(response => response.json())
  .then(json => {
    check = new Check(json)
    $('#checkName').text(`Name: ${check['name']}`)
    let date = new Date(check['check_date'])
    $('#checkDate').text(`Date: ${date.toDateString()}`)
    $('#checkAmount').text(`Amount: $${check['amount']}`)
    $('#checkMileage').text(`Mileage: ${check['mileage']}`)
    $('#checkEmployer').text(`Employer: ${check['employer']['name']}`)
    $('#checkDescription').text(`Description: ${check['description']}`)
    let edit = document.querySelector('#checkEditLink')
    edit.innerHTML = `<a href="/checks/${check.id}/edit">Edit Check</a>`
  })
}
