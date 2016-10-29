beforeEach(()=>
	jasmine.addMatchers({
		toContainError: ()=> ({
			compare: (actual, expected)=>	({
				pass: actual.map((item)=> item.error).indexOf(expected) !== -1
			})
		})
	})
);
