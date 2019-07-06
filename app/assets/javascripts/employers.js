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
    let newEm = document.createElement('h4')
    let newBreak = document.createElement('br')
    newEm.innerHTML = this.name
    newEm.appendChild(newBreak)
    employers.appendChild(newEm)

  }
}
