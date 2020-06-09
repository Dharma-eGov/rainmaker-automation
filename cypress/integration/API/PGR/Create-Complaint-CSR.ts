/// <reference types="cypress" />
// @ts-check

import * as loginData from '@fixtures/testData/loginBody.json';
import * as complaintData from '@fixtures/testData/createComplaint.json'


let access_token,complaintNum=""
context('Create Complaint with CSR', () => {
    before(function () {
        let user = loginData.employee
        cy.signin(user)
            .then((response) => {
                expect(response.status).equal(200)
                access_token=response.body.access_token
                expect(response.body.UserRequest.roles[0].code).equal('CSR');

            })

    })
    it('Create complaint by CSR', () => {
        let complaint = complaintData.valid
        complaint.RequestInfo.authToken=access_token
        cy.createComplaint(complaint)
            .then((response) => {
                expect(response.status).equal(201)
                expect(response.body.ResponseInfo.status).equal('successful');
                complaintNum = response.body.services[0].serviceRequestId
                console.log(complaintNum)

            })


    })

})
