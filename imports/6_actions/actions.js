import { COLLECTIONS } from '../5_methods/methods';

//Import additionals Constant and actions 
import { CONSTANT_Users, ACTION_Users } from '../user/2_action/user_action';
import { CONSTANT_Menu, ACTION_Menu } from './menu_action';
import { CONSTANT_Controle, ACTION_Controle } from './controle_action';

//Initialisation of Objects
const CONSTANT = {Error:{ERROR_ARGUMENT : 'ERROR_ARGUMENT'}};
const ACTION = {};

//CMRR declare set of actinos for each collection by maping COLLECTIONS constant
//Constant for action types are create as well.
COLLECTIONS.forEach((COLLECTION)=>{

	CONSTANT[ COLLECTION ] ={ 
		ADD : COLLECTION+'_ADD',
		GET : COLLECTION+'_GET',
		GETADD : COLLECTION+'_GETADD',
		GET1 : COLLECTION+ '_GET1',
		COUNT : COLLECTION+'_COUNT',
		RM : COLLECTION+'_RM',
		RM_ALL : COLLECTION+'_RM_ALL',
		UP : COLLECTION+'_UP',
		UPM : COLLECTION+'_UPM',
		UPS : COLLECTION+'_UPS',
		CONTROLE : COLLECTION+'_CONTROLE',

	};
	/*For each Action :
	 *With _cstate suffix: cstate parameter into payload.cstate: string or object - to presize where store in cstate
	 *With _SSL suffix: ssl parameter put in the Meteor Method to use sort skip & limit. Use like mongo. {sort:{created_at:-1},skip:10,limit:20}
	 *Last parameter is a callback witch return the same thing as payload.val
	*/
	
	/*
	 *Add new element
	 *first parameter: obj - object to add
	 *payload.val: object - new object with _id
	 */
	function add(obj, cbk=()=>{}){
		let p = new Promise( ( resolve, reject ) => {
			Meteor.call('add' + COLLECTION, obj ,(err,res)=>{
				if(err){
					reject(err);
				}else{
					cbk( res );
					resolve( { val:{ ...obj, _id:res }, cstate:null } );
				}
			});
		});
		return {
			type: CONSTANTS[ COLLECTION ].ADD,
			payload: 	p,
		};
	}
	function add_cstate(obj,cstate, cbk=()=>{}){
		let p = new Promise( ( resolve, reject ) => {
			Meteor.call('add' + COLLECTION, obj ,(err,res)=>{
				if(err){
					reject(err);
				}else{
					cbk( { ...obj, _id:res } );
					resolve( { val:{ ...obj, _id:res }, cstate } );
				}
			});
		});
		return {
			type: CONSTANTS[ COLLECTION ].ADD,
			payload: 	p,
		};
	}
	/*
	 *Get elements
	 *first parameter: obj - object to filter
	 *payload.val: array - found objects
	 */
	function get(obj = {}, cbk = ()=>{}){
		let p = new Promise( ( resolve, reject ) =>{
			Meteor.call('get' + COLLECTION,obj,null,(err,res)=>{
				if(err){
					//console.log(err)
					reject( err );
				}else{
					//console.log(res)
					cbk( res );
					
					resolve( { val:res, cstate:null} );
				}
			});
		});
		return {
			type: CONSTANTS[ COLLECTION ].GET,
			payload: 	p,
		};
	}
	function get_SSL(obj = {}, ssl = null, cbk = ()=>{}){
		let p = new Promise( ( resolve, reject ) =>{
			Meteor.call('get' + COLLECTION,obj,ssl,(err,res)=>{
				if(err){
					//console.log(err)
					reject( err );
				}else{
					cbk( res );
					
					resolve( { val:res, cstate:null} );
				}
			});
		});
		return {
			type: CONSTANTS[ COLLECTION ].GET,
			payload: 	p,
		};
	}
	function get_cstate(obj = {}, cstate =  null, cbk = ()=>{}){
		let p = new Promise( ( resolve, reject ) =>{
			Meteor.call('get' + COLLECTION,obj,null,(err,res)=>{
				if(err){
					//console.log(err)
					reject( err );
				}else{
					//console.log(res)
					cbk( res );
					
					resolve( { val:res, cstate} );
				}
			});
		});
		return {
			type: CONSTANTS[ COLLECTION ].GET,
			payload: 	p,
		};
	}
	function get_SSL_cstate(obj = {}, ssl = null, cstate =  null, cbk = ()=>{}){
		let p = new Promise( ( resolve, reject ) =>{
			Meteor.call('get' + COLLECTION,obj,ssl,(err,res)=>{
				if(err){
					//console.log(err)
					reject( err );
				}else{
					//console.log(res)
					cbk( res );
					
					resolve( { val:res, cstate} );
				}
			});
		});
		return {
			type: CONSTANTS[ COLLECTION ].GET,
			payload: 	p,
		};
	}
	function get_cstate_SSL(obj = {}, cstate =  null, ssl = null, cbk = ()=>{}){
		let p = new Promise( ( resolve, reject ) =>{
			Meteor.call('get' + COLLECTION,obj,ssl,(err,res)=>{
				if(err){
					//console.log(err)
					reject( err );
				}else{
					//console.log(res)
					cbk( res );
					
					resolve( { val:res, cstate} );
				}
			});
		});
		return {
			type: CONSTANTS[ COLLECTION ].GET,
			payload: 	p,
		};
	}
	//________________________________-
	/*
	 *Get elements But in the reducer, result will note replace the cstate, it will be add on the cstate
	 *first parameter: obj - object to filter
	 *payload.val: array - found objects
	 */
	function getAdd(obj = {}, cbk = ()=>{}){
		let p = new Promise( ( resolve, reject ) =>{
			Meteor.call('get' + COLLECTION,obj,null,(err,res)=>{
				if(err){
					//console.log(err)
					reject( err );
				}else{
					//console.log(res)
					cbk( res );
					
					resolve( { val:res, cstate:null} );
				}
			});
		});
		return {
			type: CONSTANTS[ COLLECTION ].GETADD,
			payload: 	p,
		};
	}
	function getAdd_SSL(obj = {}, ssl = null, cbk = ()=>{}){
		let p = new Promise( ( resolve, reject ) =>{
			Meteor.call('get' + COLLECTION,obj,ssl,(err,res)=>{
				if(err){
					//console.log(err)
					reject( err );
				}else{
					//console.log(res)
					cbk( res );
					
					resolve( { val:res, cstate:null} );
				}
			});
		});
		return {
			type: CONSTANTS[ COLLECTION ].GETADD,
			payload: 	p,
		};
	}
	function getAdd_cstate(obj = {}, cstate =  null, cbk = ()=>{}){
		let p = new Promise( ( resolve, reject ) =>{
			Meteor.call('get' + COLLECTION,obj,null,(err,res)=>{
				if(err){
					//console.log(err)
					reject( err );
				}else{
					//console.log(res)
					cbk( res );
					
					resolve( { val:res, cstate} );
				}
			});
		});
		return {
			type: CONSTANTS[ COLLECTION ].GETADD,
			payload: 	p,
		};
	}
	function getAdd_SSL_cstate(obj = {}, ssl = null, cstate =  null, cbk = ()=>{}){
		let p = new Promise( ( resolve, reject ) =>{
			Meteor.call('get' + COLLECTION,obj,ssl,(err,res)=>{
				if(err){
					//console.log(err)
					reject( err );
				}else{
					//console.log(res)
					cbk( res );
					
					resolve( { val:res, cstate} );
				}
			});
		});
		return {
			type: CONSTANTS[ COLLECTION ].GETADD,
			payload: 	p,
		};
	}
	function getAdd_cstate_SSL(obj = {}, cstate =  null, ssl = null, cbk = ()=>{}){
		let p = new Promise( ( resolve, reject ) =>{
			Meteor.call('get' + COLLECTION,obj,ssl,(err,res)=>{
				if(err){
					//console.log(err)
					reject( err );
				}else{
					//console.log(res)
					cbk( res );
					
					resolve( { val:res, cstate} );
				}
			});
		});
		return {
			type: CONSTANTS[ COLLECTION ].GETADD,
			payload: 	p,
		};
	}
	//_____________
	/*
	 *Get one element
	 *first parameter: obj - object to filter
	 *payload.val: object - found object
	 */

	function get1(obj, cbk = () => {}){
		let p = new Promise( ( resolve, reject ) => {
			Meteor.call('get1' + COLLECTION,obj,(err,res)=>{
				if(err){
					reject(err);
				}else{
					cbk( res );
					resolve( { val:res, cstate:null} );
				}
			});
		});
		return {
			type: CONSTANTS[ COLLECTION ].GET1,
			payload: 	p,
		};
	}
	function get1_cstate(obj, cstate, cbk = () => {}){
		let p = new Promise( ( resolve, reject ) => {
			Meteor.call('get1' + COLLECTION,obj,(err,res)=>{
				if(err){
					reject(err);
				}else{
					cbk( res );
					resolve( { val:res, cstate} );
				}
			});
		});
		return {
			type: CONSTANTS[ COLLECTION ].GET1,
			payload: 	p,
		};
	}
	/*
	 *Count elements respectiong filter
	 *first parameter: obj - object to filter
	 *payload.val: array - nb of found Objects
	 */
	function count(obj={}, cbk = ()=>{}){
		let p = new Promise( ( resolve, reject ) =>{
			Meteor.call('count' + COLLECTION,obj,(err,res)=>{
				if(err){
					//console.log(err)
					reject( err );
				}else{
					//console.log(res)
					cbk( res );
					
					resolve( { val:res, cstate:null} );
				}
			});
		});
		return {
			type: CONSTANTS[ COLLECTION ].COUNT,
			payload: 	p,
		};
	}
	function count_cstate(obj={}, cstate, cbk = ()=>{}){
		let p = new Promise( ( resolve, reject ) =>{
			Meteor.call('count' + COLLECTION,obj,(err,res)=>{
				if(err){
					//console.log(err)
					reject( err );
				}else{
					//console.log(res)
					cbk( res );
					
					resolve( { val:res, cstate} );
				}
			});
		});
		return {
			type: CONSTANTS[ COLLECTION ].COUNT,
			payload: 	p,
		};
	}
	/*
	 *Remove one element
	 *first parameter: obj - object to find element to remove (must be {_id:}) else dispatch to an ERROR reducer
	 *payload.val: object - object to find element to remove
	 */
	function rm(obj, cbk = ()=>{}){
		obj = typeof obj == 'object' && Object.keys(obj).length>0 && Object.keys(obj)[0]=='_id'?obj:false;
		if(obj){
			let p = new Promise( ( resolve, reject ) => {
				Meteor.call('rm' + COLLECTION, obj ,(err)=>{
					if(err){
						reject(err);
					}else{
						cbk(obj);
						resolve( { val:obj, cstate:null} );
					}
				});
			});
			return {
				type: CONSTANTS[ COLLECTION ].RM,
				payload: 	p,
			};
		}else{
			return {
				type: CONSTANTS.Error.ERROR_ARGUMENT,
				payload:{
					action_type:CONSTANTS[ COLLECTION ].RM,
					action:'RM'
				}
			};
		}
		
	}
	function rm_cstate(obj, cstate, cbk = ()=>{}){
		obj = typeof obj == 'object' && Object.keys(obj).length>0 && Object.keys(obj)[0]=='_id'?obj:false;
		if(obj){
			let p = new Promise( ( resolve, reject ) => {
				Meteor.call('rm' + COLLECTION, obj ,(err,res)=>{
					if(err){
						reject(err);
					}else{
						cbk(obj);
						resolve( { val:obj, cstate:null} );
					}
				});
			});
			return {
				type: CONSTANTS[ COLLECTION ].RM,
				payload: 	p,
			};
		}else{
			return {
				type: CONSTANTS.Error.ERROR_ARGUMENT,
				payload:{
					action_type:CONSTANTS[ COLLECTION ].RM,
					action:'RM'
				}
			};
		}
	}
	/*
	 *Remove All elements of collection
	 *first parameter: obj - object to find element to remove (must be {_id:}) else dispatch to an ERROR reducer
	 *payload.val: object - object to find element to remove
	 */
		function rmAll( cbk = ()=>{}){
		let p = new Promise( ( resolve, reject ) => {
			Meteor.call('rm' + COLLECTION, {} ,(err,res)=>{
				if(err){
					reject(err);
				}else{
					cbk();
					resolve( { cstate:null} );
				}
			});
		});
		return {
			type: CONSTANTS[ COLLECTION ].RM_ALL,
			payload: 	p,
		};
	}
	function rmAll_cstate( cstate, cbk = ()=>{}){
		let p = new Promise( ( resolve, reject ) => {
			Meteor.call('rm' + COLLECTION, {} ,(err,res)=>{
				if(err){
					reject(err);
				}else{
					cbk();
					resolve( { cstate } );
				}
			});
		});
		return {
			type: CONSTANTS[ COLLECTION ].RM_ALL,
			payload: 	p,
		};
	}
	/*
	 *Update element of collection
	 *first parameter: obj - object to find element to update
	 *second parameter: obj - update to apply at the found element
	 *payload.val: object -  update to apply at the found element with _id
	 */
	function up(reco,modif, cbk = ()=>{}){
		let p = new Promise( ( resolve, reject ) => {
			Meteor.call('up' + COLLECTION,reco,modif,(err,res)=>{
				if(err){
					reject(err);
				}else{

					cbk( {...modif,_id:res} );
					resolve( { val:{...modif,_id:res},cstate:null} );
				}
			});
		});
		return {
			type: CONSTANTS[ COLLECTION ].UP,
			payload: 	p,
		};
	}
	function up_cstate(reco,modif,cstate, cbk = ()=>{}){
		let p = new Promise( ( resolve, reject ) => {
			Meteor.call('up' + COLLECTION,reco,modif,(err,res)=>{
				if(err){
					reject(err);
				}else{

					cbk( {...modif,_id:res} );
					resolve( { val:{...modif,_id:res},cstate} );
				}
			});
		});
		return {
			type: CONSTANTS[ COLLECTION ].UP,
			payload: 	p,
		};
	}
	/* !!!!!!!DON'T USE FOR THE MOMENT!!!!!!!!
	 *Update elements of collection
	 *first parameter: obj - object to find elements to update
	 *second parameter: obj - update to apply at found elements
	 *payload.val: object -  update to apply at the found element with _id
	 */
	function upm(reco, modif, cbk = ()=>{}){
		let p = new Promise( ( resolve, reject ) => {
			Meteor.call('upm' + COLLECTION,reco,modif,(err,res)=>{
				if(err){
					reject(err);
				}else{
					cbk( {...modif,_id:res} );
					//console.log('res', res);
					resolve( { val:{...modif,_id:res}, cstate:null} );
				}
			});
		});
		return {
			type: CONSTANTS[ COLLECTION ].UPM,
			payload: 	p,
		};
	}
		/*!!!!!!!DON'T USE FOR THE MOMENT!!!!!!!!
	 *Upsert element of collection
	 *first parameter: obj - object to find element to upsert
	 *second parameter: obj - upsert to apply at the found element
	 *payload.val: object -  upsert to apply at the found element with _id
	 */
	function ups(obj, cbk = ()=>{}){
		let p = new Promise( ( resolve, reject ) => {
			Meteor.call('up' + COLLECTION,obj,(err,res)=>{
				if(err){
					reject(err);
				}else{
					cbk( res );
					resolve( { val:res, cstate:null} );
				}
			});
		});
		return {
			type: CONSTANTS[ COLLECTION ].UP,
			payload: 	p,
		};
	}
	//=========================================================
	function controle(val){
		return {
			type: CONSTANTS[ COLLECTION ].CONTROLE,
			payload: 	val
		};
	}
//Prepare ACTION object
	ACTION[COLLECTION] = {
		add,
		add_cstate,
		rm,
		rm_cstate,
		rmAll,
		rmAll_cstate,
		get,
		get_SSL,
		get_cstate,
		get_SSL_cstate,
		get_cstate_SSL,
		getAdd,
		getAdd_SSL,
		getAdd_cstate,
		getAdd_SSL_cstate,
		getAdd_cstate_SSL,
		get1,
		get1_cstate,
		count,
		count_cstate,
		up,
		up_cstate,
		//upm,
		//ups,	
		controle,
	};
});

//Add custom Actions from others files at ACTIONS
export const ACTIONS = { ...ACTION,
	Users:{ ...ACTION.Users, ...ACTION_Users },//Add custom actions at existing Users Actions
	Menu:{...ACTION_Menu},//Add custom actions out of existing Collection
	Controle:{...ACTION_Controle},//Add custom actions out of existing Collection
};
//Same processing for CONSTANTS
export const CONSTANTS = { ...CONSTANT, 
	Users:{ ...CONSTANT.Users, ...CONSTANT_Users },
	Menu:{...CONSTANT_Menu},
	Controle:{...CONSTANT_Controle},
};

