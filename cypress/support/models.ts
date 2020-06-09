// in cypress/support/index.d.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

export interface ISignIn {
    username:String
    password:String
    grant_type:String
    scope:String
    tenantId:String
    userType:String
}
export interface AuditDetails {
    createdBy: string;
    lastModifiedBy: string;
    createdTime: number;
    lastModifiedTime: number;
}

export interface IAuthRequired {
    authToken: String
}

export interface RequestInfo extends IAuthRequired{
    apiId: string;
    ver: string;
    ts: string;
    action: string;
    did: string;
    key: string;
    msgId: string;
}

export interface ActionInfo {
    media: any[];
    action: string;
    assignee: string;
}

export interface AddressDetail {
    latitude: string;
    longitude: string;
    city: string;
    mohalla: string;
    houseNoAndStreetName: string;
    landmark: string;
}
export interface uAddressDetail {
    uuid: string;
    houseNoAndStreetName: string;
    mohalla: string;
    city: string;
    latitude: number;
    longitude: number;
    landmark: string;
    tenantId: string;
    auditDetails: AuditDetails;
}
export interface uService {
    tenantId: string;
    serviceCode: string;
    serviceRequestId: string;
    description: string;
    addressId: string;
    address: string;
    accountId: string;
    phone: string;
    addressDetail: uAddressDetail;
    active: boolean;
    status: string;
    source: string;
    auditDetails: AuditDetails;
}

export interface Service {
    serviceCode: string;
    description: string;
    addressDetail: AddressDetail;
    address: string;
    tenantId: string;
    source: string;
    phone: string;
}

export interface ICreateComplaint {
    RequestInfo: RequestInfo;
    actionInfo: ActionInfo[];
    services: Service[];
}
export interface IUpdateComplaint {
    RequestInfo: RequestInfo;
    actionInfo: ActionInfo[];
    services: uService[];
}

//PT
export interface Locality {
    code: string;
    name: string;
    label: string;
    latitude?: any;
    longitude?: any;
    children: any[];
    materializedPath?: any;
}
export interface GeoLocation {
    latitude: number;
    longitude: number;
}

export interface Address {
    city: string;
    locality: Locality;
    doorNo: string;
    buildingName: string;
    street: string;
}

export interface ConstructionDetail {
    carpetArea?: any;
    builtUpArea: number;
    plinthArea?: any;
    superBuiltUpArea?: any;
    constructionType?: any;
    constructionDate: number;
    dimensions?: any;
}

export interface Unit {
    occupancyType: string;
    floorNo: string;
    constructionDetail: ConstructionDetail;
    tenantId: string;
    usageCategory: string;
}
export interface Unit2 {
    id: string;
    tenantId?: any;
    floorNo: number;
    unitType?: any;
    usageCategory: string;
    occupancyType: string;
    active: boolean;
    occupancyDate: number;
    constructionDetail: ConstructionDetail;
    additionalDetails?: any;
    auditDetails?: any;
    arv?: any;
}
export interface Owner {
    name: string;
    mobileNumber: string;
    fatherOrHusbandName: string;
    emailId?: any;
    permanentAddress: string;
    relationship: string;
    ownerType: string;
    gender: string;
    isCorrespondenceAddress: boolean;
}

export interface AdditionalDetails {
    inflammable: boolean;
    heightAbove36Feet: boolean;
}

export interface Document {
    documentType: string;
    fileStoreId: string;
    documentUid: string;
}
export interface uDocument {
    id: string;
    documentType: string;
    fileStoreId: string;
    documentUid: string;
    auditDetails?: any;
    status: string;
}

export interface Property {
    tenantId: string;
    address: Address;
    usageCategoryMinor?: any;
    units: Unit[];
    usageCategoryMajor: string;
    landArea?: any;
    propertyType: string;
    noOfFloors: number;
    ownershipCategory: string;
    owners: Owner[];
    additionalDetails: AdditionalDetails;
    source: string;
    channel: string;
    documents: Document[];
    creationReason: string;
    superBuiltUpArea: number;
    usageCategory: string;
}

