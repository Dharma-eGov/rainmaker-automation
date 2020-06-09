/// <reference types="cypress" />
// @ts-check

import * as loginData from '@fixtures/testData/loginBody.json';
import { verifyForward, searchTLApplication,createTradeLicense } from '../../../utils/apiutils.ts';


let access_token, applicationNo = ""
// var tlDetails={ "key1": "val1", "key2": "value2" };
context('Create Trade License and Approve it', () => {

    it('Create Trade License by citizen', () => {
        createTradeLicense(loginData.citizen)

    })
    it('Document verification', () => {
        verifyForward(loginData.tlDocVerifier, 'REJECT', 'APPLIED')
        searchTLApplication(loginData.tlDocVerifier,'REJECTED')
    })

})
