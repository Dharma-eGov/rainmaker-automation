/// <reference types="cypress" />
// @ts-check

import * as loginData from '@fixtures/testData/loginBody.json';
import { createTradeLicense,verifyForward,searchTLApplication,makeTLPaymentByEmployee } from '@src/utils/apiutils';


context('Create Trade License and Send Back from Filed inspector', () => {

    it('Create Trade License by citizen', () => {
        createTradeLicense(loginData.citizen)

    })
    it('Document verification-Forward', () => {
        verifyForward(loginData.tlDocVerifier,'FORWARD','APPLIED')

    })

    it('TL-Field inspection-Send back', () => {
        verifyForward(loginData.tlFieldVerifier,'SENDBACK','FIELDINSPECTION')
        searchTLApplication(loginData.tlFieldVerifier,'APPLIED')

    })
    it('TL Field inspection', () => {

        verifyForward(loginData.tlFieldVerifier, 'FORWARD', 'FIELDINSPECTION')

    });


    it('TL-Approver-Approve the application', () => {

        verifyForward(loginData.tlApprover, 'APPROVE', 'PENDINGAPPROVAL')
        searchTLApplication(loginData.tlApprover, 'PENDINGPAYMENT')
    })

    it('TL-FetchBill and Payment', () => {
        makeTLPaymentByEmployee(loginData.tlCemp, 'pb.nawanshahr', 'TL')
    });


})
