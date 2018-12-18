
import { CONSTANTS } from '../6_actions/actions';
import { COLLECTIONS } from '../5_methods/methods';

import { REDUCER_users_add } from '../user/3_reducer/user_reducer';

var REDUCER = {};
COLLECTIONS.forEach((COLLECTION)=>{
	const DEFAULTS = {
		all: [],
		one: {},
		controle:{}
		
	};
// Reducer for being reactive and to respect state option(suffixe state of actions)
	REDUCER[COLLECTION.toLowerCase()] = function (  state = DEFAULTS, action ) {
		var all = [ ...state.all ] ;
		var ALL;
		var up;
		let cstate = action.payload&&action.payload.cstate?action.payload.cstate:null;
		let val = action.payload&&action.payload.val?action.payload.val:false;
		switch ( action.type ) {	
		case  CONSTANTS[COLLECTION].ADD:
			//Add element in all (1 in count) or in custome state asked
			//if cstate is a string replace add by state[cstate]
			if(typeof cstate=='string'){
				return { ...state, [cstate]:[val,...state[cstate]]};
			//if cstate is a string replace add by state[cstate key][cstate value]
			}else if((typeof cstate=='object' ) && (cstate != null)){
				let obj = Object.keys(cstate)[0];
				return { ...state, [obj]:{...state[obj],[cstate[obj]]:[val,...state[cstate[obj]]]}};
			//if no cstate use add
			}else if(cstate == null||cstate == undefined){
				return { ...state, all: [val,...state.all],count:state.count+1 };
			}			
			break;
		case CONSTANTS[COLLECTION].GET:
			//Put found elements in all (nb in count) or in custome state asked
			if(typeof cstate=='string'){
				return { ...state, [cstate]:val};
			}else if((typeof cstate=='object' ) && (cstate != null)){
				let obj = Object.keys(cstate)[0];
				return { ...state, [obj]:{...state[obj],[cstate[obj]]:val}};
			}else if(cstate == null||cstate == undefined){
				return { ...state, all: val };
			}			
			break;
		case CONSTANTS[COLLECTION].GETADD:
		//Add found elements in all (nb in count) or in custome state asked
			if(typeof cstate=='string'){
				return { ...state, [cstate]:[...state[cstate],...val]};
			}else if((typeof cstate=='object' ) && (cstate != null)){
				let obj = Object.keys(cstate)[0];
				return { ...state, [obj]:{...state[obj],[cstate[obj]]:[...state[cstate[obj]],...val]}};
			}else if(cstate == null||cstate == undefined){
				return { ...state, all: [...all,...val] };
			}			
			break;
		case CONSTANTS[COLLECTION].GET1:
		//Add found element in one or in custome state asked
			if(typeof cstate=='string'){
				return { ...state, [cstate]:val};
			}else if((typeof cstate=='object') && (cstate != null)){
				let obj = Object.keys(cstate)[0];
				return { ...state, [obj]:{...state[obj],[cstate[obj]]:val}};
			}else if(cstate == null||cstate == undefined){
				return { ...state, one: val };
			}			
			break;
		case CONSTANTS[COLLECTION].COUNT:
		//Count found element put in count or in custome state asked
			if(typeof cstate=='string'){
				return { ...state, [cstate]:val};
			}else if((typeof cstate=='object') && (cstate != null)){
				let obj = Object.keys(cstate)[0];
				return { ...state, [obj]:{...state[obj],[cstate[obj]]:val}};
			}else if(cstate == null||cstate == undefined){
				return { ...state, count: val };
			}			
			break;
		case CONSTANTS[COLLECTION].RM:
			//Remove element from all or from custome state asked
			if(typeof cstate=='string'){
				all = [...state[cstate]];
				ALL = (typeof val._id)=='string'? all.reduce((total,al)=>al._id == val._id?total:[...total,al],[]):
					(typeof val._id)=='object'? all.reduce((total,al)=>val._id.$in.indexOf(al._id)>=0?total:[...total,al],[]):all;
				return { ...state, [cstate]:ALL};
			}else if((typeof cstate=='object' ) && (cstate != null)){
				let obj = Object.keys(cstate)[0];
				all = [...state[cstate][obj]];
				ALL = (typeof val._id)=='string'? all.reduce((total,al)=>al._id == val._id?total:[...total,al],[]):
					(typeof val._id)=='object'? all.reduce((total,al)=>val._id.$in.indexOf(al._id)>=0?total:[...total,al],[]):all;
				return { ...state, [obj]:{...state[obj],[cstate[obj]]:ALL}};
			}else if(cstate == null||cstate == undefined){

				ALL = (typeof val._id)=='string'? all.reduce((total,al)=>al._id == val._id?total:[...total,al],[]):
					(typeof val._id)=='object'? all.reduce((total,al)=>val._id.$in.indexOf(al._id)>=0?total:[...total,al],[]):all;
				return {...state, all:ALL, count: val-1};	
			}			
			break;
		case CONSTANTS[COLLECTION].RM_ALL:
		//Empty all or custome state asked
			if(typeof cstate=='string'){
				return { ...state, [cstate]:[]};
			}else if((typeof cstate=='object' ) && (cstate != null)){
				let obj = Object.keys(cstate)[0];
				return { ...state, [obj]:{...state[obj],[cstate[obj]]:[]}};
			}else if(cstate == null||cstate == undefined){
				return {...state, all:[]};	
			}			
			break;
		case CONSTANTS[COLLECTION].UP:
			//Update element in all or in custome state asked
			if(typeof cstate=='string'){
				all = [...state[cstate]];
				up = all.find(allu=>allu._id==val._id);
				all.splice(all.indexOf(up),1,{...up,...val});
				return { ...state, [cstate]:all};
			}else if((typeof cstate=='object' ) && (cstate != null)){
				let obj = Object.keys(cstate)[0];
				all = [...state[cstate][obj]];
				up = all.find(allu=>allu._id==val._id);
				all.splice(all.indexOf(up),1,{...up,...val});
				return { ...state, [obj]:{...state[obj],[cstate[obj]]:all}};
			}else if(cstate == null||cstate == undefined){
				up = all.find(allu=>allu._id==val._id);
				all.splice(all.indexOf(up),1,{...up,...val});
				return {...state, all, one:{...state.one,...val}};	
			}		
			break;		
		case CONSTANTS[COLLECTION].UPM:
		//@ A VERIFIER !!!!! 
			console.log('not tested with prop state');
			if(typeof cstate == 'string'){
				all = [...state[cstate]];
				return { ...state, [cstate]:all.reduce((total,upm)=>val._id.indexOf(upm._id)>=0?[...total,{...upm,...val,_id:upm._id}]:[...total,upm],[])};
			}else if((typeof cstate == 'object' ) && (cstate != null)){
				let obj = Object.keys(cstate)[0];
				all = [...state[cstate][obj]];
				return { ...state, [obj]:{...state[obj],[cstate[obj]]:all.reduce((total,upm)=>val._id.indexOf(upm._id)>=0?[...total,{...upm,...val,_id:upm._id}]:[...total,upm],[])}};
			}else if(cstate == null||cstate == undefined){
				return {...state, all:all.reduce((total,upm)=>val._id.indexOf(upm._id)>=0?[...total,{...upm,...val,_id:upm._id}]:[...total,upm],[])};	

			}			
			break;
		//@ UPSERT !!!!! 

			// You can use controle like a setState
		case CONSTANTS[COLLECTION].CONTROLE:
			return { ...state, controle:{...state.controle,...action.payload} };
		}
		//add custom Users reducers to existing Users reducers 
		return COLLECTION == 'Users' ?
			{...state, ...REDUCER_users_add(state, action) } : state;
	};
});

export const REDUCERS = REDUCER;

