/// <reference types="cypress" />
// @ts-check
import * as languagePage from '@fixtures/pageObjects/LanguageSelectPage.json';
import * as loginPage from '@fixtures/pageObjects/LoginPage.json';
describe('Login Test Cases',() => {
    it('Login as Citizen', () => {
        cy.eyesOpen()
        cy.visit('/citizen')
        cy.eyesCheckWindow('loginPage')
        cy.get(languagePage.engButton).click()
        cy.get(languagePage.continueButton).click()
        cy.get(loginPage.login.loginButton).click()
        cy.get(loginPage.login.mobileNumberInput).type('9742379422')
        cy.get(loginPage.login.continueButton).click()
        cy.get(loginPage.login.otpInput).type('123456')
        cy.get(loginPage.login.submitButton).click()

        if (cy.get('div.logout-yes-button').should('be.visible')) {

            cy.get('div.logout-yes-button').click()
            cy.get('#profile-save-action').click()
            cy.get('[data-localization="Home"]').click()


        }
        else {
            console.log('alert city not found')
        }
        cy.get('div.citizen-dashboard-cont').should('be.visible')

    });
    it('Create complaint', () => {
        // cy.visit('/citizen')
        cy.get('#COMPLAINTS-1').click()
        cy.contains('File Complaint').click()

    });


})
