
import { combineReducers } from 'redux';

import { REDUCERS } from './reducer';
import  MenuREDUCER from './menu_reducer';
import  ControleREDUCER from './controle_reducer';
import  ErrorREDUCER from './error_reducer';

//Join ALL Reducers
const ROOT_REDUCER = combineReducers({
	...REDUCERS,

	menu: MenuREDUCER,
	controle: ControleREDUCER,
	error: ErrorREDUCER
});
export default ROOT_REDUCER;
