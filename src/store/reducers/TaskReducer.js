import Actions from '../actions/Actions';

const initialState = {
	tasks: [],
	utilities: [],
	cities: [],
	locations: [],
	group_clients: [],
	groups: [],
};

export default function(state = initialState, action) {
	switch (action.type) {
		case Actions.VIEW:
			return {
				...state,
				tasks: action.payload
			};
		case Actions.VIEW_TASK_UtiLITY:
			return {
				...state,
				utilities: action.payload
			};
		case Actions.VIEW_CITY:
			return {
				...state,
				group_clients: null,
				cities: action.payload
			};	
		case Actions.VIEW_LOCATION:
			return {
				...state,
				locations: action.payload
			};			
		case Actions.ADD_TASK:
			return {
				...state,
				isAdded: true,
				utilities: action.payload
			}
		case Actions.VIEW_GROUP_TASK_CLIENTS:
			return {
				...state,
				group_clients: action.payload
			};
		case Actions.VIEW_ALL_GROUP_TASK:
			return {
				...state,
				groups: action.payload
			};				
		case Actions.ADD:
			return {
				...state,
				isAdded: true,
				tasks: action.payload
			}
		case Actions.DISMISS:
			return {
				...state,
				isAdded: false
			}
		case Actions.DELETE:
			return {
				...state,
				tasks: action.payload
			}
		case Actions.LOADING:
			return{
				...state,
				group_clients: [],

			}	
			
		default:
			return state;
	}
}
