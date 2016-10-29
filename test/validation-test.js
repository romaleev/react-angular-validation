import Validation from '../src/common/Validation';

describe('Validation', ()=>{
	it('inc-char: must include one increasing straight of at least three letters', ()=>{
		expect(Validation.password('abd')).toContainError('inc-char');
		expect(Validation.password('xcyz')).toContainError('inc-char');
		expect(Validation.password('abcd')).not.toContainError('inc-char');
	});
	it('non-iol: may not contain the letters "i", "o" or "l"', ()=>{
		expect(Validation.password('zyzi')).toContainError('non-iol');
		expect(Validation.password('xazo')).toContainError('non-iol');
		expect(Validation.password('lxyz')).toContainError('non-iol');
		expect(Validation.password('xyzb')).not.toContainError('non-iol');
	});
	it('two-chars: must contain at least two non-overlapping pairs of letters', ()=>{
		expect(Validation.password('nabc')).toContainError('two-chars');
		expect(Validation.password('naabc')).not.toContainError('two-chars');
	});
	it('max-char: cannot be longer than 32 characters', ()=>{
		expect(Validation.password('aabc' + (new Array(30)).join("x"))).toContainError('max-char');
		expect(Validation.password('naafbc')).not.toContainError('max-char');
	});
	it('lcase-char: can only contain lower case alphabetic characters', ()=>{
		expect(Validation.password('nnabcD')).toContainError('lcase-char');
		expect(Validation.password('naafbc')).not.toContainError('lcase-char');
	});
});
