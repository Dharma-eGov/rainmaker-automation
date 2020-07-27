
var axios = require('axios');
var qs = require('qs');
const fs = require('file-system');

const {filePath,payloadWithCitizen,payloadAsApprover,payloadForAssessment,payloadAssessmentHistory,
  payloadBillDetails,payloadAsEmployee,billing,fetchBillDetails,intiatePayment} = require('../CreatePropertyPayload');




let CreateNewPropertyAsCitizen = async (baseUrl,token,data)=>{
    try{    
           
            var data = await payloadWithCitizen(token,data);
            var config = {
                method: 'post',
                url: baseUrl+'/property-services/property/_create',
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
      console.log(e)
    }
}

let reviewedPropertyByApprover=async (baseUrl,token,approver,dataFilePath)=>{
  try{    
           
    var data = await payloadAsApprover(token,approver,dataFilePath);
    var config = {
        method: 'post',
        url: baseUrl+'/property-services/property/_update?',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      var response = await axios(config);
      
      return response;  
}catch(e){
  console.log(e)
}
}



let createAssessment = async (baseUrl,token,propertyId,dataFilePath,data)=>{
  try{
    var data = await payloadForAssessment(token,propertyId,dataFilePath,data);
    var config = {
      method: 'post',
      url: baseUrl+'/property-services/assessment/_create',
      headers: { 
        'authority': 'egov-micro-qa.egovernments.org', 
        'content-type': 'application/json;charset=UTF-8'
      },
      data : data
    };
    var response = await axios(config);
    return response;  

  }catch(e){
    throw new error;
  }
}

let assessmentHistory = async (baseUrl,token,propertyId,tenantId,data)=>{
  try{
    var param = qs.stringify({
      propertyIds: propertyId,
      tenantId : tenantId
    });
    var data = await payloadAssessmentHistory(token,data);
    var config = {
      method: 'post',
      url: baseUrl+`/property-services/assessment/_search?${param}`,
      headers: { 
        'authority': 'egov-micro-qa.egovernments.org', 
        'content-type': 'application/json;charset=UTF-8'
      },
      data : data
    };

    var response = await axios(config);
    return response; 

  }catch(e){
    console.log(e)
  }
}

let billDetails = async (baseUrl,token,tenantId,consumerCode,businessService,data)=>{
  try{
    var param = qs.stringify({
      tenantId : tenantId,
      consumerCode : consumerCode,
      businessService : businessService
    });
    var data = await payloadBillDetails(token,data);
    var config = {
      method: 'post',
      url: baseUrl+`/billing-service/bill/v2/_fetchbill?${param}`,
      headers: { 
        'authority': 'egov-micro-qa.egovernments.org', 
        'content-type': 'application/json;charset=UTF-8'
      },
      data : data
    };

    var response = await axios(config);
    return response; 
  }catch(e){
    console.log(e)
  }
}

let createNewPropertyAsEmployeeInDev = async (baseUrl,token, data)=>{
  try{

    var payload = await payloadAsEmployee(token,data);
    var config = {
      method: 'post',
      url: baseUrl+'/pt-services-v2/property/_create?tenantId=uk.dehradun',
      headers: { 
        'authority': 'uttarakhand-dev.egovernments.org', 
        'content-type': 'application/json;charset=UTF-8'
      },
      data : payload
    };
    var response = await axios(config);
    return response;

  }catch(e){
    console.log(e)
  }
}

let processBilling = async (baseUrl,token,data,demand,responseBody,tenantId,consumerCode)=>{
   try{
      var param = qs.stringify({
      tenantId : tenantId,
      consumerCode: consumerCode
     });
      var payload = await billing(token,data,demand,responseBody);
      var config = {
        method: 'post',
        url: baseUrl+`/billing-service/demand/_create?${param}`,
        headers: { 
          'authority': 'uttarakhand-dev.egovernments.org', 
          'content-type': 'application/json;charset=UTF-8'
        },
        data : payload
      };
      var response = await axios(config);
      return response;
  }catch(e){
    console.log(e)
  }
  
}
let fetchBillingDetails = async(baseUrl,token,consumerCode,tenantId,businessService,authority)=>{
  try{
    var param = qs.stringify({
      consumerCode : consumerCode,
      tenantId: tenantId,
      businessService:businessService
     });
     
    var payload = await fetchBillDetails(token);
    var config = {
      method: 'post',
      url: baseUrl+`/billing-service/bill/v2/_fetchbill?${param}`,
      headers: { 
        'authority': authority, 
        'content-type': 'application/json;charset=UTF-8'
      },
      data : payload
    };

    var response = await axios(config);
    return response;
  }catch(e){
    console.log(e)
  }
  
}

let fetchBillingDetailsQA = async(baseUrl,token,consumerCode,tenantId,businessService,authority)=>{
  try{
    var param = qs.stringify({
      consumerCode : consumerCode,
      tenantId: tenantId,
      businessService:businessService
     });
     
    var payload = {"RequestInfo":{
      "apiId": "Rainmaker",
      "ver": ".01",
      "action": "",
      "did": "1",
      "key": "",
      "msgId": "20170310130900|en_IN",
      "requesterId": "",
      "authToken": token
    }};
    var config = {
      method: 'post',
      url: baseUrl+`/billing-service/bill/v2/_fetchbill?${param}`,
      headers: { 
        'authority': 'egov-micro-qa.egovernments.org', 
        'content-type': 'application/json;charset=UTF-8'
      },
      data : payload
    };

    var response = await axios(config);
    return response;
  }catch(e){
    console.log(e)
  }
  
}

let inititatePayment = async (baseUrl,token,response,gateWay,callbackUrl,authority)=>{
  try{
    var payload = await intiatePayment(token,response,gateWay,callbackUrl);
    var config = {
      method: 'post',
      url: baseUrl+'/pg-service/transaction/v1/_create?',
      headers: { 
        'authority': authority, 
        'content-type': 'application/json;charset=UTF-8'
      },
      data : payload
    };
  
    var responseBody = await axios(config);
    return responseBody;
  }catch(e){
    console.log(e)
  }
  
}

module.exports={
  CreateNewPropertyAsCitizen,
  reviewedPropertyByApprover,
  createAssessment,
  assessmentHistory,
  billDetails,
  createNewPropertyAsEmployeeInDev,
  processBilling,
  fetchBillingDetails,
  fetchBillingDetailsQA,
  inititatePayment
}

// billDetails("08730fc3-f5a6-4fc0-bc8b-87c375e57f43","pb.amritsar","PB-PT-2020-07-16-005897","PT")
//       .then((val)=>{
//         console.log(val);
//         console.log(val.data.Bill[0].id);
//         console.log(val.data.Bill[0].totalAmount);
//       });