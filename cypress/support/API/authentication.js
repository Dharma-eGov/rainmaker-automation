const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../../../.env')});
var axios = require('axios');
var qs = require('qs');



let citizenQa = async(baseUrl)=>{
    var data = qs.stringify({
      'username': '8653456267',
      'password': '123456',
      'grant_type': 'password',
      'scope': 'read',
      'tenantId': 'pb',
      'userType': 'CITIZEN' 
      });
      var config = {
        method: 'post',
        url: baseUrl+'/user/oauth/token',
        headers: { 
          'authority': 'egov-micro-qa.egovernments.org', 
          'authorization': process.env.AUTH, 
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
      };
    const response = await axios(config);
    return response.data.access_token;
}
let docVerifierQa = async(baseUrl)=>{
  var data = qs.stringify({
    'username': 'PTDV',
   'password': 'PTDV',
   'grant_type': 'password',
   'scope': 'read',
   'tenantId': 'pb.amritsar',
   'userType': 'EMPLOYEE' 
   });
   var config = {
     method: 'post',
     url: baseUrl+'/user/oauth/token',
     headers: { 
       'authority': 'egov-micro-qa.egovernments.org', 
       'authorization': process.env.AUTH, 
       'Content-Type': 'application/x-www-form-urlencoded'
     },
     data : data
   };
  const response = await axios(config);
  return response.data.access_token;
}
let fieldInspectorQa = async(baseUrl)=>{
  var data = qs.stringify({
    'username': 'PTFI',
   'password': 'PTFI',
   'grant_type': 'password',
   'scope': 'read',
   'tenantId': 'pb.amritsar',
   'userType': 'EMPLOYEE' 
   });
   var config = {
     method: 'post',
     url: baseUrl+'/user/oauth/token',
     headers: { 
       'authority': 'egov-micro-qa.egovernments.org', 
       'authorization': process.env.AUTH, 
       'Content-Type': 'application/x-www-form-urlencoded'
     },
     data : data
   };
  const response = await axios(config);
  return response.data.access_token;
}
let approverQa = async(baseUrl)=>{
  var data = qs.stringify({
    'username': 'PTA',
   'password': 'PTA',
   'grant_type': 'password',
   'scope': 'read',
   'tenantId': 'pb.amritsar',
   'userType': 'EMPLOYEE' 
   });
   var config = {
     method: 'post',
     url: baseUrl+'/user/oauth/token',
     headers: { 
       'authority': 'egov-micro-qa.egovernments.org', 
       'authorization': process.env.AUTH, 
       'Content-Type': 'application/x-www-form-urlencoded'
     },
     data : data
   };
  const response = await axios(config);
  return response.data.access_token;
}

let employeeDev = async(baseUrl)=>{
  var data = qs.stringify({
    'username': 'CounterEmployee',
    'password': 'eGov@123',
    'grant_type': 'password',
    'scope': 'read',
    'tenantId': 'uk.dehradun',
    'userType': 'EMPLOYEE' 
   });
   var config = {
    method: 'post',
    url: baseUrl+'/user/oauth/token',
    headers: { 
      'authority': 'uttarakhand-dev.egovernments.org', 
      'authorization': process.env.AUTH, 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : data
  };
  const response = await axios(config);
  return response.data.access_token;
}

let citizenDev = async(baseUrl)=>{
  var data = qs.stringify({
    'username': '8653456267',
    'password': '123456',
    'grant_type': 'password',
    'scope': 'read',
    'tenantId': 'uk',
    'userType': 'CITIZEN'  
   });
   var config = {
    method: 'post',
    url: baseUrl+'/user/oauth/token',
    headers: { 
      'authority': 'uttarakhand-dev.egovernments.org', 
      'authorization': process.env.AUTH, 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : data
  };
  const response = await axios(config);
  return response.data.access_token;
}


module.exports={
  citizenQa,
  docVerifierQa,
  fieldInspectorQa,
  approverQa,
  employeeDev,
  citizenDev
}

