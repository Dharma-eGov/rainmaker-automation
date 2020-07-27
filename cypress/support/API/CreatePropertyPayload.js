var fs = require('file-system');
var path = require('path');
const { v4: uuidv4 } = require('uuid');
const filePath = path.parse(__dirname).dir+"\\API\\generatedResponse\\response.json";
var date = new Date();
const {
    Locality,Address,ConstructionDetail,Units,Owner,Document,Property,RequestInfo,RequestBody,UpdateLocality,GeoLocation,UpdateAddress,Roles,UpdateOwner,UpdateDocument,UpdateConstructionDetails,
    UpdateUnit,AuditDetails,Assignes,Workflow,UpdateProperty,UpdateRequestInfo,UpdateRequestBody,
    AdditionalDetails,Assessment,RequestBodyAssessment,AssessmentHistory,RequestInfoBillDetails,BillDetails,
    CitizenInfo,Documents2,Owners2,Units2,AdditionalDetails2,PropertyDetails,Properties2,RequestBody2,
    DemandDetails,Payer,Demands,RequestBodyBilling,User,TaxandPayment,Transactions,RequestInfoForPayment
    ,RequestBodyForMakePayment
} = require("./FieldMapping");
const { error } = require('console');



let payloadWithCitizen = async (token,data)=>{
    try{

let loc = new Locality(data.code,data.area);
let address = new Address(data.city,data.doorNo,loc);
let units = ()=>{
    let unit=[];
    for(const item in data.units){
        unit.push(
            new Units(
                data.units[item].occupancyType,
                data.units[item].floorNo,
                data.units[item].arv,
                new ConstructionDetail(data.units[item].constructionDetail.builtUpArea),
                data.units[item].tenantId,
                data.units[item].usageCategory,
                data.units[item].unitType
                ));
        }
    return unit;
}

let owner = ()=>{
    let owner = [];
    for (const item in data.owners) {
        owner.push(
            new Owner(
                data.owners[item].name,
                data.owners[item].mobileNumber,
                data.owners[item].fatherOrHusbandName,
                data.owners[item].emailId,
                data.owners[item].permanentAddress,
                data.owners[item].relationship,
                data.owners[item].ownerType,
                data.owners[item].gender,
                data.owners[item].isCorrespondenceAddress
                )
        )
    }
    return owner;
}

let documents = ()=>{
    let doc = [];
    for(const item in data.documents){
        doc.push(new Document(
            data.documents[item].documentType,
            data.documents[item].fileStoreId,
            data.documents[item].documentUid,
        )
        )
    }

    return doc;
}

let property = new Property(
data.tenantId,address,data.usageCategoryMinor,units(),data.usageCategoryMajor,data.landArea,data.noOfFloors,
data.propertyType,data.ownershipCategory,owner(),data.source,data.channel,documents(),
data.creationReason,data.superBuiltUpArea,data.usageCategory);
let request = new RequestInfo(data.apiId, data.ver, data.ts, data.action, data.did, data.key, data.msgId, token);

let payload = new RequestBody(request,property); 
return JSON.stringify(payload,null,2);


    }catch(e){
        console.error(e)
    }
}

