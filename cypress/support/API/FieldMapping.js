
class RequestInfo{
    constructor(apiId,ver,ts,action,did,key,msgId,authToken){
        this.apiId=apiId; 
        this.ver=ver; 
        this.ts=ts; 
        this.action=action; 
        this.did=did; 
        this.key=key 
        this.msgId=msgId 
        this.authToken=authToken
    }
}

class Locality{
    constructor(code,area){
        this.code=code;
        this.area=area;
    }
}

class Address{
    constructor(city,doorNo, locality){
            this.city=city;
            this.doorNo=doorNo;
            this.locality=locality;
    }
}

class ConstructionDetail{
    constructor(builtUpArea){
        this.builtUpArea=builtUpArea;
    }
}


class Units{
    constructor(occupancyType,floorNo,arv,ConstructionDetail,tenantId,usageCategory,unitType){
                this.occupancyType=occupancyType;
                this.floorNo=floorNo;
                this.arv=arv;
                this.constructionDetail=ConstructionDetail;
                this.tenantId=tenantId;
                this.usageCategory=usageCategory;
                this.unitType=unitType;
    }
}

class Owner{
    constructor(name,mobileNumber,fatherOrHusbandName,emailId,permanentAddress,relationship,ownerType,gender,isCorrespondenceAddress){
                this.name=name;
                this.mobileNumber=mobileNumber;
                this.fatherOrHusbandName=fatherOrHusbandName;
                this.emailId=emailId;
                this.permanentAddress=permanentAddress;
                this.relationship=relationship;
                this.ownerType=ownerType;
                this.gender=gender;
                this.isCorrespondenceAddress=isCorrespondenceAddress;
    }
}

class Document{
    constructor(documentType,fileStoreId,documentUid){
            this.documentType=documentType;
            this.fileStoreId=fileStoreId;
            this.documentUid=documentUid;
    }
}


class Property{
    constructor(tenantId,address,usageCategoryMinor,unit,usageCategoryMajor,landArea,noOfFloors,propertyType,
                ownershipCategory,Owner,source,channel,Document,
                creationReason,superBuiltUpArea,usageCategory){
            this.tenantId=tenantId;
            this.address=address;
            this.usageCategoryMinor=usageCategoryMinor;
            this.units=unit;
            this.usageCategoryMajor=usageCategoryMajor;
            this.landArea=landArea;
            this.noOfFloors=noOfFloors;
            this.propertyType=propertyType;
            this.ownershipCategory=ownershipCategory;
            this.owners = Owner;
            this.source=source;
            this.channel=channel;
            this.documents = Document;
            this.creationReason=creationReason;
            this.superBuiltUpArea=superBuiltUpArea;
            this.usageCategory=usageCategory;
    }
}


class RequestBody{
    constructor(RequestInfo,Property){
        this.RequestInfo=RequestInfo;
        this.Property=Property;
    }
}

// Field mapping for Doc Verifier


class UpdateLocality{
    constructor(code, name, label, latitude, longitude, area, children, materializedPath){
        this.code=code;
        this.name=name;
        this.label=label;
        this.latitude=latitude;
        this.longitude=longitude;
        this.area=area;
        this.children=children;
        this.materializedPath=materializedPath;
    }
} 

class GeoLocation{
    constructor(latitude,longitude){
        this.latitude=latitude;
        this.longitude=longitude;
    }
}

class UpdateAddress{
    constructor(tenantId, doorNo, plotNo, id, landmark, 
        city, district, region, state, country, pincode, buildingName, street,UpdateLocality,GeoLocation,additionalDetails){
            this.tenantId=tenantId;
            this.doorNo=doorNo;
            this.plotNo=plotNo;
            this.id=id;
            this.landmark=landmark;
            this.city=city;
            this.district=district;
            this.region=region;
            this.state=state;
            this.country=country;
            this.pincode=pincode;
            this.buildingName=buildingName;
            this.street=street;
            this.locality=UpdateLocality;
            this.geoLocation=GeoLocation;
            this.additionalDetails=additionalDetails;
    }
}

class Roles{
    constructor(id,name,code,tenantId){
        this.id=id;
        this.name=name;
        this.code=code;
        this.tenantId=tenantId;
    }
}

