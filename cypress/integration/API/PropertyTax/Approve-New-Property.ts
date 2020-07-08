/// <reference types="cypress" />
// @ts-check

import * as loginData from '@fixtures/testData/loginBody.json';
import * as propertyData from '@fixtures/testData/addProperty.json'
import * as updatePropertyData from '@fixtures/testData/updateProperty.json'
import * as newPropertyData from '@fixtures/testData/createPropertyRes.json'
import { propertyForward,createAssessment,propertyEstimate } from '../../../utils/apiutils.ts';


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
    it('Approver : Approve the property', () => {

        propertyForward(loginData.ptApprover, 'APPROVE','ACTIVE')


    })
    it('Assess the property and do payment ', () => {
        createAssessment(loginData.ptCemp, '2019-20')
        propertyEstimate(loginData.ptCemp, '2019-20')
        let totalAmount, billId=''
        let data = propertyData.residential
        let applicationNo=newPropertyData.Properties[0].propertyId
        cy.fetchBill(data,'pb.amritsar', applicationNo, 'PT')
        .then((response) => {
            expect(response.status).equal(201)
            console.log("total amount: " + response.body.Bill[0].totalAmount)
             totalAmount = response.body.Bill[0].totalAmount
             billId = response.body.Bill[0].id
        });

        cy.fixture('testData/createPayment.json').then((payment) => {

            payment.Payment.paymentDetails[0].businessService = 'PT'
            payment.Payment.paymentDetails[0].billId = billId
            payment.Payment.paymentDetails[0].totalAmountPaid = totalAmount
            payment.Payment.paymentDetails[0].totalDue = totalAmount
            payment.Payment.totalAmountPaid = totalAmount
            payment.Payment.totalDue = totalAmount
            let user=loginData.ptCemp
            cy.signin(user)
                .then((response) => {
                    expect(response.status).equal(200)
                    let ptaccess_token = response.body.access_token
                    payment.RequestInfo.authToken = ptaccess_token
                    payment.Payment.tenantId='pb.amritsar'
                    cy.createPayment(payment)
                        .then((response) => {
                            expect(response.status).equal(200)
                            console.log("total amount: "+response.body.Payments00[0].totalAmount)
                        });
                })
        })

    })

})
