import Actions from '../actions/Actions';

const initialState = {
	employees: [],
	attributes: [],
	isAdded: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case Actions.VIEW:
			return {
				...state,
				employees: action.payload
			};
		case Actions.GET_ATTRIBUTES:
			return {
				...state,
				attributes: action.payload
			};		
		case Actions.ADD:
			return {
				...state,
				attributes: action.payload,
				isAdded: true,
			}
		case Actions.DISMISS:
			return {
				...state,
				isAdded: false
			}
		case Actions.DELETE:
			return {
				...state,
				employees: action.payload
			}

		default:
			return state;
	}
}