class UpdateOwner{
    constructor(id, uuid, userName, password, salutation, name, gender, 
    mobileNumber, emailId, altContactNumber, pan, aadhaarNumber, permanentAddress, 
    permanentCity, permanentPinCode, correspondenceCity, correspondencePinCode, correspondenceAddress, 
    active, dob, pwdExpiryDate, locale, type, signature, accountLocked,Roles,
    fatherOrHusbandName, bloodGroup, identificationMark, photo, createdBy, createdDate, lastModifiedBy, 
    lastModifiedDate, tenantId, ownerInfoUuid, isPrimaryOwner, ownerShipPercentage, ownerType, 
    institutionId, status, documents, relationship){
        this.id=id;
        this.uuid=uuid;
        this.userName=userName;
        this.password=password;
        this.salutation=salutation;
        this.name=name;
        this.gender=gender;
        this.mobileNumber=mobileNumber;
        this.emailId=emailId;
        this.altContactNumber=altContactNumber;
        this.pan=pan;
        this.aadhaarNumber=aadhaarNumber;
        this.permanentAddress=permanentAddress;
        this.permanentCity=permanentCity;
        this.permanentPinCode=permanentPinCode;
        this.correspondenceCity=correspondenceCity;
        this.correspondencePinCode=correspondencePinCode;
        this.correspondenceAddress=correspondenceAddress;
        this.active=active;
        this.dob=dob;
        this.pwdExpiryDate=pwdExpiryDate;
        this.locale=locale;
        this.type=type;
        this.signature=signature;
        this.accountLocked=accountLocked;
        this.roles=Roles;
        this.fatherOrHusbandName=fatherOrHusbandName;
        this.bloodGroup=bloodGroup;
        this.identificationMark=identificationMark;
        this.photo=photo;
        this.createdBy=createdBy;
        this.createdDate=createdDate;
        this.lastModifiedBy=lastModifiedBy;
        this.lastModifiedDate=lastModifiedDate;
        this.tenantId=tenantId;
        this.ownerInfoUuid=ownerInfoUuid;
        this.isPrimaryOwner=isPrimaryOwner;
        this.ownerShipPercentage=ownerShipPercentage;
        this.ownerType=ownerType;
        this.institutionId=institutionId;
        this.status=status;
        this.documents=documents;
        this.relationship=relationship;
    }
}
class UpdateDocument{
    constructor(id,documentType,fileStoreId,documentUid,auditDetails,status){
        this.id=id;
        this.documentType=documentType;
        this.fileStoreId=fileStoreId;
        this.documentUid=documentUid;
        this.auditDetails=auditDetails;
        this.status=status;
    }
}

class UpdateConstructionDetails{
    constructor(carpetArea,builtUpArea,plinthArea,superBuiltUpArea,constructionType,constructionDate,dimensions){
        this.carpetArea=carpetArea;
        this.builtUpArea=builtUpArea;
        this.plinthArea=plinthArea;
        this.superBuiltUpArea=superBuiltUpArea;
        this.constructionType=constructionType;
        this.constructionDate=constructionDate;
        this.dimensions=dimensions;
    }
}

class UpdateUnit{
    constructor(id,tenantId,floorNo,unitType,usageCategory,occupancyType,active,occupancyDate,UpdateConstructionDetails,
        additionalDetails,auditDetails,arv){
            this.id=id;
            this.tenantId=tenantId;
            this.floorNo=floorNo;
            this.unitType=unitType;
            this.usageCategory=usageCategory;
            this.occupancyType=occupancyType;
            this.active=active;
            this.occupancyDate=occupancyDate;
            this.constructionDetail=UpdateConstructionDetails;
            this.additionalDetails=additionalDetails;
            this.auditDetails=auditDetails;
            this.arv=arv;

        }
}
class AuditDetails{
    constructor(createdBy,lastModifiedBy,createdTime,lastModifiedTime){
            this.createdBy=createdBy;
            this.lastModifiedBy=lastModifiedBy;
            this.createdTime=createdTime;
            this.lastModifiedTime=lastModifiedTime;
    }
}
class Assignes{
    constructor(uuid){
        this.uuid=uuid;
    }
}

class Workflow{
    constructor(id,tenantId,businessService,businessId,action,moduleName,state,comment,documents,Assignes){
            this.id=id;
            this.tenantId=tenantId;
            this.businessService=businessService;
            this.businessId=businessId;
            this.action=action;
            this.moduleName=moduleName;
            this.state=state;
            this.comment=comment;
            this.documents=documents;
            this.assignes=Assignes;
    }
}
class UpdateProperty{
    constructor(id,propertyId,surveyId,linkedProperties,tenantId,accountId,oldPropertyId,status,UpdateAddress,
        acknowldgementNumber,propertyType,ownershipCategory,UpdateOwner,institution,creationReason,usageCategory
        ,noOfFloors,landArea,superBuiltUpArea,source,channel,UpdateDocument,UpdateUnit,additionalDetails,
        AuditDetails,Workflow){
        this.id=id;
        this.propertyId=propertyId;
        this.surveyId=surveyId;
        this.linkedProperties=linkedProperties;
        this.tenantId=tenantId;
        this.accountId=accountId;
        this.oldPropertyId=oldPropertyId;
        this.status=status;
        this.address=UpdateAddress;
        this.acknowldgementNumber=acknowldgementNumber;
        this.propertyType=propertyType;
        this.ownershipCategory=ownershipCategory;
        this.owners=UpdateOwner;
        this.institution=institution;
        this.creationReason=creationReason;
        this.usageCategory=usageCategory;
        this.noOfFloors=noOfFloors;
        this.landArea=landArea;
        this.superBuiltUpArea=superBuiltUpArea;
        this.source=source;
        this.channel=channel;
        this.documents=UpdateDocument;
        this.units=UpdateUnit;
        this.additionalDetails=additionalDetails;
        this.auditDetails=AuditDetails;
        this.workflow=Workflow;

    }
}

