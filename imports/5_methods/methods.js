import SimpleSchema from 'simpl-schema';
export const COLLECTIONS = ['Users','Test'];
//You can attached Schema to collection using simpl-schema
const SCHEMA = {
	//COLLECTION: new SimpleSchema({})
	Test: new SimpleSchema({
		title: { type: String },
		created_at: { type: Date }
	})
};
//CMRR declare set of methods for each collection by maping COLLECTIONS constant
var BD = {};
COLLECTIONS.forEach((COLLECTION) =>{
	COLLECTION.toLowerCase() == 'users' ? BD[COLLECTION] = Meteor[COLLECTION.toLowerCase()] : BD[COLLECTION] = new Mongo.Collection(COLLECTION.toLowerCase());
		
	Meteor.methods({
		[ 'add' + COLLECTION ]:(obj)=>{ 
			return BD[COLLECTION].insert({created_at: Date.now(),...obj}); // return id of new object
		},
		[ 'get' + COLLECTION ]:(obj={},ssl)=>{
			ssl = typeof (ssl) == 'object' && ssl !=null && Object.keys(ssl).length > 0 ?ssl:false;
			if(ssl){
				return BD[COLLECTION].find(obj, ssl).fetch();
			}else{
				return BD[COLLECTION].find(obj).fetch();
			}
		// return array of found objects
		},
		[ 'get1' + COLLECTION ]: (obj)=>{

			return BD[COLLECTION].findOne(obj); // return found object
		},
		[ 'count' + COLLECTION ]:(obj)=>{
			return BD[COLLECTION].find(obj).count(); // return number of total found elements
		},
		[ 'rm' + COLLECTION ]:(obj)=>{
			return BD[COLLECTION].remove(obj); // return number of return elements
		},
		[ 'up' + COLLECTION ]:(reco,modif)=>{		
			let succed = BD[COLLECTION].update(reco,{$set:modif}); 
			return succed == 1 ? BD[COLLECTION].findOne(reco)._id:null;//return id of updated object
		},
		[ 'upm' + COLLECTION ]:(reco,modif)=>{
			let succed = BD[COLLECTION].update(reco,{$set:modif},{multi:true});
			return succed != 0 ? BD[COLLECTION].find(reco).fetch().reduce((total,upd)=>[...total,upd._id],[]):[]; //return array of updating object
		},
		[ 'ups'+COLLECTION ]:(obj)=>{		
			return BD[COLLECTION].upsert(obj); //return id of upserted object
		},
	});
	//Attach Schemas
	SCHEMA[COLLECTION]?BD[COLLECTION].attachSchema(SCHEMA[COLLECTION]):'';

});
export {BD};
