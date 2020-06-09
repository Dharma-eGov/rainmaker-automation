/// <reference types="cypress" />
// @ts-check

import * as loginData from '@fixtures/testData/loginBody.json';
import { createTradeLicense,verifyForward, searchTLApplication} from '../../../utils/apiutils.ts';


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
    it('TL-Approver-Reject the application', () => {
        verifyForward(loginData.tlApprover,'REJECT','PENDINGAPPROVAL')
        searchTLApplication(loginData.tlApprover,'REJECTED')

    })

})
