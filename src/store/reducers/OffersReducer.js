import Actions from '../actions/Actions';

const initialState = {
	offers: [],
	isAdded: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case Actions.VIEW:
			return {
				...state,
				offers: action.payload
			};
		case Actions.DELETE:
			return {
				...state,
				offers: action.payload
			};
		case Actions.ADD:
			return {
				...state,
				isAdded: true
			};
		case Actions.EDIT:
			return {
				...state,
				offers: action.payload
			};
		case Actions.DISMISS:
			return {
				...state,
				isAdded: false
			}
		default:
			return state;
	}
}
