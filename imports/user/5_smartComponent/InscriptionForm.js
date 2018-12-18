import React, { Component }	from 'react';
import { bindActionCreators }	from 'redux';
import { connect } from 'react-redux';

import { ACTIONS } from '../../6_actions/actions';

import { Input, TextArea, Button, Checkbox, Segment, Form } from 'gat-ui-react';

import { debounce } from '../../8_libs/debounce';

//There is an exemple of Inscription Form
class FormulaireDInscription extends Component {
//Initialisation
	constructor(){
		super();
	}
	init(){
		return {
			email: '',
			password: '',
			surname: '',
			firstname: '',
			agreement:false,
		};
	}
	
	componentWillMount(){
		this.props.usersControle(this.init());
	}
	//Controle
	change(e,{ value, name, checked }){
		checked?this.props.usersControle({ [name]:checked }):this.props.usersControle({ [name]:value });
	}
	//Action
	usersCreeCompte(){
		let {email,password,surname,firstname,agreement} = this.props.controle;
		email = typeof email=='string'&&email.length>0?email:false;
		password = typeof password=='string'&&password.length>0?password:false;
		if(email&&password&&agreement){
			this.props.usersCreeCompte({
				email,
				username:email,
				password,
				profile:{
					surname,
					firstname,
					agreement
				}
			}, ()=>{
				this.props.getActiveUser();
				this.props.usersControle(this.init());
				FlowRouter.go('/');
			});
		}else{
			//Trigger alert thanks to Bert meteor package
			Bert.alert({
				title:'Error data for login',
				message:'give at least email, password & check agreement' ,
				type:'info',
				icon:'fa-info'
			});
		}
	}
	
	//Preparation du rendu
	render() {
		let {email,password,surname,firstname, agreement} = this.props.controle;

		return (

				<Form style={{flex:2}}>
				{/*We need to declare defalut here because email has just been created*/}
					<Input
						label = 'E mail'
						name = 'email'
						value = { email || '' }
						onChange = { this.change.bind( this ) } 
					/>
					<Input
						label = 'Password'
						name = 'password'
						type = 'password'
						autoComplete=''
						value = { password || '' }
						onChange = { this.change.bind( this ) }
					/>
					<Input
						label = 'Surname'
						name = 'surname'
						value = { surname || '' }
						onChange = { this.change.bind( this ) } 
					/>
					<Input
						label = 'Firstname'
						name = 'firstname'
						value = { firstname || '' }
						onChange = { this.change.bind( this ) }
					/>
					<Checkbox
						label = 'Agreement'
						name = 'agreement'
						checked = {agreement||false}
						onChange = { this.change.bind( this ) }
					/>

					<Button
						onClick = { this.usersCreeCompte.bind( this ) }
					>
					Create
					</Button>
				</Form>
		);
	}
}

function mapStateToProps( state ){
	return (
		{
			controle: state.users.controle
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		//We use control of user collection
		usersControle: ACTIONS.Users.controle,
		usersCreeCompte: ACTIONS.Users.creeCompte,
		getActiveUser: ACTIONS.Users.getActiveUser
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( FormulaireDInscription );


