// Phase 3.29 fictional-data, deterministic zero/blank and category rounding checks.
(function(){
const tests=[],assert=(name,fn)=>{try{tests.push({name,pass:!!fn()})}catch(e){tests.push({name,pass:false,error:e.message})}};
function fixture(kind,byCategory={},opts={}){
 const scheme=GRADE_SCHEMES[kind],rec={status:'draft',values:{},assessments:{}},id='TEST';
 for(const spec of specsFor(scheme)){
  const enabled=spec.required||spec.slot===0||spec.slot===1&&opts.two;
  rec.assessments[spec.key]={enabled,max:opts.max?.[spec.key]||20};
  if(enabled)rec.values[id+'|'+spec.key]=String(byCategory[spec.key]??byCategory[spec.category]??10);
 }
 return {rec,scheme,id};
}
for(const kind of ['general','hele','arabic','islamic','mape']){
 assert(kind+': entered zero is valid, not missing',()=>{let x=fixture(kind);for(const key of Object.keys(x.rec.values))x.rec.values[key]='0';return calculate(x.rec,x.scheme,x.id).value===0&&calculate(x.rec,x.scheme,x.id).complete});
 assert(kind+': blank required score blocks final grade',()=>{const x=fixture(kind);x.rec.values['TEST|ST1']='';return calculate(x.rec,x.scheme,x.id).value===null});
 assert(kind+': whitespace input blocks final grade',()=>{const x=fixture(kind);x.rec.values['TEST|ST1']='  ';return calculate(x.rec,x.scheme,x.id).value===null});
 assert(kind+': null input blocks final grade',()=>{const x=fixture(kind);x.rec.values['TEST|ST1']=null;return calculate(x.rec,x.scheme,x.id).value===null});
 assert(kind+': invalid over-perfect score rejected',()=>{const x=fixture(kind);x.rec.values['TEST|ST1']='21';return calculate(x.rec,x.scheme,x.id).value===null});
}
for(const kind of ['arabic','islamic']){
 const cat=kind==='arabic'?'LS':'QR';
 assert(kind+': 2/3 category rounds to 67 before weighting',()=>{const x=fixture(kind,{[cat]:2},{max:{[cat+'1']:3}});const r=calculate(x.rec,x.scheme,x.id);return r.categories[cat]===67});
 assert(kind+': entered zero in non-exam category contributes zero',()=>{const x=fixture(kind,{[cat]:0});const r=calculate(x.rec,x.scheme,x.id);return r.categories[cat]===0&&r.complete});
 assert(kind+': multiple active category slots combine earned / possible',()=>{const x=fixture(kind,{}, {two:true,max:{[cat+'1']:10,[cat+'2']:20}});x.rec.values['TEST|'+cat+'1']='5';x.rec.values['TEST|'+cat+'2']='20';return calculate(x.rec,x.scheme,x.id).categories[cat]===83});
}
const passed=tests.filter(t=>t.pass).length;
document.getElementById('summary').textContent=passed+' / '+tests.length+' checks passed';
document.getElementById('table-body').innerHTML=tests.map(t=>'<tr><td>'+t.name+'</td><td style="color:'+(t.pass?'#177044':'#aa2841')+'">'+(t.pass?'PASS':'FAIL')+(t.error?' — '+t.error:'')+'</td></tr>').join('');
})();