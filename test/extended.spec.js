var assert = require('assert');
var parseFullName = require('../').parseFullName;
var Parser = require('../');
var error;

var verifyName = function(nameToCheck, partsToCheck) {
  assert.equal(nameToCheck.title, partsToCheck[0]);
  assert.equal(nameToCheck.first, partsToCheck[1]);
  assert.equal(nameToCheck.middle, partsToCheck[2]);
  assert.equal(nameToCheck.last, partsToCheck[3]);
  assert.equal(nameToCheck.nick, partsToCheck[4]);
  assert.equal(nameToCheck.suffix, partsToCheck[5]);
  assert.equal(nameToCheck.prefix, partsToCheck[6]);
  assert.equal(nameToCheck.error.length, partsToCheck[7].length);
  for ( var i = 1, l = partsToCheck[7].length; i < l; i++ ) {
    assert.equal(nameToCheck.error[i], partsToCheck[7][i]);
  }
};

describe('parse-full-name.extended', function() {
  it('Simple', function() {
    verifyName(parseFullName('Jan Mak'),
      ['','Jan','','Mak','','', '',[]]);
  });

  it('multi name', () => {
    verifyName(parseFullName('Jan Willem Mak'),
      ['','Jan','Willem','Mak','','','', []]);
  });


  it('suffix', () => {
    assert.equal(Parser.changeWords('suffix',['ba', 'bsc', 'ma', 'msc', 'llb', 'llm', 'a.i.']), true, 'change titles');

    verifyName(parseFullName('Jan Mak BA'),
      ['','Jan','','Mak','','BA','', []]);
  });

  it('Title', function() {
    assert.equal(Parser.changeWords('titles',['drs.', 'mr.', 'dr.', 'b.d.', 'broeder']), true, 'change titles');

    verifyName(parseFullName('Broeder mr. dr. b.d. Jan Mak'),
      ['Broeder mr. dr. b.d.','Jan','','Mak','','', '', ['Error: 4 titles found']]);
  });

  it('prefix', () => {
    assert.equal(Parser.changeWords('prefix',['d\'', 'de', 'den', 'die', 'van', 'der', 'v/d', 'llm', 'a.i.']), true, 'change titles');
    verifyName(parseFullName('Jan Willem van der Mak'),
      ['','Jan','Willem','Mak','','','van der', []]);
  });

});
