import Actions from './Actions';
import { BASE_URL } from './AppConst';
import axios from 'axios';

export const GetExpenses = (postData) => (dispatch) => {
	axios.defaults.baseURL = BASE_URL;
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
	axios
		.post('/expenses/view', {
		})
		.then((res) =>{

				const status = parseInt(res.data.status);
				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let expenses = responseString.data;
					dispatch({
						type: Actions.VIEW,
						payload: expenses
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

export const NewExpenses = (postData) => (dispatch) => {

	const  { offer_content,
		offer_type,
		promo,
		country } = postData;

	axios.defaults.baseURL = BASE_URL;
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
	axios
		.post('', {
			action: 'add-extension-offer',
            message: offer_content,
            promo: promo,
			type: offer_type,
			country: country
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



export const EditExpenses = (postData) => (dispatch) => {

	const { id } = postData;

	axios.defaults.baseURL = BASE_URL;
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
	axios
		.post('/expenses/edit/'+id, {
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


export const ApproveExpenses = (postData) => (dispatch) => {

	const { id, status } = postData;

	axios.defaults.baseURL = BASE_URL;
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
	axios
		.post('/expenses/approve/'+id, {
			status: status
		})
		.then((res) =>{

				const status = parseInt(res.data.status);

				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let offers = responseString.data;
					dispatch({
						type: Actions.APPROVE_EXPENSE,
						payload: []
					})
				}else{
					dispatch({
						type: Actions.APPROVE_EXPENSE,
						payload: []
					})
				}
			}
		)
		.catch((error) => console.log(' Error Encountered'));
}

export const RemoveExpenses = (postData) => (dispatch) => {

	const { id } = postData;

	axios.defaults.baseURL = BASE_URL;
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
	axios
		.post('/expenses/delete/'+id, {
		})
		.then((res) =>{
				const status = parseInt(res.data.status);
				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let expenses = responseString.data;
					dispatch({
						type: Actions.VIEW,
						payload: expenses
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