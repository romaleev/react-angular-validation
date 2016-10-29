import React from 'react';
import Request from 'common/Request';
import Validation from 'common/Validation';
import ValidationLocale from 'common/ValidationLocale';

let Login = React.createClass({
	mixins: [require('react-addons-linked-state-mixin')],
	getInitialState() {
		return {
			loading: false
		};
	},
	componentDidMount(){
		this.pass1 = this.refs.pass1;
		this.pass2 = this.refs.pass2;
	},
	invalidate(e){
		e.target.setCustomValidity('');
	},
	onClick(){
		let {pass1, pass2} = this.state;
		if(!pass1 || !pass2) return;
		this.errors = Validation.password(pass1);
		this.pass1.setCustomValidity(this.errors.length ? ValidationLocale[this.errors[0].error] : '');
		this.pass2.setCustomValidity(pass1 !== pass2 ? ValidationLocale['pass-equal'] : '');
	},
	onSubmit(e){
		e.preventDefault();
		let {email, pass1, pass2} = this.state;

		if(this.errors.length || pass1 !== pass2) return;

		this.setState({loading: true});
		Request.post('/register', {email, password: pass1})
			.then((res)=>{
				console.log('succ reg', res);
				this.setState({
					loading: false,
					email: '',
					pass1: '',
					pass2: '',
					confirm: ''
				});
				alert(ValidationLocale['submit-success']);
			})
			.catch((err)=>{
				console.error('err reg', err);
				this.setState({loading: false});
				alert(ValidationLocale['submit-error']);
			});
	},
	render() {
		let loading = this.state.loading;
		return (<div className='login-wrapper'>
				<p className='t1'>
					Sign up <b>for you</b>.
				</p>
				<p className='t2'>It only takes a moment.</p>
				<form novalidation className='login-form' onSubmit={this.onSubmit}>
					<p className='t3'>Please enter your details.</p>
					<input autoFocus id='email' ref='email' valueLink={this.linkState('email')} type='email' placeholder='Email'
									disabled={loading} required/>
					<input id='pass1' ref='pass1' valueLink={this.linkState('pass1')} onKeyDown={this.invalidate}
									type='password' placeholder='New password' disabled={loading} required/>
					<input id='pass2' ref='pass2' valueLink={this.linkState('pass2')} onKeyDown={this.invalidate}
									type='password' placeholder='Confirm new password' disabled={loading} required/>
					<input id='confirm' name='confirm' valueLink={this.linkState('confirm')} type='checkbox' disabled={loading} required/>
					<label htmlFor='confirm'>
						I agree to <a href='https://www.example.com' target='_blank'>terms and conditions</a>
					</label>
					<input id='submit' type='submit' onClick={this.onClick} disabled={loading} value='Next >' />
			</form>
		</div>);
	}
});

export default Login;
