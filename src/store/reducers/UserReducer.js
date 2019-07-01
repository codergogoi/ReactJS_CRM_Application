import Actions from '../actions/Actions';

const initialState = {
	users: [],
	isAdded: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case Actions.LOGIN:
			return {
				...state,
				users: action.payload
			};
		
		case Actions.VIEW:
			return {
				...state,
				users: action.payload
			};
		case Actions.ADD:
			return {
				...state,
				isAdded: true,
				users: action.payload
			}
		case Actions.DISMISS:
			return {
				isAdded: false
			}
		case Actions.DELETE:
			return {
				...state,
				users: action.payload
			}	
		case Actions.FETCHING:
			return initialState;
		case Actions.LOGOUT:
			return initialState;
		default:
			return state;
	}
}
