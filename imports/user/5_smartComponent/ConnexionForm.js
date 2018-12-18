import React, { Component }	from 'react';
import { bindActionCreators }	from 'redux';
import { connect } from 'react-redux';

import { ACTIONS } from '../../6_actions/actions';

import { Input, Button, Form } from 'gat-ui-react';

//Exemple of Connexion form

class ConnexionForm extends Component {
	//Initialisation

	init(){
		return { 
			email: '',
			password: ''
		};
	}
	componentWillMount(){
		this.props.usersControle(this.init());
	}
	//Controle inputs
	change(e,{ value, name }){

		this.props.usersControle({ [name]:value });
	}
	//Action of log in
	usersLogIn(e){
		e?e.preventDefault():'';
		let {email, password} = this.props.users_controle;
		if(email&&password){
			this.props.usersLogIn( email, password, ()=>{
				this.props.usersGetActiveUser();
				this.props.usersControle(this.init());
				FlowRouter.go('/');
			} );
		}else{
			//Trigger alert thanks to Bert meteor package
			Bert.alert({
				title:'Error data for login',
				message:'give at least email & password ' ,
				type:'info',
				icon:'fa-info'
			});
		}
		
	}
	//Preparation du rendu
	
	render() {
		let {email, password} = this.props.users_controle;

		return (
			
			<Form onSubmit = { this.usersLogIn.bind( this ) }>
				{/*We need to declare defalut here because email has just been created*/}
				<Input
					label = 'E mail'
					name = 'email'
					autoComplete = "username"
					value = { email||'' }
					onChange = { this.change.bind( this ) } 
				/>
				<Input
					label = 'Mot de passe'
					name = 'password'
					type = 'password'
					autoComplete = "current-password"
					value = { password||'' }
					onChange = { this.change.bind( this ) }
				/>
				<Button
					onClick = { this.usersLogIn.bind( this ) }
				>
				Se Connecter
				</Button>
			</Form>
		);
	}
}

function mapStateToProps( state ){
	return (
		{
			users_controle: state.users.controle,
			active_user: state.users.active_user
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		//We use control of user collection
		usersControle: ACTIONS.Users.controle,
		//Additional actions
		usersLogIn: ACTIONS.Users.logIn,
		usersGetActiveUser:	ACTIONS.Users.getActiveUser,
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( ConnexionForm );
