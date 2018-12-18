//Simple short menu component using Menu from 'gat-ui-react'
import React, { Component }	from 'react';

import { Menu, Item } from 'gat-ui-react';

export default class ShortMenu extends Component {

	activeMenu( str, e ){
		this.props.controle(str);
	}
	items(tab){
		return tab.map((str, i)=><Item
				active={this.props.active == str }
				onClick={this.activeMenu.bind(this,str)}
				key = { i }
				style = {{flex:1, justifyContent:'center'}}>
				{ str }
			</Item>
		);
	}
	render(){
		return (
			<Menu row style = {{
				color:'black', 
				fontWeight:'bold',
				backgroundColor:'rgba(250,250,250,1)', 
				flexWrap: 'wrap',
				...this.props.style 
			}}>
				{ 
					this.items(this.props.items)
				}
			</Menu>
		);
	}
}
