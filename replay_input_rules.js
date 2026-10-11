/* Phase 3.39 — reusable fictional grading-evidence input checks. */
(function(root){'use strict';
function validNumber(v,min,max,integer=false){
 if(v===null||v===undefined||typeof v==='boolean'||String(v).trim()==='')return false;
 const n=Number(v);
 return Number.isFinite(n)&&n>=min&&n<=max&&(!integer||Number.isInteger(n));
}
function parseCSV(source){
 if(typeof source!=='string'||!source.trim())throw Error('Empty CSV');
 const rows=[];let row=[],cell='',quoted=false,closed=false;
 for(let i=0;i<source.length;i++){
  const ch=source[i];
  if(quoted){if(ch==='"'&&source[i+1]==='"'){cell+='"';i++}else if(ch==='"'){quoted=false;closed=true}else cell+=ch;continue}
  if(ch==='"'){if(cell!==''||closed)throw Error('Invalid quote');quoted=true;continue}
  if(closed&&!['\r','\n',','].includes(ch))throw Error('Unexpected content after quoted cell');
  if(ch===','){row.push(cell);cell='';closed=false;continue}
  if(ch==='\r'||ch==='\n'){row.push(cell);rows.push(row);row=[];cell='';closed=false;if(ch==='\r'&&source[i+1]==='\n')i++;continue}
  cell+=ch;
 }
 if(quoted)throw Error('Unclosed quote');
 if(cell!==''||row.length){row.push(cell);rows.push(row)}
 return rows.filter(r=>r.some(s=>s.trim()!==''));
}
function validatePayload(payload,specs){
 if(!payload||typeof payload!=='object'||Array.isArray(payload)||!payload.values||!payload.assessments||typeof payload.values!=='object'||typeof payload.assessments!=='object'||Array.isArray(payload.values)||Array.isArray(payload.assessments))throw Error('Invalid assessment payload');
 const allowed=new Set(specs.map(s=>s.key));
 for(const k of Object.keys(payload.assessments))if(!allowed.has(k))throw Error('Unrecognized assessment '+k);
 for(const k of Object.keys(payload.values)){
  if(!k.startsWith('TEST|')||!allowed.has(k.slice(5)))throw Error('Unrecognized raw-score key');
  const v=payload.values[k];
  if(typeof v!=='string'&&typeof v!=='number')throw Error('Invalid raw-score type: '+k);
 }
 for(const spec of specs){
  const item=payload.assessments[spec.key];
  if(!item||typeof item.enabled!=='boolean'||!validNumber(item.max,0.000001,100000))throw Error('Invalid assessment configuration '+spec.key);
  if(spec.required&&!item.enabled)throw Error('Required examination disabled');
  if(item.enabled){const key='TEST|'+spec.key;const v=payload.values[key];
   if(!validNumber(v,0,Number(item.max)))throw Error('Missing or invalid score '+key);
  }
 }
 return true;
}
function validEvidence(row){
 for(const key of ['web_initial','web_term','excel_initial','excel_term'])if(!validNumber(row[key],key.endsWith('initial')?0:60,100,key.endsWith('term')))throw Error('Missing or invalid comparison value: '+key);
 return true;
}
root.UPS_REPLAY_INPUT={parseCSV,validNumber,validatePayload,validEvidence};
})(typeof window==='undefined'?globalThis:window);
