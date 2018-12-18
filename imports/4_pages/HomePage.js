import React, {Component} from 'react';

import { bindActionCreators }	from 'redux';
import { connect } from 'react-redux';

import { ACTIONS } from '../6_actions/actions';

import Title1 from '../_common/4_dumbComponent/Title1';

class HomePage extends Component {

	componentWillMount(){
		let { setControle, activeMenu } = this.props;
		//Witch title has to be display
		setControle({title_page:'Home'});
		//Wicth item in the SmartMenu has to be active
		activeMenu('Home');
	}
	
	render(){
		let { active_user } = this.props;
		return (
			<div style={{marginTop:0}}>
				{/* If connected, show active user's firstname*/}
				<Title1> Welcome {active_user&&active_user.profile?active_user.profile.firstname:''} </Title1>
			</div>
		);
	}
}

function mapStateToProps( state ){
	return (
		{
			active_user: state.users.active_user,
			active_menu: state.menu.active_menu,

		}
	);

}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		setControle: ACTIONS.Controle.set,
		activeMenu: ACTIONS.Menu.activeMenu
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( HomePage );
