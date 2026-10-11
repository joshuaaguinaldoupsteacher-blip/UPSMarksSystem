/* Phase 3.40: independent numeric-vs-Excel and historical-engine evaluations. */
(function(root){'use strict';
function evaluate(currentInitial,currentTerm,savedInitial,savedTerm,excelInitial,excelTerm){
 const valid=[currentInitial,currentTerm,savedInitial,savedTerm,excelInitial,excelTerm].every(v=>typeof v==='number'&&Number.isFinite(v));
 if(!valid)throw Error('Missing or invalid numerical grade evidence');
 const engineStatus=Math.abs(currentInitial-savedInitial)<0.000001&&currentTerm===savedTerm?'STABLE':'CHANGED';
 const excelStatus=Math.abs(currentInitial-excelInitial)<0.000001&&currentTerm===excelTerm?'EXACT_PARITY':Math.abs(Math.round((currentInitial+Number.EPSILON)*100)/100-excelInitial)<0.000001&&currentTerm===excelTerm?'DISPLAY_ONLY':'EXCEL_DIFFERENCE';
 return {engineStatus,excelStatus};
}
root.UPS_DUAL_AXIS={evaluate};
})(typeof window==='undefined'?globalThis:window);
