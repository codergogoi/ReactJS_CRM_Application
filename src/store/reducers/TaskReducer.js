import Actions from '../actions/Actions';

const initialState = {
	tasks: [],
	utilities: [],
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
		case Actions.ADD_TASK:
			return {
				...state,
				isAdded: true,
				utilities: action.payload
			}

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
		default:
			return state;
	}
}
