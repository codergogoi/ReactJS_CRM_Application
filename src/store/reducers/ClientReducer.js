import Actions from '../actions/Actions';

const initialState = {
	clients: [],
	regions: [],
	new_clients: [],
	isAdded: false,
};

export default function(state = initialState, action) {
	switch (action.type) {
		case Actions.VIEW:
			return {
				...state,
				clients: action.payload
			};
		case Actions.VIEW_NEW_CLIENTS:
			return {
				...state,
				new_clients: action.payload
			};		
		case Actions.DELETE:
			return {
				...state,
				clients: action.payload
			}
		case Actions.DISMISS:
			return {
				...state,
				isAdded: false
			}
		case Actions.VIEW_CLIENT_REGIONS:
			return {
				...state,
				regions: action.payload
			}	
		case Actions.ADD_CLIENT:
			return {
				...state,
				regions: action.payload,
				isAdded: true
			}
		default:
			return state;
	}
}
