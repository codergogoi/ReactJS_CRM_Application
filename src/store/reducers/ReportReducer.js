import Actions from '../actions/Actions';

const initialState = {
	reports: [],
	ratio: [],
	task: [],
	isAdded: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case Actions.VIEW:
			return {
				...state,
				reports: action.payload
			};
		 
		case Actions.DELETE:
			return {
				...state,
				reports: action.payload
			};
		case Actions.ADD:
			return {
				...state,
				isAdded: true
			};
		case Actions.EDIT:
			return {
				...state,
				reports: action.payload
			};
		case Actions.VIEW_PROGRESS_RATIO:
			return {
				...state,
				ratio: action.payload.ratio,
				task: action.payload.task
			}
		case Actions.DISMISS:
			return {
				...state,
				isAdded: false
			}
		default:
			return state;
	}
}
