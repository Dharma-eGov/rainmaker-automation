// in cypress/support/index.d.ts
// load type definitions that come with Cypress module
/// <reference path="models.ts" />
/// <reference types="Cypress" />

declare module "*.json"
{
    const value: any;
   export default value;
}

declare namespace Cypress {
    interface Chainable {
        /**
         * Custom command to select DOM element by data-cy attribute.
         * @example cy.dataCy('greeting')
        */
        signin(data: Partial<ISignIn>): Chainable<Response>
        createComplaint(data: Partial<ICreateComplaint>): Chainable<Response>
        addProperty(data: Partial<IAddProperty>): Chainable<Response>
        createTrade(data: Partial<ICreateTradeLicense>): Chainable<Response>
        updateTrade(data: Partial<IUpdateTradeLicense>): Chainable<Response>
        searchTL(data: Partial<IAuthRequired>, tenantID, appNo): Chainable<Response>
        fetchBill(data: Partial<IAuthRequired>, tenantID, appNo,bussinessService): Chainable<Response>
        updateComplaint(data: Partial<IUpdateComplaint>): Chainable<Response>
        createPayment(data: Partial<ICreatePayment>): Chainable<Response>
        updateProperty(data: Partial<IUpdateProperty>): Chainable<Response>



    }
}
