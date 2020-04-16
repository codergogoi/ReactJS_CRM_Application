import Actions from '../actions/Actions';

const initialState = {
	regions: [],
	designations: [],
	policies: [],
	managers: [],
	isExported: false,
};

export default function(state = initialState, action) {
	switch (action.type) {

		case Actions.VIEW_REGIONS:
			return {
				...state,
				regions: action.payload
			};
		case Actions.EXPORT_DB:
			return {
				...state,
				isExported: true
			};	
		case Actions.VIEW_MANAGERS:
			return {
				...state,
				managers: action.payload
			};	
		case Actions.ADD_REGION_MANAGER:
			return {
				...state,
				isAdded: true,
			}	
		case Actions.DELETE_REGION:
			return {
				...state,
				regions: action.payload
			}			
		case Actions.VIEW_DESIGNATIONS:
				return {
					...state,
					designations: action.payload
				};
		case Actions.ADD_DESIGNATION:
			return {
				...state,
				isAdded: true,
				policies: action.payload
			}	
		case Actions.DELETE_DESIGNATION:
			return {
				...state,
				designations: action.payload
			}			
		case Actions.VIEW_POLICY:
				return {
					...state,
					policies: action.payload
				};
		case Actions.ADD_POLICY:
			return {
				...state,
				isAdded: true,
			}	
		case Actions.DELETE_POLICY:
			return {
				...state,
				policies: action.payload
			}	
		
		case Actions.DISMISS:
			return {
				isAdded: false,
				exported: false
			}
				
		default:
			return state;
	}
}
