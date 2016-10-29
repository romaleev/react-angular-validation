'use strict';

import ValidationLocale from '../src/common/ValidationLocale';
import Config from '../src/common/Config';
//import server from '../server';

export default (url, sync)=> {
	//browser = browser.forkNewDriverInstance(true);
	browser.ignoreSynchronization = sync;
	browser.get(url);

	let BrowserHelper = function (browser) {
		let withArray = (obj, cb)=>
			Array.isArray(obj) ? obj.forEach((item)=> cb(item)) : cb(obj);

		this.click = (id)=>
			browser.$(id).click();

		this.fill = (id, val)=>
			withArray(id, (item)=>
				browser.$(item).clear().then(()=>
					browser.$(item).sendKeys(val)));

		this.attr = (id, attr, cb)=>
			withArray(id, (item)=>
				browser.executeScript('return arguments[0].' + attr + ';', browser.$(item)).then(cb));

		this.validity = (id, cb)=> this.attr(id, 'validity', cb);

		this.validationMessage = (id, cb)=> this.attr(id, 'validationMessage', cb);

		this.containsMessage = (id, obj, cb)=>
			this.validationMessage(id, (m)=>
				cb(Array.isArray(obj) ?
						obj.some((item)=>
						ValidationLocale[item] === m) :
					ValidationLocale[obj] === m
				));

		this.notContainsMessage = (id, obj, cb)=>
			this.validationMessage(id, (m)=>
				cb(Array.isArray(obj) ?
						obj.every((item)=>
						ValidationLocale[item] !== m) :
					ValidationLocale[obj] !== m
				));

		this.wait = (sec)=>
			browser.sleep(sec);
	};

	let b = new BrowserHelper(browser);
	let validPass = 'aabc';

	describe('Validation', ()=> {

		it('init', ()=> {
			b.validity(['#email', '#pass1', '#pass2', '#confirm'], (v)=>
				expect(v.valueMissing).toBe(true));
		});

		it('email', ()=> {
			b.fill('#email', 'a');
			b.validity('#email', (v)=>
				expect(v.typeMismatch).toBe(true));
			b.fill('#email', 'a@b.com');
			b.validity('#email', (v)=>
				expect(v.valid).toBe(true));
		});

		it('password-regexp inc-char', ()=> {
			b.fill(['#pass1', '#pass2'], 'a');
			b.click('#submit');
			b.containsMessage('#pass1', ['inc-char', 'two-chars'], (v)=>
				expect(v).toBe(true));

			b.fill('#pass1', 'abc');
			b.click('#submit');
			b.notContainsMessage('#pass1', 'inc-char', (v)=>
				expect(v).toBe(true));
		});

		it('password-regexp non-iol', ()=> {
			b.fill('#pass1', validPass + 'i');
			b.click('#submit');
			b.containsMessage('#pass1', 'non-iol', (v)=>
				expect(v).toBe(true));

			b.fill('#pass1', validPass + 'o');
			b.click('#submit');
			b.containsMessage('#pass1', 'non-iol', (v)=>
				expect(v).toBe(true));

			b.fill('#pass1', validPass + 'l');
			b.click('#submit');
			b.containsMessage('#pass1', 'non-iol', (v)=>
				expect(v).toBe(true));

			b.fill('#pass1', 'a');
			b.click('#submit');
			b.notContainsMessage('#pass1', 'non-iol', (v)=>
				expect(v).toBe(true));
		});

		it('password-regexp two-chars', ()=> {
			b.fill('#pass1', 'abc');
			b.click('#submit');
			b.containsMessage('#pass1', 'two-chars', (v)=>
				expect(v).toBe(true));

			b.fill('#pass1', 'aa');
			b.click('#submit');
			b.notContainsMessage('#pass1', 'two-chars', (v)=>
				expect(v).toBe(true));
		});

		it('password-regexp max-char', ()=> {
			b.fill('#pass1', validPass + (new Array(30)).join("x")); // length should be > 32
			b.click('#submit');
			b.containsMessage('#pass1', 'max-char', (v)=>
				expect(v).toBe(true));

			b.fill('#pass1', validPass);
			b.click('#submit');
			b.notContainsMessage('#pass1', 'max-char', (v)=>
				expect(v).toBe(true));
		});

		it('password-regexp lcase-char', ()=> {
			b.fill('#pass1', validPass + 'C');
			b.click('#submit');
			b.containsMessage('#pass1', 'lcase-char', (v)=>
				expect(v).toBe(true));

			b.fill('#pass1', validPass);
			b.click('#submit');
			b.notContainsMessage('#pass1', 'lcase-char', (v)=>
				expect(v).toBe(true));
		});

		it('password-equal', ()=> {
			b.fill('#pass1', validPass);
			b.fill('#pass2', validPass + 'd');
			b.click('#submit');
			b.containsMessage('#pass2', 'pass-equal', (v)=>
				expect(v).toBe(true));

			b.fill('#pass2', validPass);
			b.click('#submit');
			b.notContainsMessage('#pass1', 'pass-equal', (v)=>
				expect(v).toBe(true));
		});

		it('confirm', ()=> {
			b.fill('#email', 'a@b.com');
			b.fill('#pass1', validPass);
			b.validity('#confirm', (v)=>
				expect(v.valueMissing).toBe(true));

			b.click('#confirm');
			b.validity('#confirm', (v)=>
				expect(v.valid).toBe(true));
		});

		it('submit-success', (done)=> {
			b.fill('#email', 'a@b.com');
			b.fill('#pass1', validPass);
			b.fill('#pass2', validPass);
			//b.click('#confirm'); - checked
			b.click('#submit');

			//browser.wait(protractor.ExpectedConditions.alertIsPresent(), timeout);
			//let alert = browser.switchTo().alert();
			//alert.accept();
			browser.wait(()=>
				browser.switchTo().alert().then(
					(alert)=> {
						alert.getText().then((t)=> {
							expect(t).toBe(ValidationLocale['submit-success']);
							alert.accept();
							//server.close();
							done();
						});
						return true;
					},
					()=> false
				), Config.timeout);
		});

	});
}
