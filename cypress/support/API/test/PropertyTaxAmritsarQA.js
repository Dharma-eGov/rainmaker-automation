const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../../../.env')});
var expect = require('chai').expect;
const data = require('../TestData/AmritsarQA.json').AmritsarQa;
const dataFilePath = require('../TestData/AmritsarQA.json');

const {
    CreateNewPropertyAsCitizen,
    reviewedPropertyByApprover,createAssessment,assessmentHistory,billDetails,fetchBillingDetailsQA,inititatePayment} = require('../steps/CreateProperty');
const {
    citizenQa,
   docVerifierQa,
   fieldInspectorQa,
   approverQa
} = require("../authentication");
const { moveCursor } = require('readline');
var response, propertyId, tenantId,applicationId, assessmentNumber,citizenToken,docVerifierToken,fieldInspectorToken,approverToken,billId, payableAmount;
async function PropertTaxFlowOfAmritsarQA(){
    describe('Property Tax workflow in QA for Amritsar region', function(){
        
        before('Setup token', async()=>{
            
            citizenToken = await citizenQa(process.env.BASE_URL_QA);
            docVerifierToken = await docVerifierQa(process.env.BASE_URL_QA);
            fieldInspectorToken = await fieldInspectorQa(process.env.BASE_URL_QA);
            approverToken = await approverQa(process.env.BASE_URL_QA);
        })

        it('Check response status code as 201', async function(){
            this.timeout(5000);
            response = await CreateNewPropertyAsCitizen(process.env.BASE_URL_QA,citizenToken,data);
            expect(response.status).to.equal(201);
            
        });
        it('Check status is INWORKFLOW and record acknowldgement ID with Property ID', async function(){
            this.timeout(5000);
            response = await CreateNewPropertyAsCitizen(process.env.BASE_URL_QA,citizenToken,data);
            expect(response.data.Properties[0].status).to.equal('INWORKFLOW');
            applicationId = response.data.Properties[0].acknowldgementNumber;
            propertyId = response.data.Properties[0].propertyId;
            tenantId =   response.data.Properties[0].tenantId;
            
        });
    
        it('Verfiy Property id is generated', async function(){
            expect(propertyId !== null).to.equal(true);
        });
        it('Verfiy application id is generated', async function(){
            expect(applicationId !== null).to.equal(true);
        });
        
        it('Verify documents of property as Doc verifier', async function(){
            this.timeout(5000);
            response = await reviewedPropertyByApprover(process.env.BASE_URL_QA,docVerifierToken,"DocVerifier",dataFilePath);
            expect(response.status).to.equal(200);
        });
        it('Inspection by Field Inspector', async function(){
            this.timeout(5000);
            response = await reviewedPropertyByApprover(process.env.BASE_URL_QA,fieldInspectorToken,"FieldInspector",dataFilePath);
           expect(response.status).to.equal(200);
        });
        it('Approve the Application and determine the status as ACTIVE', async function(){
           this.timeout(5000);
           response = await reviewedPropertyByApprover(process.env.BASE_URL_QA,approverToken,"Approver",dataFilePath);
           expect(response.status).to.equal(200);
           expect(response.data.Properties[0].status).to.equal('ACTIVE');
        });
    
        it('Create Assessment', async function(){
            this.timeout(5000);
            response = await createAssessment(process.env.BASE_URL_QA,citizenToken,propertyId,dataFilePath,data);
            assessmentNumber = response.data.Assessments[0].assessmentNumber;
            expect(response.status).to.equal(201);
    
        });
    
        it('Check the Assessment is created', async function(){
            this.timeout(5000);
            response = await assessmentHistory(process.env.BASE_URL_QA,citizenToken,propertyId,"pb.amritsar",data);
            expect(response.data.Assessments[0].assessmentNumber).to.equal(assessmentNumber);
    
        });
    
        it('Record Bill Id and total Payable amount', async function(){
            this.timeout(5000);
            response = await billDetails(process.env.BASE_URL_QA,citizenToken,"pb.amritsar",propertyId,"PT",data);
            expect(response.status).to.equal(201);
            expect(response.data.Bill[0].id !==null).to.equal(true);
            billId = response.data.Bill[0].id;
            expect(response.data.Bill[0].totalAmount !==null).to.equal(true);
            payableAmount = response.data.Bill[0].totalAmount;
            //console.log(JSON.stringify(response.data,null,2))
        });

        //Fetch and Initiate Payment
        it('Fetch billing details as a Citizen and store', async()=>{
            this.timeout(5000);
            response = await fetchBillingDetailsQA(
                process.env.BASE_URL_QA,
                citizenToken,
                propertyId,
                tenantId,
                propertyId.substring(3,5),
                process.env.AUTHORITY_QA
                );
          
             expect(response.status).to.equal(201);    
            
    });
    it('Initiate Payment', async()=>{
        this.timeout(5000);
        response = await inititatePayment(
            process.env.BASE_URL_QA,
            citizenToken,
            response.data.Bill[0],
            "AXIS",
            process.env.BASE_URL_QA+'/citizen/egov-common/paymentRedirectPage',
            process.env.AUTHORITY_QA
        );
        expect(response.status).to.equal(200); 
        expect(response.data.Transaction.txnStatus).to.equal("PENDING"); 
      
         paymentDetails= {
            "State":"Punjub",
            "Environment":"QA",
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
}


    

module.exports=PropertTaxFlowOfAmritsarQA;

    