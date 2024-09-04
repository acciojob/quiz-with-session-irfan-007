// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
describe('Quiz Test', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.sessionStorage.clear()
      win.localStorage.clear()
    })
  })

  it('should persist data', () => {
    cy.visit(baseUrl + "/main.html");

    //... your test code

    cy.window().then((win) => {
      win.sessionStorage.setItem('progress', JSON.stringify(choiList))
      win.localStorage.setItem('score', currentScore)
    })

    cy.reload()

    //... rest of your test code
  })
})
