import Actions from '../actions/Actions';

const initialState = {
	promocodes: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case Actions.GETPROMO:
			return {
				...state,
				promocodes: action.payload
			};
		case Actions.FETCHING:
			return initialState;
		default:
			return state;
	}
}
