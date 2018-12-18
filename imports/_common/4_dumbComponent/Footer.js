
import React, {Component} from 'react';
import { Segment } from 'gat-ui-react';

export default class Footer extends Component {

	render(){

		return (
			<footer style={{...this.props.style}}>
				<Segment style ={{
					marginTop:10, 
					height:50, 
					color:'rgba(255,255,255,0.7)', 
					backgroundColor:'rgba(181,204,24,1)', 
					alignItems:'center', 
					justifyContent:'center'
				}} >
					<span>
						Chain-Meteor-React-Redux
					</span>
				</Segment>
			</footer>

		);
	}
}
