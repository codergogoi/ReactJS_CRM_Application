import Actions from '../actions/Actions';

const initialState = {
	country_fields: [],
	airlines_fields: [],
	isAdded: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case Actions.VIEW_BY_AIRLINES:
			return {
				...state,
				airlines_fields: action.payload
			};
		case Actions.VIEW_BY_COUNTRY:
			return {
				...state,
				country_fields: action.payload
			};
		case Actions.DELETE:
			return {
				...state,
				fields: action.payload
			};
		case Actions.ADD:
			return {
				...state,
				isAdded: true
			};
		case Actions.EDIT:
			return {
				...state,
				fields: action.payload
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
