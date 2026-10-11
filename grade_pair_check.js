/* Phase 3.41: Validate whether a supplied grade pair follows the HELPER lookup.
   Only numeric consistency; neither Excel provenance nor official grading policy is certified. */
(function(root){'use strict';
function check(template,initial,term){
 if(!['general','hele','arabic','islamic','mape'].includes(template))return {status:'INVALID_TEMPLATE',expected:null};
 if(typeof initial!=='number'||!Number.isFinite(initial)||initial<0||initial>100||!Number.isInteger(term)||term<60||term>100)return {status:'INVALID_VALUES',expected:null};
 const expected=root.UPS_REFERENCE_GRADE(template,initial);
 if(expected===null)return {status:'LOOKUP_UNAVAILABLE',expected:null};
 return {status:expected===term?'CONSISTENT':'LOOKUP_DIFFERENCE',expected};
}
root.UPS_PAIR_CHECK={check};
})(typeof window==='undefined'?globalThis:window);
