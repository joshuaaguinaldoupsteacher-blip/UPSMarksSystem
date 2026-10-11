/* Phase 3.41: real HELPER lookup fixture pair tests, executed in Node or browser. */
(function(root){'use strict';
const tests=[];function test(name,ok){tests.push({name,pass:!!ok});}
for(const scheme of ['general','hele','arabic','islamic','mape']){
 const value=75;const grade=root.UPS_REFERENCE_GRADE(scheme,value);
 test(scheme+' good pair',root.UPS_PAIR_CHECK.check(scheme,value,grade).status==='CONSISTENT');
 test(scheme+' bad term',root.UPS_PAIR_CHECK.check(scheme,value,grade===100?99:grade+1).status==='LOOKUP_DIFFERENCE');
}
test('invalid template',root.UPS_PAIR_CHECK.check('not-a-template',75,80).status==='INVALID_TEMPLATE');
test('empty initial is invalid',root.UPS_PAIR_CHECK.check('general',NaN,80).status==='INVALID_VALUES');
test('decimal term disallowed',root.UPS_PAIR_CHECK.check('general',75,80.5).status==='INVALID_VALUES');
test('negative grade rejected',root.UPS_PAIR_CHECK.check('general',-1,75).status==='INVALID_VALUES');
const failed=tests.filter(x=>!x.pass);
root.UPS_PAIR_TEST_RESULT={tests,passed:tests.length-failed.length,total:tests.length};
if(typeof module!=='undefined'&&module.exports)module.exports=root.UPS_PAIR_TEST_RESULT;
})(typeof window==='undefined'?globalThis:window);
