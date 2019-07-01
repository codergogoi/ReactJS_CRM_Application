import Actions from './Actions';
import { BASE_URL } from './AppConst';
import axios from 'axios';


export const GetClients = (postData) => (dispatch) => {
	axios.defaults.baseURL = BASE_URL;
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
	axios
		.post('/client/view-all', {
		})
		.then((res) =>
			{
				const status = parseInt(res.data.status);
				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let clients = responseString.data;
					dispatch({
						type: Actions.VIEW,
						payload: clients
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



export const GetRegions = (postData) => (dispatch) => {
	axios.defaults.baseURL = BASE_URL;
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
	axios
		.post('/client/view-regions', {
		})
		.then((res) =>
			{
				const status = parseInt(res.data.status);
				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let regions = responseString.data;
					dispatch({
						type: Actions.VIEW_CLIENT_REGIONS,
						payload: regions
					})
				}else{
					dispatch({
						type: Actions.VIEW_CLIENT_REGIONS,
						payload: []
					})
				}
			}
		)
		.catch((error) => console.log(' Error Encountered'));
};


export const NewClient = (postData) => (dispatch) => {

	const { client_name, region,title, first_name, middle_name, last_name, address, area, city, state, country, pin, mobile, email } = postData;

	axios.defaults.baseURL = BASE_URL;
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
	axios
		.post('/client/add', {
			client_name: client_name,
			region: region,
			title: title,
			first_name: first_name,
			middle_name: middle_name,
			last_name: last_name,
			address: address,
			area: area,
			city: city,
			state: state,
			country: country,
			pin: pin,
			mobile: mobile,
			email: email
		})
		.then((res) =>
			{
				const status = parseInt(res.data.status);
				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let regions = responseString.data;
					dispatch({
						type: Actions.ADD_CLIENT,
						payload: regions
					})
				}else{
					dispatch({
						type: Actions.ADD_CLIENT,
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



export const RemoveRoutes = (postData) => (dispatch) => {

	const { id } = postData;
	axios.defaults.baseURL = BASE_URL;
	axios.defaults.headers.post['Content-Type'] = 'application/json';
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
	axios
		.post('', {
			action: 'remove-payment-mode',
			id: id,
			currency: localStorage.getItem('currency')
		})
		.then((res) => {
			
			const status = parseInt(res.data.status);

			if (status === 200) {
				const responseString = JSON.parse(JSON.stringify(res.data));
				let payments = responseString.data;

				dispatch({
					type: Actions.VIEW,
					payload: payments
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

export const NewRoute = (postData) => (dispatch) => {

		const { mode_name, type_name, ios, android, msite } = postData;

		axios.defaults.baseURL = BASE_URL;
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
		axios
			.post('', {
				action: 'add-payment-mode',
				mode: mode_name,
				type: type_name,
				ios: ios,
				android: android,
				msite: msite,
				currency: localStorage.getItem('currency')
			})
			.then((res) => 
				{
					const status = parseInt(res.data.status);
					if (status === 200) {
						const responseString = JSON.parse(JSON.stringify(res.data));
						let payments = responseString.data;
						dispatch({
							type: Actions.ADD,
						})
					}else{
						dispatch({
							type: Actions.VIEW,
							payload: []
						})
					}
				}	
			);
		
		
	}


export const UpdateRouting = (postData) => (dispatch) => {
	const { id, ios, android, msite } = postData;

	axios.defaults.baseURL = BASE_URL;
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
	axios
		.post('', {
			action: 'update-payment-mode',
			id: id,
			ios: ios,
			android: android,
			msite: msite,
			currency: localStorage.getItem('currency')
		})
		.then((res) =>
			dispatch({
				type: Actions.GETROUTING,
				payload: res
			})
		)
		.catch((error) => console.log(' Error Encountered'));
};
