import React, {Component} from 'react';

import { bindActionCreators }	from 'redux';
import { connect } from 'react-redux';

import { ACTIONS } from '../6_actions/actions';
import { dateToFormat } from '../8_libs/date';

import { Input, Button, Form } from 'gat-ui-react';

import InfiniteScroll from '../_common/5_smartComponent/InfiniteScroll';

class InfiniteScrollPage extends Component {

	componentWillMount(){
		let { setControle, activeMenu } = this.props;
		//Witch title has to be display
		setControle({title_page:'Infinite scroll'});
		//Wicth item in the SmartMenu has to be active
		activeMenu('Infinite scroll');
	}
	//ACTIONS
	//Controle Input using controle action of test collection
	change(e,{ value, name}){
		let { testControle } = this.props;
		testControle({ [name]:value });
	}
	//Interaction  with database
	testAddAction(e){
		e?e.preventDefault():'';
		let { testAdd } = this.props;
		let { test_controle } = this.props;
		//add element in test collection using add
		if(test_controle&&test_controle.title&&test_controle.title.length>0){
			testAdd({title: test_controle.title, created_at: Date.now()});
		}else{
			//Trigger alert thanks to Bert meteor package
			Bert.alert({
				title:'Error data for adding a test',
				message:'give at least a title' ,
				type:'info',
				icon:'fa-info'
			});
		}
	}
	testAdd100Action(){
		let { testAdd } = this.props;
		//100 insertion and reload at the end to show infinite scroll
			for(var i=0;i<100;i++){
				testAdd({title: i, created_at: Date.now()+i},()=>{
					if(i>99){
						window.location.reload();
					}
				});
			}
	}
	testRmAction(){
		//Remove all elements of test collection
		let { testRmAll } = this.props;
				testRmAll();
	}
	render(){
		let { title } = this.props.test_controle;
		let { tests } = this.props;
		let nbpp = 5;
		return (
			
			<div style={{marginTop:0,display:'flex'}}>
				<div style={{flex:8}}>
					<Form onSubmit={this.testAddAction.bind( this )}>
						{/*controle input with title value & precise default because 
						this.props.test_controle.title has just been create here. */}
						<Input
							label = 'Title'
							name = 'title'
							placeholder='choose a title'
							value = { title || '' }
							onChange = { this.change.bind( this ) }
						/>
					</Form>
					<Button
						onClick = { this.testAddAction.bind( this ) }
					>
						Add test
					</Button>
					<Button
						onClick = { this.testAdd100Action.bind( this ) }
					>
						Generate 100 tests and reload
					</Button>
					<Button
						onClick = { this.testRmAction.bind( this ) }
					>
						Remove all
					</Button>
					<span style={{marginLeft:20}}>
						number of Pages loaded = {this.props.page?this.props.page:0} of {nbpp} éléments
					</span>
					{/*This component help to create a Infinite scroll*/}
					{/* see http:///lGatl/chain-meteor-react-redux/InfiniteScroll for more details
						Concerning elements to get progressively
						Parameters:
						- nbpp : integer - number of load elements a the same time
						- nb_charge : integer - number of loaded elements 
						- countFnt : function - function that return the number total of elements
						- initFnt : function - the first get of elements that replaces elements in existing state
						- addFnt : function - the next get of elements that add new elements to state
						- changePage: function - simple to controle page change
						- page: object - infiniteScroll will use changePage to put the number of the current page in prop page

					*/}
					<InfiniteScroll 
						nbpp = {nbpp}
						nb_charge={this.props.tests.length}
						nb_total={this.props.nb_tests}
						initFnt = {this.props.testGetSSL.bind(this)}
						addFnt = {this.props.testGetAddSSL.bind(this)}
						countFnt = {this.props.testCount.bind(this)}
						changePage = { this.props.setControle.bind(this)}
						page = {this.props.page}
					/>
						
						{
							tests.map((test,i)=>{
								let {title} = test;
								return <div style={{
									border:'solid 1px black', 
									height:100,
									textAlign: 'center',
									fontSize:50
								}} key={i}>{title}</div>;
							})
						}
				
				</div>
			</div>
		);
	}
}

function mapStateToProps( state ){
	return (
		{
			active_user: state.users.active_user,
			active_menu: state.menu.active_menu,
			tests: state.test.all,
			nb_tests: state.test.count,
			test_controle: state.test.controle,
			page: state.controle.page,

		}
	);

}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		setControle: ACTIONS.Controle.set,
		activeMenu: ACTIONS.Menu.activeMenu,
	
		testAdd: ACTIONS.Test.add,
		testGetSSL: ACTIONS.Test.get_SSL,
		testGetAddSSL: ACTIONS.Test.getAdd_SSL,
		testCount: ACTIONS.Test.count,
		testRmAll: ACTIONS.Test.rmAll,

		testControle: ACTIONS.Test.controle,
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( InfiniteScrollPage );