export interface IAddProperty {
    RequestInfo: RequestInfo;
    Property: Property;
}
///TL
export interface TradeUnit {
    tradeType: string;
    uom?: any;
    uomValue?: any;
}

export interface Accessory {
    uom: string;
    accessoryCategory: string;
    uomValue: string;
    count: string;
}

export interface Address2 {
    pinCode?: any;
    city?: any;
    address: string;
    type: string;
    id: number;
    tenantId: string;
    userId: number;
    addressType: string;
    lastModifiedDate?: any;
    lastModifiedBy?: any;
}

export interface Role {
    id?: any;
    name: string;
    code: string;
    tenantId: string;
}

export interface TLOwner {
    id: number;
    userName: string;
    salutation?: any;
    name: string;
    gender: string;
    mobileNumber: string;
    emailId?: any;
    altContactNumber?: any;
    pan?: any;
    aadhaarNumber?: any;
    permanentAddress: string;
    permanentCity?: any;
    permanentPinCode?: any;
    correspondenceAddress?: any;
    correspondenceCity?: any;
    correspondencePinCode?: any;
    addresses: Address2[];
    active: boolean;
    locale?: any;
    type: string;
    accountLocked: boolean;
    accountLockedDate: number;
    fatherOrHusbandName: string;
    signature?: any;
    bloodGroup?: any;
    photo?: any;
    identificationMark?: any;
    createdBy: number;
    lastModifiedBy: number;
    tenantId: string;
    roles: Role[];
    uuid: string;
    createdDate: number;
    lastModifiedDate: number;
    dob: number;
    pwdExpiryDate: number;
    relationship: string;
}

export interface TradeLicenseDetail {
    address: Address;
    structureType: string;
    tradeUnits: TradeUnit[];
    accessories: Accessory[];
    subOwnerShipCategory: string;
    owners: TLOwner[];
    applicationDocuments?: any;
}

export interface License {
    licenseType: string;
    tradeLicenseDetail: TradeLicenseDetail;
    financialYear: string;
    tradeName: string;
    commencementDate: number;
    tenantId: string;
    workflowCode: string;
    applicationType: string;
    action: string;
}

export interface ICreateTradeLicense {
    RequestInfo: RequestInfo;
    Licenses: License[];
}
export interface WfDocument {
        fileName: string;
        fileStoreId: string;
        fileUrl: string;
        documentType: string;
        tenantId: string;
    }

    export interface Address3 {
        id: string;
        tenantId: string;
        doorNo: string;
        latitude?: any;
        longitude?: any;
        addressId?: any;
        addressNumber?: any;
        type?: any;
        addressLine1?: any;
        addressLine2?: any;
        landmark?: any;
        city: string;
        pincode?: any;
        detail?: any;
        buildingName: string;
        street?: any;
        locality: Locality;
    }

    export interface TradeUnit2 {
        id: string;
        tenantId: string;
        active: boolean;
        tradeType: string;
        uom?: any;
        uomValue?: any;
        auditDetails?: any;
    }

    export interface Accessory2 {
        id: string;
        tenantId: string;
        active: boolean;
        accessoryCategory: string;
        uom: string;
        uomValue: string;
        count: number;
        auditDetails?: any;
    }

    export interface ApplicationDocument {
        fileName: string;
        fileStoreId: string;
        fileUrl: string;
        documentType: string;
        tenantId: string;
    }


    export interface TradeLicenseDetail2 {
        id: string;
        surveyNo?: any;
        subOwnerShipCategory: string;
        structureType: string;
        operationalArea?: any;
        noOfEmployees?: any;
        adhocExemption?: any;
        adhocPenalty?: any;
        adhocExemptionReason?: any;
        adhocPenaltyReason?: any;
        owners: TLOwner[];
        channel?: any;
        address: Address3;
        tradeUnits: TradeUnit2[];
        accessories: Accessory2[];
        applicationDocuments: ApplicationDocument[];
        verificationDocuments?: any;
        additionalDetail?: any;
        institution?: any;
        auditDetails: AuditDetails;
    }

    export interface TaxHeadEstimate {
        taxHeadCode: string;
        estimateAmount: number;
        category: string;
    }

    export interface TradeTypeBillingIds {
        id: string;
        fee: number;
        billingSlabIds: string[];
    }

    export interface AccessoryBillingIds {
        id: string;
        fee: number;
        billingSlabIds: string[];
    }

    export interface Calculation {
        applicationNumber?: any;
        tradeLicense?: any;
        tenantId: string;
        taxHeadEstimates: TaxHeadEstimate[];
        tradeTypeBillingIds: TradeTypeBillingIds;
        accessoryBillingIds: AccessoryBillingIds;
    }

    export interface License2 {
        comment?: any;
        id: string;
        tenantId: string;
        businessService: string;
        licenseType: string;
        applicationType: string;
        workflowCode: string;
        licenseNumber?: any;
        applicationNumber: string;
        oldLicenseNumber?: any;
        propertyId?: any;
        oldPropertyId?: any;
        accountId: string;
        tradeName: string;
        applicationDate: number;
        commencementDate: number;
        issuedDate?: any;
        financialYear: string;
        validFrom: number;
        validTo: number;
        action: string;
        assignee?: any;
        wfDocuments: WfDocument[];
        status: string;
        tradeLicenseDetail: TradeLicenseDetail2;
        calculation: Calculation;
        auditDetails: AuditDetails;
        fileStoreId?: any;
    }

    export interface IUpdateTradeLicense {
        RequestInfo: RequestInfo;
        Licenses: License2[];
    }

