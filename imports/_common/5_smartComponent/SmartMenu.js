/*le menu noir de gauche ou en haut(mobile) il permet de selectionner le widget qu'on veut afficher*/
import React, { Component }	from 'react';
import { bindActionCreators }	from 'redux';
import { connect } 				from 'react-redux';

import { ACTIONS } from '../../6_actions/actions';

import { Menu,Item } from 'gat-ui-react';

// preparation of Menu at the top
class SmartMenu extends Component {
	//items object put at the left
	menusL(){return[
		{
			title: 'Home',
			url: '/',
			display:true
		},
		{
			title: 'Infinite scroll',
			url: '/infinite_scroll',
			display:true
		}
	];}
	//items object put at the Right
	menusR(){return[
		
		{
			title: 'Connexion',
			url: '/connexion',
			display:!(this.props.active_user)
		},
		{
			title: 'Logout',
			url: '/logout',
			img: '/images/logout.png',
			src: 'logout',
			display:this.props.active_user,
			style: {padding:0}
		},
		{
			title: 'Delete My Account',
			url: '/delete_account',
			display:this.props.active_user,
		}
	];}
	//Controle Actions if user click on
	activeMenu( title, url, e ){
		e.preventDefault();
		if(title == 'Logout'){
			this.props.logOut(()=>{FlowRouter.go('/');});
			
		}else if (title == 'Delete My Account'){
			this.props.usersRm({_id:this.props.active_user._id});
			this.props.logOut(()=>{FlowRouter.go('/');});
		}else if (url){
			this.props.activeMenu(title);
			FlowRouter.go(url);
		}
	}
	//Standart function to prepare Item of "gat-ui-react" npm
	items(tab){
		//import lot of example property that are integrate in the component
		return tab.map(({title, text, url, display, img, src, action, style}, i)=> {
			if(display!=undefined?display:true){
				return	<Item
					img = {img?img:''}
					src = {src?src:''}
					active={this.props.active_menu == title }
					onClick={this.activeMenu.bind(this,title,url)}
					key = { i }
					style = {style?style:''}>
					{ text?text:title }
				</Item>;
			}
		});
	}
	render() {
		return (
			//disposition of Items
			<Menu row 
			style = {{color:'white', 
			borderTop:'none', 
			backgroundColor:'rgba(181,204,24,1)', 
			flexWrap: 'wrap', 
			justifyContent:'space-between',
			...this.props.style }}>
				<div style = {{display:'flex'}}>
					{ 
						this.items(this.menusL())
					}
				</div>
				
				<div style = {{display:'flex'}}>
					{ 
						this.items(this.menusR())
					}
				</div>		
			</Menu>
		);
	}
}

function mapStateToProps(state){
	return (
		{
			active_menu: state.menu.active_menu,
			active_user: state.users.active_user
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		activeMenu: ACTIONS.Menu.activeMenu,
		logOut: ACTIONS.Users.logOut,
		usersRm: ACTIONS.Users.rm

	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( SmartMenu );
