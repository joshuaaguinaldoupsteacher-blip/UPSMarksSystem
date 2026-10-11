// Run: node evidence_safety_tests.js
const assert=require('assert');require('./evidence_safety.js');
const {safeCSVCell,validCaseId}=globalThis.UPS_EVIDENCE_SAFETY;
const tests=[
 ['formula equals',()=>assert.equal(safeCSVCell('=1+1'),"\"'=1+1\"")],
 ['formula plus',()=>assert.equal(safeCSVCell('+SUM(A1:A2)'),"\"'+SUM(A1:A2)\"")],
 ['formula minus',()=>assert.equal(safeCSVCell('-2+3'),"\"'-2+3\"")],
 ['formula at',()=>assert.equal(safeCSVCell('@SUM(A1)'),"\"'@SUM(A1)\"")],
 ['leading whitespace formula',()=>assert.equal(safeCSVCell('  =HYPERLINK(1)'),"\"'  =HYPERLINK(1)\"")],
 ['leading tab formula',()=>assert.equal(safeCSVCell('\t=1+1'),"\"'\t=1+1\"")],
 ['regular grade string',()=>assert.equal(safeCSVCell('88.5'),"\"88.5\"")],
 ['escape quotes',()=>assert.equal(safeCSVCell('case "A"'),"\"case \"\"A\"\"\"")],
 ['missing value',()=>assert.equal(safeCSVCell(null),'""')],
 ['valid case id',()=>assert(validCaseId('FICTIONAL-01'))],
 ['reject blank case id',()=>assert(!validCaseId('    '))],
 ['reject control chars',()=>assert(!validCaseId('CASE\n=BAD'))],
 ['reject overly long case id',()=>assert(!validCaseId('x'.repeat(121)))],
 ];let fail=0;for(const [name,fn] of tests){try{fn();console.log('PASS',name)}catch(e){fail++;console.error('FAIL',name,e.message)}}console.log(`${tests.length-fail}/${tests.length} passed`);if(fail)process.exit(1);
