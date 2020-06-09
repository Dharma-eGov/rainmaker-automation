/// <reference types="cypress" />
// @ts-check

import * as loginData from '@fixtures/testData/loginBody.json';
import * as propertyData from '@fixtures/testData/addProperty.json'
import * as updatePropertyData from '@fixtures/testData/updateProperty.json'
import * as newPropertyData from '@fixtures/testData/createPropertyRes.json'


let access_token, propertyID = ""
let uProperty = updatePropertyData.valid
context('Pay Property tax for residentials', () => {
    it('Login as citizen', () => {
        let user = loginData.citizen
        cy.signin(user)
            .then((response) => {
                expect(response.status).equal(200)
                access_token = response.body.access_token
                expect(response.body.UserRequest.roles[0].code).equal('CITIZEN');

            })
    })
    it('Create Property by citizen', () => {
        let property = propertyData.residential
        property.RequestInfo.authToken = access_token
        cy.addProperty(property)
            .then((response) => {
                expect(response.status).equal(201)
                cy.writeFile('cypress/fixtures/testData/createPropertyRes.json', response.body);
                propertyID=response.body.Properties[0].propertyId
                console.log(propertyID)

            })

    })
    it('Verify documents', () => {
        let ptaccess_token,ackNumber = ''
        let user = loginData.ptDocVerifier
        cy.signin(user)
            .then((response) => {
                expect(response.status).equal(200)
                ptaccess_token = response.body.access_token
                expect(response.body.UserRequest.roles[0].code).equal('PT_DOC_VERIFIER');
                let uProperty = updatePropertyData.valid
                cy.readFile('cypress/fixtures/testData/createPropertyRes.json').then((response) => {

                    uProperty.Property = response.Properties[0]
                    uProperty.Property.workflow=updatePropertyData.valid.Property.workflow
                    ackNumber=response.Properties[0].acknowldgementNumber
                    console.log(uProperty.Property.propertyId)
                })

                uProperty.Property.workflow.businessId=ackNumber
                cy.updateProperty(uProperty)
                    .then((response) => {
                        expect(response.status).equal(200)
                        console.log(response.body.Properties[0].propertyId)

                    })

            })


    })

})
