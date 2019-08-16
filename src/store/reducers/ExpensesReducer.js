import Actions from '../actions/Actions';

const initialState = {
	expenses: [],
	isAdded: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case Actions.VIEW:
			return {
				...state,
				expenses: action.payload
			};
		case Actions.DELETE:
			return {
				...state,
				expenses: action.payload
			};
		case Actions.APPROVE_EXPENSE:
			return {
				...state,
				isAdded: true
			};
		case Actions.EDIT:
			return {
				...state,
				expenses: action.payload
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
