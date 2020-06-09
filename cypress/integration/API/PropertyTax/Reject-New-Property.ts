/// <reference types="cypress" />
// @ts-check

import * as loginData from '@fixtures/testData/loginBody.json';
import * as propertyData from '@fixtures/testData/addProperty.json'
import * as updatePropertyData from '@fixtures/testData/updateProperty.json'
import * as newPropertyData from '@fixtures/testData/createPropertyRes.json'
import { propertyForward } from '../../../utils/apiutils.ts';


let access_token, propertyID = ""
let uProperty = updatePropertyData.valid
context('Create Property and Approve from Approver', () => {

    it('Create Property by citizen', () => {
        let user = loginData.citizen
        cy.signin(user)
            .then((response) => {
                expect(response.status).equal(200)
                access_token = response.body.access_token
                expect(response.body.UserRequest.roles[0].code).equal('CITIZEN');
                let property = propertyData.residential
                property.RequestInfo.authToken = access_token
                cy.addProperty(property)
                    .then((response) => {
                        expect(response.status).equal(201)
                        cy.writeFile('cypress/fixtures/testData/createPropertyRes.json', response.body);
                        propertyID = response.body.Properties[0].propertyId
                        console.log(propertyID)

                    })

            })


    })
    it('Document Verifier : Verify documents', () => {

        propertyForward(loginData.ptDocVerifier, 'VERIFY','INWORKFLOW')

    })
    it('Field Inspector : Verify Field Inspections', () => {

        propertyForward(loginData.ptFieldVerifier, 'FORWARD','INWORKFLOW')


    })
    it('Approver : Reject the property', () => {

        propertyForward(loginData.ptApprover, 'REJECT','INACTIVE')


    })

})
