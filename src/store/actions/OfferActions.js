import Actions from './Actions';
import { BASE_URL } from './AppConst';
import axios from 'axios';

export const GetOffers = (postData) => (dispatch) => {
	axios.defaults.baseURL = BASE_URL;
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
	axios
		.post('', {
			action: 'view-offers',
			currency: localStorage.getItem('currency')
		})
		.then((res) =>{

				const status = parseInt(res.data.status);

				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let offers = responseString.data;
					console.log(JSON.stringify(offers));
					dispatch({
						type: Actions.VIEW,
						payload: offers
					})
				}else{
					dispatch({
						type: Actions.VIEW,
						payload: []
					})
				}
			}
			
		)
		.catch((error) => console.log(' Error Encountered'));
};

export const DismissAlert = () => (dispatch) => {
	dispatch({
		type: Actions.DISMISS
	});
}

export const NewOffers = (postData) => (dispatch) => {

	const  { offer_content,
		from_sector,
		to_sector,
		from_date,
		to_date,
		country,
		aui,
		airlines } = postData;

	axios.defaults.baseURL = BASE_URL;
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
	axios
		.post('', {
			action: 'add-offer',
			content: offer_content,
			from_sector: from_sector,
			to_sector: to_sector,
			from_date: from_date,
			to_date: to_date,
			country: localStorage.getItem('currency'),
			aui: aui,
			airlines: airlines
		})
		.then((res) =>
			{
				const status = parseInt(res.data.status);
				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let offers = responseString.data;
					dispatch({
						type: Actions.ADD,
						payload: offers
					})
				}else{
					dispatch({
						type: Actions.VIEW,
						payload: []
					})
				}
			}
		)
		.catch((error) => console.log(' Error Encountered'));
}

export const RemoveOffers = (postData) => (dispatch) => {

	const { id } = postData;

	axios.defaults.baseURL = BASE_URL;
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
	axios
		.post('', {
			action: 'remove-offer',
			id: id,
			currency: localStorage.getItem('currency')
		})
		.then((res) =>{

				const status = parseInt(res.data.status);

				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let offers = responseString.data;
					dispatch({
						type: Actions.VIEW,
						payload: offers
					})
				}else{
					dispatch({
						type: Actions.VIEW,
						payload: []
					})
				}
			}
			
		)
		.catch((error) => console.log(' Error Encountered'));

	}