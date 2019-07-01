import Actions from '../actions/Actions';

const initialState = {
    notifications: [],
    isAdded: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case Actions.VIEW:
			return {
				...state,
				notifications: action.payload
            };
        case Actions.EDIT:
            return {
                ...state,
                notifications: action.payload
            };
        case Actions.DELETE:
            return {
                ...state,
                notifications: action.payload
            }
        case Actions.ADD:
            return {
                ...state,
                notifications: action.payload,
                isAdded: true
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