let payloadAsApprover= async (token,approver,dataFilePath)=>{
    try{
        
      
        const response = JSON.parse(fs.readFileSync(filePath, 'utf8'));
       
       let roles = (propIndex, ownerIndex)=>{
           let roles = [];
           for(const item in response.Properties[propIndex].owners[ownerIndex].roles){
                    roles.push(
                        new Roles(
                            response.Properties[propIndex].owners[ownerIndex].roles[item].id,
                            response.Properties[propIndex].owners[ownerIndex].roles[item].name,
                            response.Properties[propIndex].owners[ownerIndex].roles[item].code,
                            response.Properties[propIndex].owners[ownerIndex].roles[item].tenantId,
                        )
                    );
           }
           return roles;
       }

        let owner = (index)=>{
            let owners = [];
            for(const item in response.Properties[index].owners){
                    owners.push(
                        new UpdateOwner(
                            response.Properties[index].owners[item].id,
                            response.Properties[index].owners[item].uuid,
                            response.Properties[index].owners[item].userName,
                            response.Properties[index].owners[item].password,
                            response.Properties[index].owners[item].salutation,
                            response.Properties[index].owners[item].name,
                            response.Properties[index].owners[item].gender,
                            response.Properties[index].owners[item].mobileNumber,
                            response.Properties[index].owners[item].emailId,
                            response.Properties[index].owners[item].altContactNumber,
                            response.Properties[index].owners[item].pan,
                            response.Properties[index].owners[item].aadhaarNumber,
                            response.Properties[index].owners[item].permanentAddress,
                            response.Properties[index].owners[item].permanentCity,
                            response.Properties[index].owners[item].permanentPinCode,
                            response.Properties[index].owners[item].correspondenceCity,
                            response.Properties[index].owners[item].correspondencePinCode,
                            response.Properties[index].owners[item].correspondenceAddress,
                            response.Properties[index].owners[item].active,
                            response.Properties[index].owners[item].dob,
                            response.Properties[index].owners[item].pwdExpiryDate,
                            response.Properties[index].owners[item].locale,
                            response.Properties[index].owners[item].type,
                            response.Properties[index].owners[item].signature,
                            response.Properties[index].owners[item].accountLocked,
                            roles(index,item),
                            response.Properties[index].owners[item].fatherOrHusbandName,
                            response.Properties[index].owners[item].bloodGroup,
                            response.Properties[index].owners[item].identificationMark,
                            response.Properties[index].owners[item].photo,
                            response.Properties[index].owners[item].createdBy,
                            response.Properties[index].owners[item].createdDate,
                            response.Properties[index].owners[item].lastModifiedBy,
                            response.Properties[index].owners[item].lastModifiedDate,
                            response.Properties[index].owners[item].tenantId,
                            response.Properties[index].owners[item].ownerInfoUuid,
                            response.Properties[index].owners[item].isPrimaryOwner,
                            response.Properties[index].owners[item].ownerShipPercentage,
                            response.Properties[index].owners[item].ownerType,
                            response.Properties[index].owners[item].institutionId,
                            response.Properties[index].owners[item].status,
                            response.Properties[index].owners[item].documents,
                            response.Properties[index].owners[item].relationship,
                            
                        )
                    );
            }

            return owners;
        }

    let document = (index)=>{
            let documents = [];
            for(const item in  response.Properties[index].documents){
                documents.push(
                    new UpdateDocument(
                        response.Properties[index].documents[item].id,
                        response.Properties[index].documents[item].documentType,
                        response.Properties[index].documents[item].fileStoreId,
                        response.Properties[index].documents[item].documentUid,
                        response.Properties[index].documents[item].auditDetails,
                        response.Properties[index].documents[item].status, 
                    )
                );
            }
            return documents;
    }

    let unit = (index)=>{
        let units = [];
        for(const item in response.Properties[index].units){
            units.push(
                new UpdateUnit(
                    response.Properties[index].units[item].id, 
                    response.Properties[index].units[item].tenantId, 
                    response.Properties[index].units[item].floorNo, 
                    response.Properties[index].units[item].unitType, 
                    response.Properties[index].units[item].usageCategory, 
                    response.Properties[index].units[item].occupancyType, 
                    response.Properties[index].units[item].active, 
                    response.Properties[index].units[item].occupancyDate,
                    new UpdateConstructionDetails(
                        response.Properties[index].units[item].constructionDetail.carpetArea,
                        response.Properties[index].units[item].constructionDetail.builtUpArea,
                        response.Properties[index].units[item].constructionDetail.plinthArea,
                        response.Properties[index].units[item].constructionDetail.superBuiltUpArea,
                        response.Properties[index].units[item].constructionDetail.constructionType,
                        response.Properties[index].units[item].constructionDetail.constructionDate,
                        response.Properties[index].units[item].constructionDetail.dimensions,
                    ),
                    response.Properties[index].units[item].additionalDetails,
                    response.Properties[index].units[item].auditDetails,
                    response.Properties[index].units[item].arv
                )
            );
        }
        return units;
    }
    
    let geoLocation = (item)=>{

      let loc;
      (response.Properties[item].address.locality.latitude===null)? loc=0:loc=response.Properties[item].address.locality.latitude;
      (response.Properties[item].address.locality.longitude===null)? loc=0:loc=response.Properties[item].address.locality.longitude;
      return loc;
    }

    let workflow = (item,approver)=>{
        if(approver.includes("DocVerifier")){
            return new Workflow(
                dataFilePath.WorkFlowDocVerifier.id,
                response.Properties[item].tenantId,
                dataFilePath.WorkFlowDocVerifier.businessService,
                response.Properties[item].acknowldgementNumber,
                dataFilePath.WorkFlowDocVerifier.action,
                dataFilePath.WorkFlowDocVerifier.moduleName,
                dataFilePath.WorkFlowDocVerifier.state,
                dataFilePath.WorkFlowDocVerifier.comment,
                dataFilePath.WorkFlowDocVerifier.documents,
                [new Assignes(dataFilePath.WorkFlowDocVerifier.assignes[0].uuid)]
                
            )
        }
        if(approver.includes("FieldInspector")){
            return new Workflow(
                dataFilePath.WorkFlowFI.id,
                response.Properties[item].tenantId,
                dataFilePath.WorkFlowFI.businessService,
                response.Properties[item].acknowldgementNumber,
                dataFilePath.WorkFlowFI.action,
                dataFilePath.WorkFlowFI.moduleName,
                dataFilePath.WorkFlowFI.state,
                dataFilePath.WorkFlowFI.comment,
                dataFilePath.WorkFlowFI.documents,
                [new Assignes(dataFilePath.WorkFlowFI.assignes[0].uuid)]
                
            )
        }
        if(approver.includes("Approver")){
            return new Workflow(
                dataFilePath.WorkFlowApprover.id,
                response.Properties[item].tenantId,
                dataFilePath.WorkFlowApprover.businessService,
                response.Properties[item].acknowldgementNumber,
                dataFilePath.WorkFlowApprover.action,
                dataFilePath.WorkFlowApprover.moduleName,
                dataFilePath.WorkFlowApprover.state,
                dataFilePath.WorkFlowApprover.comment,
                dataFilePath.WorkFlowApprover.documents,
                dataFilePath.WorkFlowApprover.assignes
                
            )
        }
    }
        
    let property = ()=>{
        let properties;
        for(const item in response.Properties){
            properties=
                new UpdateProperty(
                    response.Properties[item].id,
                    response.Properties[item].propertyId,
                    response.Properties[item].surveyId,
                    response.Properties[item].linkedProperties,
                    response.Properties[item].tenantId,
                    response.Properties[item].accountId,
                    response.Properties[item].oldPropertyId,
                    response.Properties[item].status,
                    new UpdateAddress(
                        response.Properties[item].address.tenantId,
                        response.Properties[item].address.doorNo,
                        response.Properties[item].address.plotNo,
                        response.Properties[item].address.id,
                        response.Properties[item].address.landmark,
                        response.Properties[item].address.city,
                        response.Properties[item].address.district,
                        response.Properties[item].address.region,
                        response.Properties[item].address.state,
                        response.Properties[item].address.country,
                        response.Properties[item].address.pincode,
                        response.Properties[item].address.buildingName,
                        response.Properties[item].address.street,
                        new UpdateLocality( 
                            response.Properties[item].address.locality.code,
                            response.Properties[item].address.locality.name,
                            response.Properties[item].address.locality.label,
                            response.Properties[item].address.locality.latitude,
                            response.Properties[item].address.locality.longitude,
                            response.Properties[item].address.locality.area,
                            response.Properties[item].address.locality.children,
                            response.Properties[item].address.locality.materializedPath
    
                            ),
                            new GeoLocation(
                                geoLocation(item),
                                geoLocation(item)
                            ),
                            response.Properties[item].additionalDetails  
                    ),
                    response.Properties[item].acknowldgementNumber,
                    response.Properties[item].propertyType,
                    response.Properties[item].ownershipCategory,
                    owner(item),
                    response.Properties[item].institution,
                    response.Properties[item].creationReason,
                    response.Properties[item].usageCategory,
                    response.Properties[item].noOfFloors,
                    response.Properties[item].landArea,
                    response.Properties[item].superBuiltUpArea,
                    response.Properties[item].source,
                    response.Properties[item].channel,
                    document(item),
                    unit(item),
                    response.Properties[item].additionalDetails,
                    new AuditDetails(
                        response.Properties[item].auditDetails.createdBy,
                        response.Properties[item].auditDetails.lastModifiedBy,
                        response.Properties[item].auditDetails.createdTime,
                        response.Properties[item].auditDetails.lastModifiedTime,  
                    ),

                    workflow(item,approver)
                    )
            

            return properties;
                
        }
    }
    let requestInfo = new UpdateRequestInfo("Mihy",".01","","1","","20170310130900|en_IN","",token);
    let requestBody = new UpdateRequestBody(requestInfo,property());
    return JSON.stringify(requestBody,null,2);
    

    }catch(e){
        console.error(e);
    }
}

