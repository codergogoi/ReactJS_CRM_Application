import Actions from './Actions';
import { BASE_URL } from './AppConst';
import axios from 'axios';

export const GetPromos = (postData) => (dispatch) => {
	axios.defaults.baseURL = BASE_URL;
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
	axios
		.post('', {
			action: 'view-promo'
		})
		.then((res) =>
			dispatch({
				type: Actions.GETPROMO,
				payload: res
			})
		)
		.catch((error) => console.log(' Error Encountered'));
};

export const AddPromo = (postData) => (dispatch) => {
	dispatch({
		type: Actions.FETCHING
	});

	axios.defaults.baseURL = BASE_URL;
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
	axios
		.post('', {
			action: 'add-promo',
			promo: postData
		})
		.then((res) =>
			dispatch({
				type: Actions.GETPROMO,
				payload: res
			})
		)
		.catch((error) => console.log(' Error Encountered'));
};
