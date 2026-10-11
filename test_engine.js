'use strict';
// Fictional-data browser-memory assessment prototype. Never connect to live records.
const GRADE_SCHEMES={
 general:{label:'General Subjects',categories:[['WW','Written Works',20,5],['PT','Performance Tasks',60,3],['EX','Examinations',20,3]]},
 hele:{label:'HELE / TLE',categories:[['WW','Written Works',30,5],['PT','Performance Tasks',50,3],['EX','Examinations',20,3]]},
 arabic:{label:'Arabic Education',categories:[['LS','Listening & Speaking',10,1],['WR','Writing',40,1],['RD','Reading',10,1],['EX','Examinations',40,3]]},
 islamic:{label:'Islamic Education',categories:[['QR','Qur’an Recitation',10,1],['MEM','Memorization',15,1],['VAL','Values',5,1],['WQA','Worksheets / Quizzes / Activities',30,3],['EX','Examinations',40,3]]},
 mape:{label:'MAPE Component',categories:[['WW','Written Works',20,5],['PT','Performance Tasks',60,3],['EX','Examinations',20,3]]}
};
function schemeFor(sub){return sub==='ARABIC'?'arabic':sub==='ISLAMIC'?'islamic':sub==='HELE_TLE'?'hele':sub==='MAPE'?'mape':'general'}
const GRADES={};let grTerm=1,grComponent='Music';
function specsFor(scheme){return scheme.categories.flatMap(([cat,name,weight,maxItems])=>Array.from({length:maxItems},(_,i)=>({key:cat==='EX'?['ST1','ST2','TERM'][i]:`${cat}${i+1}`,category:cat,name:cat==='EX'?['Summative 1','Summative 2','End-of-Term'][i]:`${cat} ${i+1}`,weight,slot:i,required:cat==='EX'})))}
function currentGrade(){const [cid,sub]=chosen,id=`${cid}|${sub}|${grTerm}|${sub==='MAPE'?grComponent:'main'}`;return GRADES[id]||(GRADES[id]={status:'draft',values:{},assessments:{},submittedBy:null,approvedBy:null})}
function assessment(rec,s){if(!rec.assessments[s.key])rec.assessments[s.key]={enabled:s.required||s.slot===0,max:s.category==='EX'?40:20};return rec.assessments[s.key]}
function activeSpecs(rec,scheme){return specsFor(scheme).filter(s=>assessment(rec,s).enabled)}
function calculate(rec,scheme,id,values=rec.values,definitions=rec.assessments){
 let total=0,complete=true,hasActive=true;
 const cats={};
 for(const [cat,label,weight] of scheme.categories){
  const specs=specsFor(scheme).filter(s=>s.category===cat&&(definitions[s.key]||assessment(rec,s)).enabled);
  if(!specs.length){complete=false;hasActive=false;cats[cat]=null;continue}
  let percent=null;
  if(cat==='EX'){
   if(specs.length!==3){complete=false;cats[cat]=null;continue}
   let value=0,valid=true;
   for(const spec of specs){
    const max=Number((definitions[spec.key]||assessment(rec,spec)).max),raw=values[id+'|'+spec.key];
    const mark=Number(raw);
    if(!Number.isFinite(max)||max<=0||raw===undefined||raw===''||!Number.isFinite(mark)||mark<0||mark>max){complete=false;valid=false;break}
    value+=mark/max*100*[.3,.3,.4][spec.slot];
   }
   if(valid)percent=value;
  }else{
   let earned=0,possible=0,valid=true;
   for(const spec of specs){
    const max=Number((definitions[spec.key]||assessment(rec,spec)).max),raw=values[id+'|'+spec.key];
    const mark=Number(raw);
    if(!Number.isFinite(max)||max<=0||raw===undefined||raw===''||!Number.isFinite(mark)||mark<0||mark>max){complete=false;valid=false;break}
    earned+=mark;possible+=max;
   }
   if(valid&&possible>0){
    percent=earned/possible*100;
    if(scheme===GRADE_SCHEMES.arabic||scheme===GRADE_SCHEMES.islamic)percent=Math.floor(percent+0.5);
   }
  }
  cats[cat]=percent;
  if(percent!==null)total+=percent*weight/100;
 }
 return {value:complete&&hasActive?total:null,categories:cats,complete:complete&&hasActive};
}
function helperReferencePreview(rec,scheme,id){
 const result=calculate(rec,scheme,id);
 if(result.value===null)return null;
 return window.UPS_REFERENCE_GRADE?.(schemeFor(chosen[1]),result.value)??null;
}
function helperGradeText(rec,scheme,id){
 const v=helperReferencePreview(rec,scheme,id);
 return v==null?'—':String(v)+'*';
}
function fmt(v){return v==null?'—':Number(v).toFixed(2)+'%'}
function mapeNine(cid,id){const arr=[];for(let term=1;term<=3;term++)for(const comp of ['Music','Arts','PE']){const rec=GRADES[`${cid}|MAPE|${term}|${comp}`];arr.push({term,comp,value:rec?calculate(rec,GRADE_SCHEMES.mape,id).value:null})}return arr}

