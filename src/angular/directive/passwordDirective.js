import Validation from 'common/Validation';
import ValidationLocale from 'common/ValidationLocale';

export default ()=> ({
	require: 'ngModel',
	link: function (scope, elm, attrs, ctrl) {
		ctrl.$validators.password = (modelValue, viewValue)=> {
			if(!viewValue) return;
			let errors = Validation.password(viewValue);
			errors.length ? scope.validation[attrs.name] = true : delete scope.validation[attrs.name];
			elm[0].setCustomValidity(errors.length ? ValidationLocale[errors[0].error] : '');
			return !errors.length;
		};
	}
});