class UpdateRequestInfo{
    constructor(apiId,ver,action,did,key,msgId,requesterId,authToken,UpdateProperty){
        this.apiId=apiId;
        this.ver=ver;
        this.action=action;
        this.did=did;
        this.key=key;
        this.msgId=msgId;
        this.requesterId=requesterId;
        this.authToken=authToken;
        this.Property=UpdateProperty;
    }
}

class UpdateRequestBody{
    constructor(UpdateRequestInfo,UpdateProperty){
        this.RequestInfo=UpdateRequestInfo;
        this.Property=UpdateProperty;
    }
}

// Field mapping for Assessment
class AdditionalDetails{
    constructor(){

    }
}
class Assessment{
    constructor(tenantId,propertyId,financialYear,assessmentDate,source,channel,AdditionalDetails){
            this.tenantId=tenantId;
            this.propertyId=propertyId;
            this.financialYear=financialYear;
            this.assessmentDate=assessmentDate;
            this.source=source;
            this.channel=channel;
            this.additionalDetails=AdditionalDetails
    }
}

class RequestBodyAssessment{
    constructor(RequestInfo,Assessment){
        this.RequestInfo=RequestInfo;
        this.Assessment=Assessment;
    }
}

class AssessmentHistory{
    constructor(RequestInfo){
        this.RequestInfo=RequestInfo;
    }
}

// Field mapping for billing details

class RequestInfoBillDetails{
    constructor(apiId,ver,action,did,key,msgId,requesterId,authToken){
        this.apiId=apiId;
        this.ver=ver;
        this.action=action;
        this.did=did;
        this.key=key;
        this.msgId=msgId;
        this.requesterId=requesterId;
        this.authToken=authToken
    }
}

class BillDetails{
    constructor(RequestInfoBillDetails){
        this.RequestInfo=RequestInfoBillDetails;
    }
}

// Field mapping Uttarakhand region

class CitizenInfo{
    constructor(mobileNumber,name){
        this.mobileNumber=mobileNumber;
        this.name=name;
    }
}
class Documents2{
    constructor(documentUid,documentType){
        this.documentUid=documentUid;
        this.documentType=documentType;
    }
}
class Owners2{
    constructor(Documents2,name,mobileNumber,fatherOrHusbandName,emailId,permanentAddress,relationship,ownerType,gender){
        this.documents=Documents2;
        this.name=name;
        this.mobileNumber=mobileNumber;
        this.fatherOrHusbandName=fatherOrHusbandName;
        this.emailId=emailId;
        this.permanentAddress=permanentAddress;
        this.relationship=relationship;
        this.ownerType=ownerType;
        this.gender=gender;
    }
}
class Units2{
    constructor(constructionYear,usageCategoryMinor,usageCategoryMajor,usageCategoryDetail,usageCategorySubMinor,occupancyType,
        ConstructionType,unitArea,floorNo,arv){
            this.constructionYear=constructionYear;
            this.usageCategoryMinor=usageCategoryMinor;
            this.usageCategoryMajor=usageCategoryMajor;
            this.usageCategoryDetail=usageCategoryDetail;
            this.usageCategorySubMinor=usageCategorySubMinor;
            this.occupancyType=occupancyType;
            this.ConstructionType=ConstructionType;
            this.unitArea=unitArea;
            this.floorNo=floorNo;
            this.arv=arv;
        }
}

class AdditionalDetails2{
    constructor(constructionYear){
        this.constructionYear=constructionYear
    }
}

class PropertyDetails{
    constructor(usageCategoryMinor,Units2,usageCategoryMajor,propertySubType,landArea,buildUpArea,noOfFloors,propertyType,
        AdditionalDetails2,ownershipCategory,subOwnershipCategory,Owners2,CitizenInfo,financialYear,source,assessmentDate){

            this.usageCategoryMinor=usageCategoryMinor;
            this.units=Units2;
            this.usageCategoryMajor=usageCategoryMajor;
            this.propertySubType=propertySubType;
            this.landArea=landArea;
            this.buildUpArea=buildUpArea;
            this.noOfFloors=noOfFloors;
            this.propertyType=propertyType;
            this.additionalDetails=AdditionalDetails2;
            this.ownershipCategory=ownershipCategory;
            this.subOwnershipCategory=subOwnershipCategory;
            this.owners=Owners2;
            this.citizenInfo=CitizenInfo;
            this.financialYear=financialYear;
            this.source=source;
            this.assessmentDate=assessmentDate;
            
        }
}

