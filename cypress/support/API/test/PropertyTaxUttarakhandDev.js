const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../../../.env')});
var expect = require('chai').expect;
const data = require('../TestData/Uttarakhand.json');
//const dataFilePath = require('../TestData/Uttarakhand.json');

const {createNewPropertyAsEmployeeInDev,processBilling,fetchBillingDetails,inititatePayment} = require('../steps/CreateProperty');
const {employeeDev,citizenDev} = require("../authentication");
var empToken,citizenToken,response, propertyID, tenantId,paymentDetails;

async function PropertTaxFlowOfUttarakhandDev(){
    describe('Property Tax workflow in DEV for Uttarakhand region', function(){

        before('Setup token', async()=>{
            empToken = await employeeDev(process.env.BASE_URL_DEV);
            citizenToken = await citizenDev(process.env.BASE_URL_DEV);
        })
            
            it('Check response status code 200 and record certain details', async ()=>{
                this.timeout(5000);
                response = await createNewPropertyAsEmployeeInDev(
                    process.env.BASE_URL_DEV,
                    empToken,
                    data.PropertyTax
                    );
                expect(response.status).to.equal(200);
                propertyID = response.data.Properties[0].propertyId;
                tenantId =   response.data.Properties[0].tenantId;
                
            });
            it('Check status as ACTIVE', async ()=>{
                this.timeout(5000);
                expect(response.data.Properties[0].status).to.equal("ACTIVE");
            });
            it('Check response status code 201 for billing process', async ()=>{
                this.timeout(5000);
                response = await processBilling(
                    process.env.BASE_URL_DEV,
                    empToken,
                    data.PropertyTax,
                    data.PropertyTax.Demands,
                    response.data
                    );
                expect(response.status).to.equal(201);
                
            });
            it('Fetch billing details as a Citizen and store', async()=>{
                    this.timeout(5000);
                    response = await fetchBillingDetails(
                        process.env.BASE_URL_DEV,
                        citizenToken,
                        propertyID,
                        tenantId,
                        propertyID.substring(0,2),
                        process.env.AUTHORITY_DEV
                        );
                  
                expect(response.status).to.equal(201);    
            });
            it('Initiate Payment', async()=>{
                this.timeout(5000);
                response = await inititatePayment(
                    process.env.BASE_URL_DEV,
                    citizenToken,
                    response.data.Bill[0],
                    "CCAVENUE",
                    process.env.BASE_URL_DEV+'/citizen/egov-common/paymentRedirectPage',
                    process.env.AUTHORITY_DEV
                );
                expect(response.status).to.equal(200); 
                expect(response.data.Transaction.txnStatus).to.equal("PENDING"); 
               
                 paymentDetails= {
                    "State":"Uttarakhand",
                    "Environment":"DEV",
                    "Status":response.data.ResponseInfo.status,
                    "Bill Id":response.data.Transaction.billId,
                    "Amount":response.data.Transaction.txnAmount,
                    "Property ID":response.data.Transaction.consumerCode,
                    "Transaction ID":response.data.Transaction.txnId,
                    "Transaction Status": response.data.Transaction.txnStatus,
                    "Transaction Status Message": response.data.Transaction.txnStatusMsg,
                }
                
            })
            
    });
    
    after('End Test', ()=>{
        console.log(JSON.stringify(paymentDetails,null,2))  
        console.log("End Test");
    })
};

module.exports=PropertTaxFlowOfUttarakhandDev;


    