let payloadForAssessment = async (token,propertyID,dataFilePath,data) =>{
    let additionalDetails = new AdditionalDetails();
    let assessment = new Assessment(dataFilePath.Assessment.tenantId,propertyID,dataFilePath.Assessment.financialYear,
        dataFilePath.Assessment.assessmentDate,dataFilePath.Assessment.source,dataFilePath.Assessment.channel,additionalDetails)
        let request = new RequestInfo(data.apiId, data.ver, data.ts, data.action, data.did, data.key, data.msgId, token);
        let requestAssessmentBody = new RequestBodyAssessment(request,assessment);
        
        return JSON.stringify(requestAssessmentBody,null,2);
}

let payloadAssessmentHistory = async (token,data) =>{
    let request = new RequestInfo(data.apiId, data.ver, data.ts, data.action, data.did, data.key, data.msgId, token);
    let payload = new AssessmentHistory(request);
    return JSON.stringify(payload,null,2);
}

let payloadBillDetails = async(token,data)=>{
    let billDetails = new RequestInfoBillDetails(data.apiId, data.ver,"",data.did,data.key,data.msgId,"",token);
    let payloadBillDetails = new BillDetails(billDetails);

    return JSON.stringify(payloadBillDetails,null,2);
}


let payloadAsEmployee = async(token,data)=>{

    try{
        let documents =(index)=>{
            let documents = [];
            for(const item in data.Properties[index].propertyDetails){
                    documents.push(
                        new Documents2(
                            data.Properties[index].propertyDetails[index].owners[index].documents[item].documentUid,
                            data.Properties[index].propertyDetails[index].owners[index].documents[item].documentType,
                        )
                    );
            }
           
            return documents;
    }
    
    
    let owners = (index)=>{
        let owners=[];
        for(const item in data.Properties[index].propertyDetails){
            owners.push (
                new Owners2(
                    documents(item),
                    data.Properties[index].propertyDetails[index].owners[item].name,
                    data.Properties[index].propertyDetails[index].owners[item].mobileNumber,
                    data.Properties[index].propertyDetails[index].owners[item].fatherOrHusbandName,
                    data.Properties[index].propertyDetails[index].owners[item].emailId,
                    data.Properties[index].propertyDetails[index].owners[item].permanentAddress,
                    data.Properties[index].propertyDetails[index].owners[item].relationship,
                    data.Properties[index].propertyDetails[index].owners[item].ownerType,
                    data.Properties[index].propertyDetails[index].owners[item].gender,

                    )
            );
        }
        return owners;
    }

    let citizenInfo = (index)=>{
        return new CitizenInfo(
            data.Properties[index].propertyDetails[index].citizenInfo.mobileNumber,
            data.Properties[index].propertyDetails[index].citizenInfo.name
        )
    }

    let units = (index)=>{
            let units = [];
            for(const item in data.Properties[index].propertyDetails){
                units.push(
                    new Units2(
                        data.Properties[index].propertyDetails[index].units[item].constructionYear,
                        data.Properties[index].propertyDetails[index].units[item].usageCategoryMinor,
                        data.Properties[index].propertyDetails[index].units[item].usageCategoryMajor,
                        data.Properties[index].propertyDetails[index].units[item].usageCategoryDetail,
                        data.Properties[index].propertyDetails[index].units[item].usageCategorySubMinor,
                        data.Properties[index].propertyDetails[index].units[item].occupancyType,
                        data.Properties[index].propertyDetails[index].units[item].ConstructionType,
                        data.Properties[index].propertyDetails[index].units[item].unitArea,
                        data.Properties[index].propertyDetails[index].units[item].floorNo,
                        data.Properties[index].propertyDetails[index].units[item].arv 
                    )
                );
            }
            return units;
    }

    let propertyDetails = (index)=>{
        let propdetails=[];
      
         for(const item in data.Properties[index].propertyDetails){
        
            propdetails.push(
                new PropertyDetails(
                    data.Properties[index].propertyDetails[item].usageCategoryMinor,
                    units(item),
                    data.Properties[index].propertyDetails[item].usageCategoryMajor,
                    data.Properties[index].propertyDetails[item].propertySubType,
                    data.Properties[index].propertyDetails[item].landArea,
                    data.Properties[index].propertyDetails[item].buildUpArea,
                    data.Properties[index].propertyDetails[item].noOfFloors,
                    data.Properties[index].propertyDetails[item].propertyType,
                    new AdditionalDetails2(date.toISOString()),
                    data.Properties[index].propertyDetails[item].ownershipCategory,
                    data.Properties[index].propertyDetails[item].subOwnershipCategory,
                    owners(item),
                    citizenInfo(item),
                    data.Properties[index].propertyDetails[item].financialYear,
                    data.Properties[index].propertyDetails[item].source,
                    data.Properties[index].propertyDetails[item].assessmentDate

                )
            )
         }
        return propdetails;
    }

    let properties = ()=>{
        let properties = [];
        for(const item in data.Properties){
            properties.push(
                new Properties2(
                    data.Properties[item].tenantId,
                    new Address(
                        data.Properties[item].address.city,
                        data.Properties[item].address.doorNo,
                        new Locality(
                            data.Properties[item].address.locality.code,
                            data.Properties[item].address.locality.area 
                            )
                       ),

                    propertyDetails(item)   
                )
            )
        }
        return properties;
    }
    let reqInfo = new RequestInfo(
        data.RequestInfo.apiId,
        data.RequestInfo.ver,
        data.RequestInfo.ts,
        data.RequestInfo.action,
        data.RequestInfo.did,
        data.RequestInfo.key,
        data.RequestInfo.msgId,
        token
        );
    let request = new RequestBody2(reqInfo, properties());
    return JSON.stringify(request,null,2);

    }catch(e){
        console.log(e);
    }
   
} 

