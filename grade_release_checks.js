"use strict";
// Run: node grade_release_checks.js. Deterministic, fictional data only.
const fs=require('fs'),vm=require('vm'),crypto=require('crypto'),path=require('path');
const source=fs.readFileSync(path.join(__dirname,'grading.js'),'utf8');
const code=source.split('function renderMapeOverview')[0];
const ctx={window:{},console};vm.createContext(ctx);vm.runInContext(code,ctx);
const cases=[];
function run(name,expression){let passed=false,error='';try{passed=!!vm.runInContext(expression,ctx)}catch(e){error=String(e.message)}cases.push({name,passed,error})}
vm.runInContext(`function fixture(scheme,score=10,max=20){const r={values:{},assessments:{}};for(const x of specsFor(scheme)){let enabled=x.required||x.slot===0;r.assessments[x.key]={enabled,max};if(enabled)r.values['Z|'+x.key]=String(score)}return r}`,ctx);
for(const scheme of ['general','hele','arabic','islamic','mape']){
 const sc=`GRADE_SCHEMES.${scheme}`;
 run(`${scheme}: fully zero records retain a true zero`,`(()=>{const c=calculate(fixture(${sc},0),${sc},'Z');return c.complete&&c.value===0})()`);
 run(`${scheme}: all full marks yield 100`,`(()=>{const c=calculate(fixture(${sc},20),${sc},'Z');return c.complete&&c.value===100})()`);
 run(`${scheme}: one required blank is incomplete`,`(()=>{const r=fixture(${sc});const first=specsFor(${sc}).find(s=>s.required||s.slot===0);delete r.values['Z|'+first.key];return calculate(r,${sc},'Z').value===null})()`);
 run(`${scheme}: over-maximum scores are invalid`,`(()=>{const r=fixture(${sc});const first=specsFor(${sc}).find(s=>s.required||s.slot===0);r.values['Z|'+first.key]='21';return calculate(r,${sc},'Z').value===null})()`);
 run(`${scheme}: whitespace is not zero`,`(()=>{const r=fixture(${sc});const first=specsFor(${sc}).find(s=>s.required||s.slot===0);r.values['Z|'+first.key]='  ';return calculate(r,${sc},'Z').value===null})()`);
}
run('Arabic exposes five slots each for LS/W/R',`(()=>['LS','W','R'].every(k=>specsFor(GRADE_SCHEMES.arabic).filter(s=>s.key.startsWith(k)&&/\\d$/.test(s.key)).length===5))()`);
run('Islamic exposes two slots for QR/MEM/VAL, three for WQA',`(()=>[['QR',2],['MEM',2],['VAL',2],['WQA',3]].every(([k,n])=>specsFor(GRADE_SCHEMES.islamic).filter(s=>s.key.startsWith(k)).length===n))()`);
run('Islamic extra activity score contributes its individual maximum',`(()=>{const r=fixture(GRADE_SCHEMES.islamic,10);r.assessments.WQA2={enabled:true,max:40};r.values['Z|WQA2']='30';return calculate(r,GRADE_SCHEMES.islamic,'Z').categories.WQA===67})()`);
run('Arabic candidate half-up rounding currently in engine',`(()=>{const r=fixture(GRADE_SCHEMES.arabic,10);r.values['Z|LS1']='10.1';return calculate(r,GRADE_SCHEMES.arabic,'Z').categories.LS===51})()`);
run('An absent optional slot does not affect grade',`(()=>{const r=fixture(GRADE_SCHEMES.arabic,10);const a=calculate(r,GRADE_SCHEMES.arabic,'Z');r.assessments.LS5={enabled:false,max:10};return calculate(r,GRADE_SCHEMES.arabic,'Z').value===a.value})()`);
const failed=cases.filter(x=>!x.passed);
const report={phase:'3.31',type:'internal-engine-regression-only',source_sha256:crypto.createHash('sha256').update(source).digest('hex'),passed:cases.length-failed.length,total:cases.length,failed:failed.length,cases,certification:'NOT CERTIFIED — no independent corrected-Excel output comparisons'};
fs.writeFileSync(path.join(__dirname,'grade_release_results.json'),JSON.stringify(report,null,2)+'\n');
console.log(`Phase 3.31 internal regression: ${report.passed}/${report.total} passed; ${report.failed} failed`);
if(failed.length){failed.forEach(x=>console.error(x.name,x.error));process.exit(1)}
