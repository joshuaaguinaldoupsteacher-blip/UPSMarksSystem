'use strict';
// Fictional-data browser-memory assessment prototype. Never connect to live records.
const GRADE_SCHEMES={
 general:{label:'General Subjects',categories:[['WW','Written Works',20,5],['PT','Performance Tasks',60,3],['EX','Examinations',20,3]]},
 hele:{label:'HELE / TLE',categories:[['WW','Written Works',30,5],['PT','Performance Tasks',50,3],['EX','Examinations',20,3]]},
 arabic:{label:'Arabic Education',categories:[['LS','Listening & Speaking',10,1],['WR','Writing',40,1],['RD','Reading',10,1],['EX','Examinations',40,3]]},
 islamic:{label:'Islamic Education',categories:[['QR','Qur’an Recitation',10,1],['MEM','Memorization',15,1],['VAL','Values',5,1],['WQA','Worksheets / Quizzes / Activities',30,1],['EX','Examinations',40,3]]},
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
function renderMapeOverview(cid){
 const id=roster[0][0], items=mapeNine(cid,id);
 const termValues=items.map(x=>x.value===null?null:(window.UPS_REFERENCE_GRADE?.('mape',x.value)??null));
 const complete=termValues.every(x=>x!==null);
 const mean=complete?termValues.reduce((a,b)=>a+b,0)/9:null;
 return `<div class="mape-overview"><h3>MAPE nine-component overview</h3><p class="muted">Music, Arts and PE × three terms · ${el(roster[0][1])} (fictional student)</p><div class="mape-grid">${items.map((x,i)=>`<div class="mape-cell"><span>Term ${x.term} · ${x.comp}</span><strong>${termValues[i]===null?'—':termValues[i]+'*'}</strong></div>`).join('')}</div><p><b>Transmuted nine-part average (provisional):</b> ${mean===null?'—':mean.toFixed(2)+'*'}</p><p class="tiny">Each entry is a transmuted component Term Grade. Final MAPE rounding and Excel formula parity are still pending; these figures are not approved report-card results.</p></div>`;
}
records=function(){const list=entries();if(!list.some(([c,s])=>c===chosen[0]&&s===chosen[1]))chosen=list[0]||['CLS-009','MATH'];const [cid,sub]=chosen,shs=gradeOf(cid)>10,scheme=GRADE_SCHEMES[schemeFor(sub)],rec=currentGrade(),specs=specsFor(scheme),active=activeSpecs(rec,scheme),writable=rec.status==='draft'&&!shs;
const sections=scheme.categories.map(([cat,title,weight])=>`<div class="record-category"><div class="record-category-head"><h3>${el(title)} <span>${weight}%</span></h3><small>${cat==='EX'?'ST1 30% · ST2 30% · End-of-Term 40% within Examinations':cat==='WW'?'Up to 5 activities':cat==='PT'?'Up to 3 activities':'Raw scored assessment activities'}</small></div><div class="tablewrap raw-tablewrap"><table class="grading-table raw-grade-table"><thead><tr><th class="student-stick">Student</th>${specs.filter(s=>s.category===cat).map(s=>{const a=assessment(rec,s);return `<th class="activity-head"><div>${el(s.name)}</div>${!s.required?`<label class="assess-toggle"><input type="checkbox" class="assessment-enabled" data-key="${s.key}" ${a.enabled?'checked':''} ${writable?'':'disabled'}> Use</label>`:'<small>Required</small>'}</th>`}).join('')}<th class="category-total">Raw %</th></tr><tr class="perfect-score-row"><th class="student-stick">Perfect score</th>${specs.filter(s=>s.category===cat).map(s=>{const a=assessment(rec,s);return `<th><input class="perfect-score" aria-label="Perfect score for ${el(s.name)}" data-key="${s.key}" type="number" min="1" step="0.5" value="${a.max}" ${writable&&a.enabled?'':'disabled'}></th>`}).join('')}<th>Category</th></tr></thead><tbody>${roster.map(([id,name])=>{const result=calculate(rec,scheme,id);return `<tr><td class="student-stick"><span class="cell-emphasis">${el(name)}</span><small class="mono-id">${el(id)}</small></td>${specs.filter(s=>s.category===cat).map(s=>{const a=assessment(rec,s);return `<td><input class="grade-score" aria-label="${el(s.name)} raw score for ${el(name)}" data-student="${id}" data-field="${s.key}" type="number" min="0" max="${a.max}" step="0.5" placeholder="—" value="${el(rec.values[id+'|'+s.key]??'')}" ${writable&&a.enabled?'':'disabled'}></td>`}).join('')}<td class="raw-total" data-category-total="${id}|${cat}">${fmt(result.categories[cat])}</td></tr>`}).join('')}</tbody></table></div></div>`).join('');
return `<div class="page-head"><div><div class="eyebrow">RAW SCORE CLASS RECORD · PHASE 3.12</div><h1>Class Grading Records</h1><p class="muted">${el(clabel(cid))} · ${el(labelFor(cid,sub))} · Fictional students</p></div><span class="status ${rec.status}">${el(shs?'SHS PENDING':rec.status.toUpperCase())}</span></div><div class="panel records-panel"><div class="section-head"><div><h2>Activity-Based Gradebook</h2><p class="muted">Set activity perfect scores once, then enter each student's earned marks.</p></div><span class="section-tag">AY 2026–2027</span></div><div class="filter-strip"><div><label>Class</label><select id="cls">${[...new Set(list.map(x=>x[0]))].map(id=>`<option value="${id}" ${cid===id?'selected':''}>${el(clabel(id))}</option>`).join('')}</select></div><div><label>Subject</label><select id="sub">${[...new Set(list.filter(([c])=>c===cid).map(x=>x[1]))].map(s=>`<option value="${s}" ${sub===s?'selected':''}>${el(labelFor(cid,s))}</option>`).join('')}</select></div><div><label>Term</label><select id="grading-term" ${shs?'disabled':''}>${[1,2,3].map(t=>`<option value="${t}" ${grTerm===t?'selected':''}>Term ${t}</option>`).join('')}</select></div>${sub==='MAPE'?`<div><label>MAPE component</label><select id="grading-component">${['Music','Arts','PE'].map(c=>`<option ${grComponent===c?'selected':''}>${c}</option>`).join('')}</select></div>`:''}</div>${shs?'<div class="notice">Senior-high assessment weights and semester offerings are pending; grading is disabled.</div>':`<div class="weight-row">${scheme.categories.map(([cat,title,weight])=>`<div class="weight-item"><span>${el(title)}</span><strong>${weight}%</strong></div>`).join('')}</div><div class="notice info-notice">Choose the activities used for this term. An unused WW or PT column is excluded completely. Enter each activity's <b>perfect score</b> at the top and students' <b>raw scores</b> below. All three examination components are required. Empty scores stay blank until submission.</div>${sections}<div class="panel raw-summary-panel"><div><b>Term Grades — Report Card Preview</b><p class="tiny">The prominently displayed Term Grade is the transmuted result. Asterisk (*) = provisional pending Excel parity certification. Arabic and Islamic non-exam category percentages use Excel-style whole-number rounding before category weighting. The raw weighted percentage is shown alongside for transparency.</p></div><div class="raw-summary-items">${roster.map(([id,name])=>`<div class="student-term-row"><span class="term-student-name">${el(name)}</span><span class="initial-grade-preview"><small>Initial %</small><strong data-weighted-total="${id}">${fmt(calculate(rec,scheme,id).value)}</strong></span><span class="term-grade-result" aria-label="Term grade intended for report card"><span class="term-grade-caption">TERM GRADE <small>REPORT CARD</small></span><strong class="term-grade-value" data-helper-grade="${id}">${helperGradeText(rec,scheme,id)}</strong></span></div>`).join('')}</div></div><div class="record-actions"><span class="action-hint">${writable?'Draft: edit activities, perfect scores, and marks.':'Submitted/approved: all scores are locked.'}</span><div class="actions"><button id="gr-save" ${writable?'':'disabled'}>Save draft</button><button id="gr-submit" class="secondary" ${writable?'':'disabled'}>Submit record</button>${actor.role==='teacher'?'':`<button id="gr-approve" ${rec.status==='submitted'?'':'disabled'}>Approve & lock</button><button class="secondary" id="gr-reopen" ${rec.status==='draft'?'disabled':''}>Reopen</button>`}</div></div>${sub==='MAPE'?renderMapeOverview(cid):''}<div class="notice">Fictional demo only. <b>Term Grade</b> is the report-card grade field after official formula certification and approval. Results currently carry an asterisk (*) because Excel intermediate rounding and full formula parity remain unverified. Do not publish provisional results as official grades. Blank enabled scores become zero only after submission confirmation.</div>`}</div>`}
const priorBind=bind;
bind=function(){priorBind();document.getElementById('grading-term')?.addEventListener('change',e=>{grTerm=Number(e.target.value);render()});document.getElementById('grading-component')?.addEventListener('change',e=>{grComponent=e.target.value;render()});
 function gather(){const rec=currentGrade(),scheme=GRADE_SCHEMES[schemeFor(chosen[1])],defs={},vals={...rec.values};for(const spec of specsFor(scheme)){const toggle=document.querySelector(`.assessment-enabled[data-key="${spec.key}"]`),enabled=spec.required||(toggle?toggle.checked:assessment(rec,spec).enabled),input=document.querySelector(`.perfect-score[data-key="${spec.key}"]`),max=Number(input?.value??assessment(rec,spec).max);if(enabled&&(!Number.isFinite(max)||max<=0))return{error:`Perfect score for ${spec.name} must be above zero.`};defs[spec.key]={enabled,max};}
 for(const node of document.querySelectorAll('.grade-score')){const def=defs[node.dataset.field];if(!def.enabled)continue;const text=node.value.trim(),num=Number(text);if(text!==''&&(!Number.isFinite(num)||num<0||num>def.max))return{error:`Scores must be between 0 and the perfect score (${def.max}) for ${node.dataset.field}.`};vals[node.dataset.student+'|'+node.dataset.field]=text}
 return{defs,vals}}
 function preview(){const packet=gather();if(packet.error)return;const rec=currentGrade(),scheme=GRADE_SCHEMES[schemeFor(chosen[1])];for(const [id] of roster){const summary=calculate(rec,scheme,id,packet.vals,packet.defs),total=document.querySelector(`[data-weighted-total="${id}"]`);if(total)total.textContent=fmt(summary.value);
 const ref=document.querySelector(`[data-helper-grade="${id}"]`);
 if(ref)ref.textContent=(summary.value===null?'—':((window.UPS_REFERENCE_GRADE?.(schemeFor(chosen[1]),summary.value)??'unmatched')+'*'));for(const [cat,value]of Object.entries(summary.categories)){const span=document.querySelector(`[data-category-total="${id}|${cat}"]`);if(span)span.textContent=fmt(value)}}}
 document.querySelectorAll('.grade-score,.perfect-score,.assessment-enabled').forEach(node=>node.addEventListener('input',preview));
 document.querySelectorAll('.assessment-enabled').forEach(node=>node.addEventListener('change',()=>{const packet=gather();if(packet.error){alert(packet.error);return}const rec=currentGrade();rec.assessments=packet.defs;rec.values=packet.vals;render()}));
 function save(){const rec=currentGrade();if(rec.status!=='draft')return false;const packet=gather();if(packet.error){alert(packet.error);return false}for(const [key,def] of Object.entries(packet.defs)){const old=rec.assessments[key];if(!old||old.max!==def.max||old.enabled!==def.enabled)log(`Assessment ${key}: perfect ${old?.max??'—'} → ${def.max}, enabled ${def.enabled}`)}for(const [key,value] of Object.entries(packet.vals)){const old=rec.values[key]??'';if(old!==value)log(`Score ${key}: ${old||'blank'} → ${value||'blank'}`)}rec.assessments=packet.defs;rec.values=packet.vals;return true}
 document.getElementById('gr-save')?.addEventListener('click',()=>{if(!save())return;notice='Raw-score draft saved in temporary demo memory.';render()});
 document.getElementById('gr-submit')?.addEventListener('click',()=>{const packet=gather();if(packet.error){alert(packet.error);return}const specs=specsFor(GRADE_SCHEMES[schemeFor(chosen[1])]).filter(s=>packet.defs[s.key].enabled);const missing=roster.reduce((n,[id])=>n+specs.filter(s=>!packet.vals[id+'|'+s.key]).length,0);if(!confirm(`Submit this fictional term record? ${missing} blank score(s) in enabled assessments will become zero; unused activity columns stay excluded. Editing will lock.`))return;if(!save())return;const rec=currentGrade();for(const [id] of roster)for(const s of specs){const key=id+'|'+s.key;if(rec.values[key]===undefined||rec.values[key]===''){rec.values[key]='0';log(`Blank score ${key} converted to 0`)}}rec.status='submitted';rec.submittedBy=actor.email;log(`Submitted Term ${grTerm}${chosen[1]==='MAPE'?' '+grComponent:''}`);notice='Fictional term record submitted and locked.';render()});
 document.getElementById('gr-approve')?.addEventListener('click',()=>{const rec=currentGrade();if(actor.role==='teacher'||rec.status!=='submitted')return;rec.status='approved';rec.approvedBy=actor.email;log(`Approved Term ${grTerm}${chosen[1]==='MAPE'?' '+grComponent:''}`);notice='Fictional record approved and locked.';render()});
 document.getElementById('gr-reopen')?.addEventListener('click',()=>{const rec=currentGrade();if(actor.role==='teacher'||rec.status==='draft')return;const reason=prompt('Reason for reopening this fictional record:');if(!reason?.trim())return;rec.status='draft';log('Reopened: '+reason.trim());notice='Fictional record reopened.';render()})};
render();
