/// <reference types="cypress" />
// @ts-check

import * as loginData from '@fixtures/testData/loginBody.json';
import { createTradeLicense,verifyForward,searchTLApplication } from '@src/utils/apiutils';


context('Create Trade License and Send Back from Filed inspector', () => {

    it('Create Trade License by citizen', () => {
        createTradeLicense(loginData.citizen)

    })
    it('Document verification-Forward', () => {
        verifyForward(loginData.tlDocVerifier,'FORWARD','APPLIED')

    })

    it('TL-Field inspection-Reject', () => {
        verifyForward(loginData.tlFieldVerifier,'REJECT','FIELDINSPECTION')
        searchTLApplication(loginData.tlFieldVerifier,'REJECTED')

    })


})
