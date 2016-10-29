let passRules = [{
			error: 'inc-char',
			regexp: /(?:abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/
		}, {
			error: 'non-iol',
			regexp: /^[^i^o^l]+$/
		}, {
			error: 'two-chars',
			regexp: /[a-z]*([a-z])\1([a-z])+/
		}, {
			error: 'max-char',
			regexp: /^\w{1,32}$/
		}, {
			error: 'lcase-char',
			regexp: /^[a-z]+$/
		}];

export default {
	password: (val)=> passRules.filter((item)=> !item.regexp.test(val))
}
