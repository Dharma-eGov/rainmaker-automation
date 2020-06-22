/// <reference types="cypress" />
// @ts-check

import * as loginData from '@fixtures/testData/loginBody.json';
import { createTradeLicense,verifyForward, searchTLApplication,makeTLPaymentByEmployee} from '../../../utils/apiutils.ts';


context('Create Trade License and Sendback from approver', () => {

    it('Create Trade License by citizen', () => {
        createTradeLicense(loginData.citizen)

    })
    it('Document verification-Forward', () => {
        verifyForward(loginData.tlDocVerifier,'FORWARD','APPLIED')

    })

    it('TL-Field inspection-Send back', () => {
        verifyForward(loginData.tlFieldVerifier,'FORWARD','FIELDINSPECTION')

    })
    it('TL-Approver-SendBack the application', () => {
        verifyForward(loginData.tlApprover,'SENDBACK','PENDINGAPPROVAL')
        searchTLApplication(loginData.tlApprover,'FIELDINSPECTION')

    })
    it('TL-Field inspection-Approve the application', () => {

        verifyForward(loginData.tlFieldVerifier, 'FORWARD', 'FIELDINSPECTION')
    })
    it('TL-Approver-Approve the application', () => {

        verifyForward(loginData.tlApprover, 'APPROVE', 'PENDINGAPPROVAL')
        searchTLApplication(loginData.tlApprover, 'PENDINGPAYMENT')
    })

    it('TL-FetchBill and Payment', () => {
        makeTLPaymentByEmployee(loginData.tlCemp, 'pb.nawanshahr', 'TL')
        searchTLApplication(loginData.tlCemp, 'APPROVED')
    });

})
