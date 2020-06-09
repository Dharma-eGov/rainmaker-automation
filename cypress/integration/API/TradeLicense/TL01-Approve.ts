/// <reference types="cypress" />
// @ts-check

import * as loginData from '@fixtures/testData/loginBody.json';
import { createTradeLicense,verifyForward, searchTLApplication, makePaymentByEmployee } from '../../../utils/apiutils.ts';

context('Create Trade License and Approve it', () => {
    it('Create Trade License by citizen', () => {
        createTradeLicense(loginData.citizen)

    })

    it('Document verification', () => {
        verifyForward(loginData.tlDocVerifier, 'FORWARD', 'APPLIED')

    })
    it('TL Field inspection', () => {

        verifyForward(loginData.tlFieldVerifier, 'FORWARD', 'FIELDINSPECTION')

    });


    it('TL-Approver-Approve the application', () => {

        verifyForward(loginData.tlApprover, 'APPROVE', 'PENDINGAPPROVAL')
        searchTLApplication(loginData.tlApprover, 'PENDINGPAYMENT')
    })

    it('TL-FetchBill and Payment', () => {
        makePaymentByEmployee(loginData.tlCemp, 'pb.nawanshahr', 'TL')
        searchTLApplication(loginData.tlCemp, 'APPROVED')
    });
})