let billing = async (token,data,demand,response)=>{
    try{

        let demandDetails = (index)=>{
            let details = [];
            for(const item in data.Demands[index].demandDetails){
                details.push(
                    new DemandDetails(
                        demand[index].demandDetails[item].taxHeadMasterCode,
                        demand[index].demandDetails[item].taxAmount,
                        demand[index].demandDetails[item].collectionAmount
                    )
                )
            }
            return details;
        }

        let propertyForBilling = (index)=>{
            let billingPropertyDetails = [];
            for(const item in response.Properties[index].propertyDetails){
              
                billingPropertyDetails.push(response.Properties[index].propertyDetails[item])
            }
           
            return billingPropertyDetails;
        }
        let demands = ()=>{
            let arrayOfDemands = [];
            for(const item in data.Properties){
                arrayOfDemands.push(
                    new Demands(
                        response.Properties[item].tenantId,
                        response.Properties[item].propertyId,
                        propertyForBilling(item)[item].propertyType,
                        response.Properties[item].propertyId.substring(0, 2),
                         1554076800000,
                         1585699199000,
                        new Payer(propertyForBilling(item)[item].citizenInfo.uuid),
                        demandDetails(item)
                    )
                     
                )
            }

            return arrayOfDemands;
        }
        let requestInfo = new RequestInfo(
            data.RequestInfo.apiId,
            data.RequestInfo.ver,
            data.RequestInfo.ts,
            data.RequestInfo.action,
            data.RequestInfo.did,
            data.RequestInfo.key,
            data.RequestInfo.msgId,
            token
            );
        let request = new RequestBodyBilling(requestInfo, demands());
        return JSON.stringify(request,null,2);
    }catch(e){
        console.log(e);
    }
}

