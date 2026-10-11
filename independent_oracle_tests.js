"use strict";
const fs=require('fs'),vm=require('vm'),path=require('path');
const src=fs.readFileSync(path.join(__dirname,'grading.js'),'utf8').split('function renderMapeOverview')[0];
const ctx={window:{},console};vm.createContext(ctx);vm.runInContext(src,ctx);
const fixtures=JSON.parse(fs.readFileSync(path.join(__dirname,'independent_grade_fixtures.json'),'utf8'));
const results=fixtures.cases.map(f=>{
  const rec={values:f.values,assessments:f.assessments};
  const r=ctx.calculate(rec,ctx.GRADE_SCHEMES?ctx.GRADE_SCHEMES[f.scheme]:vm.runInContext('GRADE_SCHEMES.'+f.scheme,ctx),f.student_id);
  const delta=Math.abs(r.value-Number(f.expected_initial_grade));
  const categoryMatches=Object.entries(f.expected_categories).every(([k,v])=>Math.abs(r.categories[k]-Number(v))<=1e-9);
  return {id:f.id,passed:r.complete&&delta<=1e-9&&categoryMatches,expected:Number(f.expected_initial_grade),actual:r.value,delta,categoryMatches};
});
const output={phase:'3.32',type:'independent-python-decimal-oracle-not-excel-parity',total:results.length,passed:results.filter(x=>x.passed).length,results};
if(require.main===module){console.log(JSON.stringify(output,null,2)); if(output.passed!==output.total)process.exitCode=1}
module.exports=output;
