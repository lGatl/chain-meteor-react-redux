import React, {Component} from 'react';

import { bindActionCreators }	from 'redux';
import { connect } from 'react-redux';

import { ACTIONS } from '../6_actions/actions';

import { Segment, Button } from 'gat-ui-react';

import ConnexionForm from '../user/5_smartComponent/ConnexionForm';
import InscriptionForm from '../user/5_smartComponent/InscriptionForm';
import ShortMenu from '../_common/4_dumbComponent/ShortMenu';

//A page to show you an exemple of login system
class ConnexionPage extends Component {

	componentWillMount(){
		let { setControle, activeMenu } = this.props;
		//Wicth item in the SmartMenu has to be active
		activeMenu('Connexion');
		//Witch title has to be display && Active the default item of the short menu
		setControle({title_page:'Log in',short_menu:'Log in'});
	}

	//ACTION
	//Controle of ShortMenu return the string selected
	controleMenu(str){
		//To controle the short menu
		this.props.setControle({title_page:str,short_menu:str});
	}

	//==============RENDER==================
	render(){
		let {short_menu}=this.props;
		return (
			<div style = {{display:'flex',flex:1, justifyContent:'center'}}>
				<div style = {{display:'flex',width:'60%',minWidth:320, flexDirection:'column', alignItems:'stretch'}}>
						{/* Simple little menu, items are only strings in array and need to precise the active item string */}
						<ShortMenu 
								style = {{backgroundColor:'rgba(24, 170, 234, 1)', color:'white'}}
								items={['Create Account','Log in']} 
								controle={this.controleMenu.bind(this)} 
								active={short_menu}
							/>	
					{/* Display component  according to ShortMenu*/}
					{short_menu == 'Log in'?<ConnexionForm/>:<InscriptionForm/> }
				</div>
			</div>
		);
	}
}
function mapStateToProps(state){
	return (
		{
			short_menu:state.controle.short_menu,
		}
	);
}
function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		activeMenu: ACTIONS.Menu.activeMenu,
		setControle: ACTIONS.Controle.set
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( ConnexionPage );

