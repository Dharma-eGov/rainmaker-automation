var expect = require('chai').expect;
const data = require('../TestData/AmritsarQA.json').AmritsarQa;
const dataFilePath = require('../TestData/AmritsarQA.json');
const {
    CreateNewPropertyAsCitizen,
    reviewedPropertyByApprover,createAssessment,assessmentHistory,billDetails} = require('../steps/CreateProperty');
const {
    citizenQa,
   docVerifierQa,
   fieldInspectorQa,
   approverQa
} = require("../authentication");

describe('Property workflow in QA for Amritsar region', function(){
        let propertyId, applicationId, assessmentNumber, billId, payableAmount;
        it('Check response status code as 201', async function(){
            var token = await citizenQa();
            this.timeout(5000);
            var response = await CreateNewPropertyAsCitizen(token,data);
            expect(response.status).to.equal(201);
            
        });
        it('Check status is INWORKFLOW and record acknowldgement ID with Property ID', async function(){
            this.timeout(5000);
            var token = await citizenQa();
            const response = await CreateNewPropertyAsCitizen(token,data);
            expect(response.data.Properties[0].status).to.equal('INWORKFLOW');
            applicationId = response.data.Properties[0].acknowldgementNumber;
            propertyId = response.data.Properties[0].propertyId
            
        });

        it('Verfiy Property id is generated', async function(){
            expect(propertyId !== null).to.equal(true);
        });
        it('Verfiy application id is generated', async function(){
            expect(applicationId !== null).to.equal(true);
        });
        
        it('Verify documents of property as Doc verifier', async function(){
            this.timeout(5000);
            var token = await docVerifierQa();
            var response = await reviewedPropertyByApprover(token,"DocVerifier",dataFilePath);
            expect(response.status).to.equal(200);
        });
        it('Inspection by Field Inspector', async function(){
            this.timeout(5000);
           var token = await fieldInspectorQa();
            var response = await reviewedPropertyByApprover(token,"FieldInspector",dataFilePath);
           expect(response.status).to.equal(200);
        });
        it('Approve the Application and determine the status as ACTIVE', async function(){
            this.timeout(5000);
            var token = await approverQa();
            var response = await reviewedPropertyByApprover(token,"Approver",dataFilePath);
           expect(response.status).to.equal(200);
           expect(response.data.Properties[0].status).to.equal('ACTIVE');
        });

        it('Create Assessment', async function(){
            this.timeout(5000);
            var token = await citizenQa();
            const response = await createAssessment(token,propertyId,dataFilePath,data);
            assessmentNumber = response.data.Assessments[0].assessmentNumber;
            expect(response.status).to.equal(201);

        });

        it('Check the Assessment is created', async function(){
            this.timeout(5000);
            var token = await citizenQa();
            const response = await assessmentHistory(token,propertyId,"pb.amritsar",data);
            expect(response.data.Assessments[0].assessmentNumber).to.equal(assessmentNumber);

        });

        it('Record Bill Id and total Payable amount', async function(){
            this.timeout(5000);
            var token = await citizenQa();
            const response = await billDetails(token,"pb.amritsar",propertyId,"PT",data);
            expect(response.status).to.equal(201);
            expect(response.data.Bill[0].id !==null).to.equal(true);
            billId = response.data.Bill[0].id;
            expect(response.data.Bill[0].totalAmount !==null).to.equal(true);
            payableAmount = response.data.Bill[0].totalAmount;
        })
});
    