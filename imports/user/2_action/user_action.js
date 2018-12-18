import {
	Accounts
} from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

//Export constant, types of actions
export const CONSTANT_Users = { 
	CREE_COMPTE: 'User_CREE_COMPTE',
	GET_ACTIVE_USER: 'User_GET_ACTIVE_USER',
	LOG_IN: 'Users_LOG_IN',
	LOG_OUT: 'Users_LOG_OUT'
};

//Meteor Methods for account system have to be called by client
//We prepare actions with them

	/*
	 *Create Account
	 *second parameter: user - object of user to add
	 *payload.val: user coming from parameters
	*/
function creeCompte(user, cbk = ()=>{}){
	let p = new Promise( ( resolve, reject ) =>{
		Accounts.createUser(user, (err)=>{
			if(err){ console.log(err); }else{
				cbk();
				resolve(user);
			}
		});
	});
	return {
		type: 		CONSTANT_Users.CREE_COMPTE,
		payload: 	p
	};
}
	/*
	 *Login
	 *first parameter: user - string - username of the user
	 *second parameter: user - string - password of the user
	*/
function logIn(user, password, cbk = ()=>{}){
	let p = new Promise( ( resolve, reject ) =>{
		Meteor.loginWithPassword(user, password, (err,res)=>{
			if(err){ console.log(err); }else{
				cbk();
				resolve();
			}
		});
	});
	return {
		type: 		CONSTANT_Users.LOG_IN,
		payload: 	p
	};
}
	/*
	 *LogOut
	 * reducer put null in active_user
	*/
function logOut( cbk = ()=>{}){
	let p = new Promise( ( resolve, reject ) =>{
		Meteor.logout( (err)=>{
			if(err){ console.log(err); }else{
				cbk();
				resolve();
			}
		});
	});
	return {
		type: 		CONSTANT_Users.LOG_OUT,
		payload: 	p
	};
}
	/*
	 *Get the user connected here
	 *payload.val: object - user connected => user put in active_user
	*/
export function getActiveUser( cbk = ()=>{} ){ 
	let p = new Promise( ( resolve, reject ) => {
		Meteor.call(
			'get1Users', Meteor.userId(), 
			( err, res ) => {
				if ( err ) {
					console.log(err);
					reject( null );
				}else{
					// console.log(res);
					cbk(res);
					resolve( res );
				}
			}
		);
	});
	return {
		type: CONSTANT_Users.GET_ACTIVE_USER,
		payload: 	p
	};
}
//Export Actions
export const ACTION_Users = { 
	creeCompte,
	logIn,
	logOut,
	getActiveUser
};
