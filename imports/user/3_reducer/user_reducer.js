import { CONSTANTS } from '../../6_actions/actions';

const DEFAULTS = {
	active_user:null,
	all:[],
	one:{}
};
export const REDUCER_users_add = ( state , action ) =>{
	var all = [ ...state.all ] ;
	let prestataire_index;
	let payeur_index;
	let one;
	let active_user;
	switch ( action.type ) {
	case CONSTANTS['Users'].GET_ACTIVE_USER:

		return { ...state, active_user: action.payload  };
	case CONSTANTS['Users'].LOG_IN:
		break;
	case CONSTANTS['Users'].LOG_OUT:
		return { ...state, active_user: null  };
	}
	return {...DEFAULTS, ...state};
};
