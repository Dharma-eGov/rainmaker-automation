/// <reference types="Cypress" />

import { ISignIn,ICreateComplaint, IAddProperty, ICreateTradeLicense,IUpdateTradeLicense, IAuthRequired, IUpdateComplaint, ICreatePayment, IUpdateProperty } from './models';
import axios from 'axios';

function postApi(url: string, data: Cypress.RequestBody){
    let body: Partial<Cypress.RequestOptions> = {
        method: 'POST',
        url: url,
        failOnStatusCode: false,
        headers: {
            'content-type': 'application/json;charset=UTF-8'
        },
        body: data
    }
    return cy.request(body);
}
function postApiwithForm(url: string, data: Cypress.RequestBody){
    let body: Partial<Cypress.RequestOptions> = {
        method: 'POST',
        url: url,
        form:true,
        failOnStatusCode: false,
        headers: {
                'authorization': Cypress.env('AUTH')
        },
        body: data
    }
    return cy.request(body);
}

const signin = (data: Partial<ISignIn>) => {
    return postApiwithForm('user/oauth/token', data);
}

Cypress.Commands.add('signin', signin);

const createComplaint = (data: ICreateComplaint) => {
    return postApi( '/rainmaker-pgr/v1/requests/_create', data);
}

Cypress.Commands.add('createComplaint', createComplaint);

const updateComplaint = (data:IUpdateComplaint) => {
    return postApi( '/rainmaker-pgr/v1/requests/_update', data);
}

Cypress.Commands.add('updateComplaint', updateComplaint);


const addProperty = (data: IAddProperty) => {
    return postApi( '/property-services/property/_create', data);
}

Cypress.Commands.add('addProperty', addProperty);

const createTrade = (data: ICreateTradeLicense) => {
    return postApi( 'tl-services/v1/_create', data);
}
Cypress.Commands.add('createTrade', createTrade);

const updateTrade = (data:IUpdateTradeLicense ) => {
    return postApi( 'tl-services/v1/_update', data);
}

Cypress.Commands.add('updateTrade', updateTrade);

const searchTL = (data:IAuthRequired ,tenantID,appNo) => {
    return postApi( 'tl-services/v1/_search?tenantId='+tenantID+'&applicationNumber='+appNo, data);
}

Cypress.Commands.add('searchTL', searchTL);

const fetchBill = (data:IAuthRequired ,tenantID,appNo,bussinessService) => {
    return postApi( 'billing-service/bill/v2/_fetchbill?tenantId='+tenantID+'&consumerCode='+appNo+'&businessService='+bussinessService, data);
}

Cypress.Commands.add('fetchBill', fetchBill);

const createPayment = (data:ICreatePayment) => {
    return postApi( 'collection-services/payments/_create', data);
}

Cypress.Commands.add('createPayment', createPayment);

const updateProperty = (data:IUpdateProperty) => {
    return postApi( 'property-services/property/_update', data);
}

Cypress.Commands.add('updateProperty', updateProperty);
