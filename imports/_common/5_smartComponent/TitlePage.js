import React, {Component} from 'react';
import { connect } 				from 'react-redux';

//Title of the page react with Redux state
class TitlePage extends Component {
	render(){
		return (
			<h1 style={{ 
				backgroundColor:'white',
				textAlign:'center',
				verticalAlign:'middle', 
				borderBottom:'solid 1px black', 
				margin:0,
				marginBottom:10,
				padding:15,
				...this.props.style
			}}>
				{ this.props.title_page }
			</h1>
		);
	}
}

function mapStateToProps(state){
	return (
		{
			title_page:state.controle.title_page
		}
	);
}

export default connect( mapStateToProps, null )( TitlePage );
