import React, { Component }	from 'react';
import { bindActionCreators }	from 'redux';
import { connect } from 'react-redux';

import { ACTIONS } from '../../6_actions/actions';

import { throttle } from '../../8_libs/throttle';

export default class InfiniteScroll extends Component {
	constructor(){
		super();
		this.scroll = throttle(this.scroll.bind(this),40); //Throttle and bind scroll action
	}
	componentWillMount(){
		//Initialize data
		this.init(this.props);
	}

	componentWillReceiveProps(newp){
		//User can add reload or condition parameter to reload the component
		if((this.props.reload&&newp.reload&&newp.reload!=this.props.reload)||(JSON.stringify(this.props.condition)!=JSON.stringify(newp.condition))){
			this.init(newp);	
		}		
	}
	init(props){
		window.scroll(0, 0);
		//First data search with a function that replace the result state thanks to initFnt 
		//and initial configuration of page state 
		this.props.changePage({page:0});
		this.props.initFnt(props.condition,{sort:{created_at:-1},skip:((0)*this.props.nbpp),limit:this.props.nbpp},(nv_elts)=>{
			this.props.changePage({page:1});
			this.props.countFnt(props.condition,()=>{	
				//If screen not full call scroll function
				if(this.props.fnt){this.props.fnt(nv_elts);}
				this.scroll(props);
			});
		});
	}
	componentDidMount() {
		document.addEventListener('scroll', this.scroll);
	}

	componentWillUnmount() {
		document.removeEventListener('scroll', this.scroll);
	}
	//==============CONTROLE====================
	scroll(props){
		//as long as scroll will be near of scroll capacitiy (98%) 
		//Get elements and add to results thanks to addFnt, pilote changing pages in the same time
		if(
			((window.scrollY >= (document.documentElement.scrollHeight - document.documentElement.clientHeight)*0.95)||
			(document.documentElement.scrollHeight - document.documentElement.clientHeight)==0)&&
			(this.props.nb_total!=undefined?this.props.nb_total==0?false:(this.props.nb_charge < this.props.nb_total):true)
		){
			this.props.addFnt(this.props.condition,{sort:{created_at:-1},skip:((this.props.page?this.props.page:1)*this.props.nbpp),limit:this.props.nbpp},(nv_elts)=>{
				if(this.props.fnt){this.props.fnt(nv_elts);}
				this.props.changePage({page:this.props.page?this.props.page+1:1});
				this.scroll(props);
			});
				
			

		}
	}
	//========================Preparation du rendu========================
	
	render(){
		return (
			<div style = {{
				display: 'flex',
				flexDirection: 'column',
				flex:'0 0 auto'}}>
			<div style={{flex:'1 1 auto',overflow:'scroll'}}>
			{this.props.children}
			</div>
			</div>
		);
	}
}

