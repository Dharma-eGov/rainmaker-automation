import * as loginData from '@fixtures/testData/loginBody.json';
import * as tradeData from '@fixtures/testData/createTrade.json'
import * as tradeDataResponse from '@fixtures/testData/createTradeRes.json'
import * as tradeUpdateData from '@fixtures/testData/updateTrade.json'
import * as documentsData from '@fixtures/testData/wfDocuments.json'
import * as updateResData from '@fixtures/testData/updateTradeRes.json'
import * as createPayment from '@fixtures/testData/createPayment.json'
import * as propertyData from '@fixtures/testData/addProperty.json'
import * as updatePropertyData from '@fixtures/testData/updateProperty.json'
import * as newPropertyData from '@fixtures/testData/createPropertyRes.json'

export function createTradeLicense(usertype) {
    let access_token = ''
    let user = usertype
    cy.signin(user)
        .then((response) => {
            expect(response.status).equal(200)
            access_token = response.body.access_token
            expect(response.body.UserRequest.roles[0].code).equal('CITIZEN');
            let tradeLicense = tradeData.validLicense
            tradeLicense.RequestInfo.authToken = access_token
            cy.createTrade(tradeLicense)
                .then((response) => {
                    cy.writeFile('cypress/fixtures/testData/createTradeRes.json', response.body);
                    expect(response.status).equal(200)

                    let updateTrade = tradeUpdateData.validLicense
                    updateTrade.RequestInfo.authToken = access_token
                    updateTrade.Licenses = tradeDataResponse.Licenses
                    updateTrade.Licenses[0].action = 'APPLY'
                    updateTrade.Licenses[0].wfDocuments = documentsData.wfdocuments
                    updateTrade.Licenses[0].tradeLicenseDetail.applicationDocuments = documentsData.applicationDocuments

                    cy.updateTrade(updateTrade)
                        .then((response) => {
                            cy.writeFile('cypress/fixtures/testData/updateTradeRes.json', response.body);
                            expect(response.status).equal(200)
                        });
                    console.log('application created')

                });

        })


}

export function verifyForward(usertype, action, status) {
    let user = usertype

    cy.signin(user)
        .then((response) => {
            expect(response.status).equal(200)
            let access_token1 = response.body.access_token
            console.log(access_token1)
            let updateTrade = tradeUpdateData.validLicense
            console.log('access token' + access_token1)
            updateTrade.RequestInfo.authToken = access_token1
            updateTrade.Licenses = updateResData.Licenses
            updateTrade.Licenses[0].action = action
            updateTrade.Licenses[0].status = status
            updateTrade.Licenses[0].wfDocuments = documentsData.wfdocuments
            cy.updateTrade(updateTrade)
                .then((response) => {
                    expect(response.status).equal(200)
                });
        })
}

export function searchTLApplication(usertype, status) {
    let user = usertype
    let applicationNo = ''
    cy.signin(user)
        .then((response) => {
            expect(response.status).equal(200)
            let access_token1 = response.body.access_token
            console.log(access_token1)
            let searchTrade = tradeUpdateData.validLicense
            searchTrade.RequestInfo.authToken = access_token1
            applicationNo = updateResData.Licenses[0].applicationNumber
            cy.searchTL(searchTrade, 'pb.nawanshahr', applicationNo)
                .then((response) => {
                    // cy.writeFile('cypress/fixtures/testData/updateTradeRes.json', response.body);
                    expect(response.status).equal(200)
                    expect(response.body.Licenses[0].status).equal(status)
                });
        })
}

export function propertyForward(usertype,action,status) {

    let user = usertype
    let ptaccess_token, ackNumber = ''
    cy.signin(user)
        .then((response) => {
            expect(response.status).equal(200)
            ptaccess_token = response.body.access_token
            // expect(response.body.UserRequest.roles[0].code).equal('PT_DOC_VERIFIER');
            let uProperty = updatePropertyData.valid
            cy.readFile('cypress/fixtures/testData/createPropertyRes.json').then((response) => {

                uProperty.Property = response.Properties[0]
                ackNumber = response.Properties[0].acknowldgementNumber
                uProperty.Property.workflow = updatePropertyData.workflow

                console.log(uProperty.Property.propertyId)
                console.log('ack number : ' + ackNumber)
                uProperty.Property.workflow.businessId = ackNumber
                uProperty.Property.workflow.action=action
                uProperty.RequestInfo.authToken = ptaccess_token
            })
            cy.updateProperty(uProperty)
                .then((response) => {
                    expect(response.status).equal(200)
                    console.log(response.body.Properties[0].propertyId)
                    expect(response.body.Properties[0].status).equal(status)

                })


        })
}

export function makePaymentByEmployee(usertype, tenant, bussinessService) {
    let tlcemp = usertype
    let totalAmount: number, billId, applicationNo, access_token = ''
    cy.signin(tlcemp)
        .then((response) => {
            expect(response.status).equal(200)
            access_token = response.body.access_token
        });
    let updateTrade = tradeUpdateData.validLicense
    applicationNo = updateResData.Licenses[0].applicationNumber
    cy.fetchBill(updateTrade, tenant, applicationNo, bussinessService)
        .then((response) => {
            expect(response.status).equal(201)
            console.log("total amount: " + response.body.Bill[0].totalAmount)
            totalAmount = response.body.Bill[0].totalAmount
            billId = response.body.Bill[0].id
        });
    cy.fixture('testData/createPayment.json').then((payment) => {
        payment.RequestInfo.authToken = access_token
        payment.Payment.paymentDetails[0].businessService = bussinessService
        payment.Payment.paymentDetails[0].billId = billId
        payment.Payment.paymentDetails[0].totalAmountPaid = totalAmount
        payment.Payment.paymentDetails[0].totalDue = totalAmount
        payment.Payment.totalAmountPaid = totalAmount
        payment.Payment.totalDue = totalAmount
        cy.createPayment(payment)
            .then((response) => {
                expect(response.status).equal(200)
                // console.log("total amount: "+response.body.Bill[0].totalAmount)
            });
    })
}