class Properties2{
    constructor(tenantId,Address,PropertyDetails){
        this.tenantId=tenantId;
        this.address=Address;
        this.propertyDetails=PropertyDetails;
    }
}

class RequestBody2{
    constructor(RequestInfo,Properties2){
        this.RequestInfo=RequestInfo;
        this.Properties=Properties2;
    }
}

// Field mapping for Billing 

class DemandDetails{
    constructor(taxHeadMasterCode,taxAmount,collectionAmount){
        this.taxHeadMasterCode=taxHeadMasterCode;
        this.taxAmount=taxAmount;
        this.collectionAmount=collectionAmount;
    }
}

class Payer{
    constructor(uuid){
        this.uuid=uuid;
    }
}
class Demands{
    constructor(tenantId,consumerCode,consumerType,businessService,taxPeriodFrom,taxPeriodTo,Payer,DemandDetails){
        this.tenantId=tenantId;
        this.consumerCode=consumerCode;
        this.consumerType=consumerType;
        this.businessService=businessService;
        this.taxPeriodFrom=taxPeriodFrom;
        this.taxPeriodTo=taxPeriodTo;
        this.payer=Payer;
        this.demandDetails=DemandDetails;
    }
}

class RequestBodyBilling{
    constructor(RequestInfo,Demands){
        this.RequestInfo=RequestInfo;
        this.Demands=Demands;
    }
}

//Filed mapping for Make Payment

class User{
    constructor(name, mobileNumber, tenantId){
        this.name=name;
        this.mobileNumber=mobileNumber;
        this.tenantId=tenantId;
    }
}

class TaxandPayment{
    constructor(billId, ammountPaid){
        this.billId=billId;
        this.amountPaid=ammountPaid;
    }
}

class Transactions{
    constructor(tenantId, txnAmount, module, billId, consumerCode, productInfo, gateWay,TaxandPayment,User, callbackurl){
        this.tenantId=tenantId;
        this.txnAmount=txnAmount;
        this.module=module;
        this.billId=billId;
        this.consumerCode=consumerCode;
        this.productInfo=productInfo;
        this.gateway=gateWay;
        this.taxAndPayments=TaxandPayment;
        this.user=User;
        this.callbackUrl=callbackurl;
    }
}
class RequestInfoForPayment{
    constructor(apiId,ver,action,did,key,msgId,requesterId,authToken){
        this.apiId=apiId; 
        this.ver=ver; 
        this.action=action; 
        this.did=did; 
        this.key=key; 
        this.msgId=msgId;
        this.requesterId=requesterId; 
        this.authToken=authToken;
    }
}
class RequestBodyForMakePayment{
    constructor(RequestInfoForPayment,Transactions){
        this.RequestInfo=RequestInfoForPayment;
        this.Transaction=Transactions;
    }
}




// let user = new User("Krishnendu","8653456267","uk.dehradun");
// let taxAndPayment = new TaxandPayment("1150d618-5d58-44c8-9fe3-89b3de120e73",220);
// let transaction = new Transactions("uk.dehradun",220,"PT","1150d618-5d58-44c8-9fe3-89b3de120e73",
// "PT-248430-128606","Common Payment","CCAVENUE",[taxAndPayment],user,"https://uttarakhand-dev.egovernments.org/citizen/egov-common/paymentRedirectPage");

// let reqInfo = new RequestInfoForPayment("Rainmaker",".01","_create","1","","20170310130900|en_IN","","5df777c4-f551-4538-a813-9423c8f97a26");
// let requestBody = new RequestBodyForMakePayment(reqInfo,transaction);

// console.log(JSON.stringify(requestBody,null,2));

module.exports = {
    Locality,Address,ConstructionDetail,Units,Owner,Document,Property,RequestInfo,RequestBody,
    UpdateLocality,GeoLocation,UpdateAddress,Roles,UpdateOwner,UpdateDocument,UpdateConstructionDetails,
    UpdateUnit,AuditDetails,Assignes,Workflow,UpdateProperty,UpdateRequestInfo,UpdateRequestBody,
    AdditionalDetails,Assessment,RequestBodyAssessment,AssessmentHistory,RequestInfoBillDetails,BillDetails,
    CitizenInfo,Documents2,Owners2,Units2,AdditionalDetails2,PropertyDetails,Properties2,RequestBody2,
    DemandDetails,Payer,Demands,RequestBodyBilling,User,TaxandPayment,Transactions,RequestInfoForPayment
    ,RequestBodyForMakePayment
}








