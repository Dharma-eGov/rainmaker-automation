var axios = require('axios');
var qs = require('qs');


let citizenQa = async()=>{
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
        url: 'https://egov-micro-qa.egovernments.org/user/oauth/token',
        headers: { 
          'authority': 'egov-micro-qa.egovernments.org', 
          'authorization': 'Basic ZWdvdi11c2VyLWNsaWVudDplZ292LXVzZXItc2VjcmV0', 
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
      };
    const response = await axios(config);
    return response.data.access_token;
}
let docVerifierQa = async()=>{
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
     url: 'https://egov-micro-qa.egovernments.org/user/oauth/token',
     headers: { 
       'authority': 'egov-micro-qa.egovernments.org', 
       'authorization': 'Basic ZWdvdi11c2VyLWNsaWVudDplZ292LXVzZXItc2VjcmV0', 
       'Content-Type': 'application/x-www-form-urlencoded'
     },
     data : data
   };
  const response = await axios(config);
  return response.data.access_token;
}
let fieldInspectorQa = async()=>{
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
     url: 'https://egov-micro-qa.egovernments.org/user/oauth/token',
     headers: { 
       'authority': 'egov-micro-qa.egovernments.org', 
       'authorization': 'Basic ZWdvdi11c2VyLWNsaWVudDplZ292LXVzZXItc2VjcmV0', 
       'Content-Type': 'application/x-www-form-urlencoded'
     },
     data : data
   };
  const response = await axios(config);
  return response.data.access_token;
}
let approverQa = async()=>{
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
     url: 'https://egov-micro-qa.egovernments.org/user/oauth/token',
     headers: { 
       'authority': 'egov-micro-qa.egovernments.org', 
       'authorization': 'Basic ZWdvdi11c2VyLWNsaWVudDplZ292LXVzZXItc2VjcmV0', 
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
  approverQa
}

