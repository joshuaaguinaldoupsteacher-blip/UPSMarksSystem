"use strict";
// Proposed school rule: arithmetic mean of all 9 individually transmuted MAPE
// component-term grades. Excel ROUND(x,0) for nonnegative marks rounds .5 upward.
// This rule is NOT certified against a corrected official template.
window.UPS_MAPE_FINAL_PREVIEW=function(grades){
 if(!Array.isArray(grades)||grades.length!==9||grades.some(g=>!Number.isInteger(g)||g<0||g>100))return null;
 const sum=grades.reduce((a,b)=>a+b,0),average=sum/9;
 return {sum,average,rounded:Math.floor(average+0.5),certified:false};
};
