//Controle action to controle components without real link with collection

// Don't forget to export constant
export const CONSTANT_Controle = {
	CHANGE_PAGE: 'Controle_CHANGE_PAGE',
	SET: 'Controle_SET',
};
//Simple set function, to controle components like a setState
function set(val){
	return {
		type: 		CONSTANT_Controle.SET,
		payload: 	val
	};
}
//We can add Actions for example to regroupe elements of controle state or to organise controle state
//This action can also be used for Infinite scroll
function changePage(val){
	return {
		type: 		CONSTANT_Controle.CHANGE_PAGE,
		payload: 	val
	};
}
//export this, it will be import in ./action to be add in ACTIONS constant
export const ACTION_Controle = { 
	changePage,
	set
};
