import Actions from '../actions/Actions';

const initialState = {
	users: [],
	isAdded: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case Actions.VIEW_TRACKING:
			return {
				...state,
				users: action.payload
			};
		 ;
		case Actions.DISMISS:
			return {
				...state,
				isAdded: false
			}
		default:
			return state;
	}
}
