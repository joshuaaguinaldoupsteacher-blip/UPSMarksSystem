/* Phase 3.37: CSV export guard. Never evaluate spreadsheet formulas from imported labels. */
(function(root){'use strict';
function safeCSVCell(value){
 let s=String(value==null?'':value);
 // Prevent CSV cells becoming formulas when opened in Excel or other spreadsheets.
 // Include whitespace-prefixed formula triggers and control characters.
 if (/^[\s\uFEFF]*[=+\-@]/.test(s)||/^[\t\r\n]/.test(s))s="'"+s;
 return '"'+s.replace(/"/g,'""')+'"';
}
function validCaseId(value){
 const s=String(value==null?'':value).trim();
 return s.length>=1&&s.length<=120&&!/[\x00-\x1F\x7F]/.test(s);
}
root.UPS_EVIDENCE_SAFETY={safeCSVCell,validCaseId};
})(typeof window==='undefined'?globalThis:window);
