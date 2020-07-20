var axios = require('axios');
var qs = require('qs');
const fs = require('fs');


const {filePath,payloadWithCitizen,payloadAsApprover,payloadForAssessment,payloadAssessmentHistory,
  payloadBillDetails} = require('../CreatePropertyPayload');



let CreateNewPropertyAsCitizen = async (token,data)=>{
    try{    
           
            var data = await payloadWithCitizen(token,data);
            var config = {
                method: 'post',
                url: 'https://egov-micro-qa.egovernments.org/property-services/property/_create',
                headers: { 
                  'Content-Type': 'application/json'
                },
                data : data
              };
              var response = await axios(config);
              fs.writeFileSync(filePath, JSON.stringify(response.data,null,2), function (err) {
                if (err) return console.log(err);
                console.log('written');
              });
              return response;  
    }catch(e){
        console.error(e);
    }
}

let reviewedPropertyByApprover=async (token,approver,dataFilePath)=>{
  try{    
           
    var data = await payloadAsApprover(token,approver,dataFilePath);
    var config = {
        method: 'post',
        url: 'https://egov-micro-qa.egovernments.org/property-services/property/_update?',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      var response = await axios(config);
      
      return response;  
}catch(e){
console.error(e);
}
}



let createAssessment = async (token,propertyId,dataFilePath,data)=>{
  try{
    var data = await payloadForAssessment(token,propertyId,dataFilePath,data);
    var config = {
      method: 'post',
      url: 'https://egov-micro-qa.egovernments.org/property-services/assessment/_create',
      headers: { 
        'authority': 'egov-micro-qa.egovernments.org', 
        'content-type': 'application/json;charset=UTF-8'
      },
      data : data
    };
    var response = await axios(config);
    return response;  

  }catch(e){
    console.error(e);
  }
}

let assessmentHistory = async (token,propertyId,tenantId,data)=>{
  try{
    var param = qs.stringify({
      propertyIds: propertyId,
      tenantId : tenantId
    });
    var data = await payloadAssessmentHistory(token,data);
    var config = {
      method: 'post',
      url: `https://egov-micro-qa.egovernments.org/property-services/assessment/_search?${param}`,
      headers: { 
        'authority': 'egov-micro-qa.egovernments.org', 
        'content-type': 'application/json;charset=UTF-8'
      },
      data : data
    };

    var response = await axios(config);

    return response; 

  }catch(e){
    console.error(e);
  }
}

let billDetails = async (token,tenantId,consumerCode,businessService,data)=>{
  try{
    var param = qs.stringify({
      tenantId : tenantId,
      consumerCode : consumerCode,
      businessService : businessService
    });
    var data = await payloadBillDetails(token,data);
    var config = {
      method: 'post',
      url: `https://egov-micro-qa.egovernments.org/billing-service/bill/v2/_fetchbill?${param}`,
      headers: { 
        'authority': 'egov-micro-qa.egovernments.org', 
        'content-type': 'application/json;charset=UTF-8'
      },
      data : data
    };

    var response = await axios(config);
    return response; 
  }catch(e){
    console.error(e);
  }
}

module.exports={
  CreateNewPropertyAsCitizen,
  reviewedPropertyByApprover,
  createAssessment,
  assessmentHistory,
  billDetails
}

// billDetails("08730fc3-f5a6-4fc0-bc8b-87c375e57f43","pb.amritsar","PB-PT-2020-07-16-005897","PT")
//       .then((val)=>{
//         console.log(val);
//         console.log(val.data.Bill[0].id);
//         console.log(val.data.Bill[0].totalAmount);
//       });