import Actions from '../actions/Actions';

const initialState = {
	users: [],
	details: [],
	isAdded: false,
	isFound: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case Actions.VIEW_TRACKING:
			return {
				...state,
				users: action.payload
			};
		 ;
		case Actions.VIEW_TRACK_DETAILS:
			return {
				...state,
				details: action.payload,
				isFound: true
			};
		 ; 
		case Actions.DISMISS:
			return {
				...state,
				isAdded: false,
				isFound: false
			}
		default:
			return state;
	}
}
