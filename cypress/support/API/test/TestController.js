const PropertTaxFlowOfUttarakhandDev = require('./PropertyTaxUttarakhandDev');
const PropertTaxFlowOfAmritsarQA = require('./PropertyTaxAmritsarQA')
const { error } = require('console');
const REGION = process.env.REGION;
const ENVIRONMENT = process.env.ENV;


 
(async function controller(){
    try{
            if(REGION.includes("Uttarakhand") && ENVIRONMENT.includes("DEV")) await PropertTaxFlowOfUttarakhandDev();
            if(REGION.includes("Amritsar") && ENVIRONMENT.includes("QA") )  await PropertTaxFlowOfAmritsarQA();  
            if(REGION.includes("NA") && ENVIRONMENT.includes("NA") )  await PropertTaxFlowOfAmritsarQA(); await PropertTaxFlowOfUttarakhandDev();       
    }catch(e){
        throw new error;
    }
})();
    