let intiatePayment = async (token,response,gateWay,callBackUrl)=>{
    try{
         let user = new User(response.payerName,response.mobileNumber,response.tenantId);
         let taxAndPayment = new TaxandPayment(response.id,response.totalAmount);
         let transaction = new Transactions(response.tenantId,response.totalAmount,response.businessService,response.id,
            response.consumerCode,"Common Payment",gateWay,[taxAndPayment],user,callBackUrl);
        let reqInfo = new RequestInfoForPayment("Rainmaker",".01","_create","1","","20170310130900|en_IN","",token);
        let requestBody = new RequestBodyForMakePayment(reqInfo,transaction); 

        return JSON.stringify(requestBody,null,2);

    }catch(e){
        throw new error
    }
}

let fetchBillDetails = async (token)=>{
    try{
            let request = new RequestInfo("Rainmaker",".01","","_get","1","","20170310130900|en_IN",token);
            let requestBody = {"RequestInfo":request};
            return JSON.stringify(requestBody,null,2);
    }catch(e){
        throw new error;
    }
}

//fetchBillDetails("e4120bb7-a0f2-4682-98e9-a410f709b662").then(val=>console.log(val));

// intiatePayment("e4120bb7-a0f2-4682-98e9-a410f709b662","val","https://uttarakhand-dev.egovernments.org/citizen/egov-common/paymentRedirectPage")
//                 .then(val=>console.log(val))
//const data = require('./TestData/Uttarakhand.json').PropertyTax;
//const res = require('./generatedResponse/testRes.json');
//console.log(JSON.stringify(res,null,2));
//billing("e4120bb7-a0f2-4682-98e9-a410f709b662",data,data.Demands,res).then(value=>console.log(value));
//console.log(data.Properties[0].propertyDetails.length);
//payloadAsEmployee("e4120bb7-a0f2-4682-98e9-a410f709b662",data).then(value=>console.log(value));

module.exports={
    filePath,
    payloadWithCitizen,
    payloadAsApprover,
    payloadForAssessment,
    payloadAssessmentHistory,
    payloadBillDetails,
    payloadAsEmployee,
    billing,
    fetchBillDetails,
    intiatePayment

}












