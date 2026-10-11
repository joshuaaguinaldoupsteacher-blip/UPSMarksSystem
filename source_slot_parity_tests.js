'use strict';
const specs={Arabic:{LS:5,WR:5,RD:5,EX:3},Islamic:{QR:2,MEM:2,VAL:2,WQA:3,EX:3}};
const outcomes=[];function check(name,pass){outcomes.push([name,!!pass]);}
for(const [label,expected] of Object.entries(specs)){
 const scheme=GRADE_SCHEMES[label.toLowerCase()];
 for(const [cat,n] of Object.entries(expected))check(`${label}: ${cat} supports ${n} source activity slots`,specsFor(scheme).filter(x=>x.category===cat).length===n);
 const rec={values:{},assessments:{}};
 for(const s of specsFor(scheme)){rec.assessments[s.key]={enabled:true,max:10};rec.values['STUDENT|'+s.key]='5';}
 check(`${label}: all selected slots at half score`,Math.abs(calculate(rec,scheme,'STUDENT').value-50)<1e-9);
 for(const cat of Object.keys(expected).filter(c=>c!=='EX')){
   let slots=specsFor(scheme).filter(s=>s.category===cat);
   // An inactive source slot is excluded from perfect-score denominator.
   rec.assessments[slots[slots.length-1].key].enabled=false;
   check(`${label}: disabled ${cat} slot excluded`,Math.abs(calculate(rec,scheme,'STUDENT').value-50)<1e-9);
   rec.assessments[slots[slots.length-1].key].enabled=true;
 }
}
const el=document.getElementById('results');let success=outcomes.filter(v=>v[1]).length;
el.innerHTML=`<h2>${success} / ${outcomes.length} checks passed</h2><table><thead><tr><th>Test</th><th>Result</th></tr></thead><tbody>${outcomes.map(([name,ok])=>`<tr><td>${name}</td><td style="color:${ok?'#207a48':'#b13b3b'}">${ok?'PASS':'FAIL'}</td></tr>`).join('')}</tbody></table>`;
