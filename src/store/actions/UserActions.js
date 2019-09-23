import Actions from './Actions';
import { BASE_URL } from './AppConst';
import axios from 'axios';

export const DoLogin = (postData) => (dispatch) => {

	axios.defaults.baseURL = BASE_URL;
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
	axios
		.post('/portal', {
			action: 'login',
			email: postData.email,
			password: postData.password
		})
		.then((res) =>{

				const status = parseInt(res.data.status);
				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let user = responseString.data;
					localStorage.setItem('app_token', user.token);
					localStorage.setItem('current_user', JSON.stringify(user));
					localStorage.setItem('currency', user.currency);
					dispatch({
						type: Actions.LOGIN,
						payload: user
					})

				}else{
					dispatch({
						type: Actions.LOGIN,
						payload: []
					})
				}

			}
		)
		.catch((error) => console.log(' Error Encountered'));
};

export const ViewUsers = (postData) => (dispatch) => {
	

	axios.defaults.baseURL = BASE_URL;
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
	axios
		.post('', {
			action: 'view-users'
		})
		.then((res) =>{
			const status = parseInt(res.data.status);
				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let users = responseString.data;
					dispatch({
						type: Actions.VIEW,
						payload: users
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




export const ViewEmployee = (postData) => (dispatch) => {
	

	axios.defaults.baseURL = BASE_URL;
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
	axios
		.post('/user', {
			action: 'employee'
		})
		.then((res) =>{
			const status = parseInt(res.data.status);
				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let users = responseString.data;
					dispatch({
						type: Actions.VIEW,
						payload: users
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


export const DoLogout = () => (dispatch) => {
	dispatch({
		type: Actions.LOGOUT
	});
};


export const NewUser = (postData) => (dispatch) => {

	const  { email,password, isAdmin, currency } = postData;

	axios.defaults.baseURL = BASE_URL;
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
	axios
		.post('', {
			action: 'add-new-user',
			email: email,
			password: password,
			type: isAdmin,
			currency: localStorage.getItem('currency')
		})
		.then((res) =>
			{
				const status = parseInt(res.data.status);
				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let users = responseString.data;
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
		)
		.catch((error) => console.log(' Error Encountered'));
}

export const RemoveUser = (postData) => (dispatch) => {

	const { email } = postData;

	axios.defaults.baseURL = BASE_URL;
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
	axios
		.post('', {
			action: 'remove-user',
			email: email
		})
		.then((res) =>{

				const status = parseInt(res.data.status);

				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let users = responseString.data;
					dispatch({
						type: Actions.VIEW,
						payload: users
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

	export const DismissAlert = () => (dispatch) => {

		dispatch({
			type: Actions.DISMISS
		});
	}
