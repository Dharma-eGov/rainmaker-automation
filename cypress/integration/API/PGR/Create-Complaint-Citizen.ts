/// <reference types="cypress" />
// @ts-check

import * as loginData from '@fixtures/testData/loginBody.json';
import * as complaintData from '@fixtures/testData/createComplaint.json';
import * as updateComplaintData from '@fixtures/testData/updateComplaint.json';
import * as newComplaintData from '@fixtures/testData/newComplaintRes.json';

let access_token, complaintNum = ""
context('Create Complaint with citizen', () => {
    it('Login as citizen', () => {
        let user = loginData.citizen
        cy.signin(user)
            .then((response) => {
                expect(response.status).equal(200)
                access_token = response.body.access_token
                expect(response.body.UserRequest.roles[0].code).equal('CITIZEN');

            })
    })
    it('Create complaint by citizen', () => {
        let complaint = complaintData.valid
        complaint.RequestInfo.authToken = access_token
        cy.createComplaint(complaint)
            .then((response) => {
                expect(response.status).equal(201)
                expect(response.body.ResponseInfo.status).equal('successful');
                cy.writeFile('cypress/fixtures/testData/newComplaintRes.json', response.body);
                complaintNum = response.body.services[0].serviceRequestId
                console.log(complaintNum)
            })



    })
    it('Assign Complaint to LME by GRO', () => {
        let user = loginData.GRO
        let GROaccess_token = ""
        cy.signin(user)
            .then((response) => {
                expect(response.status).equal(200)
                GROaccess_token = response.body.access_token
                expect(response.body.UserRequest.roles[0].code).equal('GRO');
                let updateComplaint = updateComplaintData.valid
                updateComplaint.RequestInfo.authToken = GROaccess_token
                updateComplaint.services = newComplaintData.services

                cy.updateComplaint(updateComplaint)
                    .then((response) => {
                        expect(response.status).equal(200)

                    })
            })



    })
    it('Resolve Complaint by LME', () => {
        let user = loginData.LME
        let LMEaccess_token = ""
        cy.signin(user)
            .then((response) => {
                expect(response.status).equal(200)
                LMEaccess_token = response.body.access_token
                expect(response.body.UserRequest.roles[0].code).equal('EMPLOYEE');
                let updateComplaint = updateComplaintData.valid
                updateComplaint.RequestInfo.authToken = LMEaccess_token
                updateComplaint.services = newComplaintData.services
                updateComplaint.actionInfo[0].action = ''
                updateComplaint.actionInfo[0].assignee = ''
                updateComplaint.actionInfo[0]['comments'] = 'Resolved'
                updateComplaint.actionInfo[0]['action'] = 'resolve'
                cy.updateComplaint(updateComplaint)
                    .then((response) => {
                        expect(response.status).equal(200)

                    })
            })
    })
})
