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


  detailDisplay() {

  }
}
