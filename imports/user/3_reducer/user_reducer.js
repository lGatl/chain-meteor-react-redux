import { CONSTANTS } from '../../6_actions/actions';

const DEFAULTS = {
	active_user:null,
	all:[],
	one:{}
};
export const REDUCER_users_add = ( state , action ) =>{
	switch ( action.type ) {
	case CONSTANTS['Users'].GET_ACTIVE_USER:
		return { ...state, active_user: action.payload  };
	case CONSTANTS['Users'].LOG_IN:
		return { ...state};
	case CONSTANTS['Users'].LOG_OUT:
		return { ...state, active_user: null  };
	}
	return {...DEFAULTS, ...state};
};
