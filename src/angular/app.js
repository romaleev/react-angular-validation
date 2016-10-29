import Angular from 'angular';
import 'angular-route';
//optional import 'angular-ui-router'; [ui.router]
import 'css/common.scss';
import LoginTemplate from 'angular/module/login/login.tmpl.html';
import LoginCtrl from 'angular/module/login/login.ctrl';
import Password from 'angular/directive/passwordDirective';

Angular.module('app', ['ngRoute'])
	.config(($locationProvider)=>{
		$locationProvider.html5Mode(true);
	})
	.config(($routeProvider)=>
		$routeProvider
			.when('/angular', {
				controller: 'LoginController',
				template: LoginTemplate
			}))
	.controller('LoginController', LoginCtrl)
	.directive('password', Password);
