import ValidationLocale from 'common/ValidationLocale';
import Config from 'common/Config';

let notify = (status)=> (status >= 500 && status <= 599) ?
	alert(ValidationLocale['submit-error']) :
	alert(ValidationLocale['submit-success']);

export default ($scope, $http) => {
	let pass2input = document.querySelector('input[ng-model="formData.pass2"]');
	let self = $scope;
	self.loading = false;
	self.formData = {};
	self.validation = {};
	self.invalidate = (e)=> e.target.setCustomValidity('');
	self.onClick = ()=> {
		let {pass1, pass2} = self.formData;
		if(!pass1 || !pass2) return;
		pass2input.setCustomValidity(pass1 !== pass2 ? ValidationLocale['pass-equal'] : '');
	};
	self.onSubmit = ()=> {
		let {email, pass1, pass2} = self.formData;

		if(Object.keys(self.validation).length || pass1 !== pass2) return;

		self.loading = true;
		$http.post('/register', {email, password: pass1}, {timeout: Config.timeout}).then(
			(res)=>{
				console.log('succ reg', res.status);
				self.formData = {};
				notify(res.status);
				self.loading = false;
			},
			(err)=>{
				notify(err.status);
				self.loading = false;
			}
		);
	}
};