//Payment
export interface PaymentDetail {
    businessService: string;
    billId: string;
    totalDue: number;
    totalAmountPaid: number;
}

export interface Payment {
    paymentDetails: PaymentDetail[];
    tenantId: string;
    totalDue: number;
    paymentMode: string;
    paidBy: string;
    mobileNumber: string;
    payerName: string;
    totalAmountPaid: number;
}

export interface ICreatePayment {
    RequestInfo: RequestInfo;
    Payment: Payment;
}

export interface PTOwner {
    id?: any;
    uuid: string;
    userName: string;
    password?: any;
    salutation?: any;
    name: string;
    gender: string;
    mobileNumber: string;
    emailId?: any;
    altContactNumber?: any;
    pan?: any;
    aadhaarNumber?: any;
    permanentAddress: string;
    permanentCity?: any;
    permanentPinCode?: any;
    correspondenceCity?: any;
    correspondencePinCode?: any;
    correspondenceAddress?: any;
    active: boolean;
    dob?: any;
    pwdExpiryDate: number;
    locale?: any;
    type: string;
    signature?: any;
    accountLocked: boolean;
    roles: Role[];
    fatherOrHusbandName: string;
    bloodGroup?: any;
    identificationMark?: any;
    photo?: any;
    createdBy: string;
    createdDate: number;
    lastModifiedBy: string;
    lastModifiedDate: number;
    tenantId: string;
    ownerInfoUuid: string;
    isPrimaryOwner?: any;
    ownerShipPercentage?: any;
    ownerType: string;
    institutionId?: any;
    status: string;
    documents?: any;
    relationship: string;
}



export interface Workflow {
    id?: any;
    tenantId: string;
    businessService: string;
    businessId: string;
    action: string;
    moduleName: string;
    state?: any;
    comment?: any;
    documents?: any;
    assignes?: any;
}

export interface Property2 {
    id: string;
    propertyId: string;
    surveyId?: any;
    linkedProperties?: any;
    tenantId: string;
    accountId: string;
    oldPropertyId?: any;
    status: string;
    address: Address3;
    acknowldgementNumber: string;
    propertyType: string;
    ownershipCategory: string;
    owners: PTOwner[];
    institution?: any;
    creationReason: string;
    usageCategory: string;
    noOfFloors: number;
    landArea?: any;
    superBuiltUpArea: number;
    source: string;
    channel: string;
    documents: uDocument[];
    units: Unit2[];
    additionalDetails: AdditionalDetails;
    auditDetails: AuditDetails;
    workflow: Workflow;
}
export interface IUpdateProperty {
    RequestInfo: RequestInfo;
    Property: Property2;
}
