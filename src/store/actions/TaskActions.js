import Actions from './Actions';
import { BASE_URL } from './AppConst';
import axios from 'axios';




export const GetTaskUtility = (postData) => (dispatch) => {
	axios.defaults.baseURL = BASE_URL;
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
	axios
		.post('task/utility', {
		})
		.then((res) =>
			{
				const status = parseInt(res.data.status);
				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let utilities = responseString.data;
					dispatch({
						type: Actions.VIEW_TASK_UtiLITY,
						payload: utilities
					})
				}else{
					dispatch({
						type: Actions.VIEW_TASK_UtiLITY,
						payload: []
					})
				}
			}
		)
		.catch((error) => console.log(' Error Encountered'));
};



export const GetTask = (postData) => (dispatch) => {
	axios.defaults.baseURL = BASE_URL;
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
	axios
		.post('task/view-all', {
		})
		.then((res) =>
			{
				const status = parseInt(res.data.status);
				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let tasks = responseString.data;
					dispatch({
						type: Actions.VIEW,
						payload: tasks
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


export const NewTask = (postData) => (dispatch) => {

	const {  title,
		client_id,
		contact_person_name,
		company_phone,
		task_description,
		employee_id,
		task_priority,
		location,
		meeting_date,
		client_address,
		remarks,
		assign_lat,
		assign_lng } = postData;
		
		axios.defaults.baseURL = BASE_URL;
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
		axios
			.post('/task/add', {
				title: title,
				client_id: client_id,
				contact_person_name: contact_person_name,
				company_phone: company_phone,
				task_description: task_description,
				employee_id: employee_id,
				task_priority: task_priority,
				location: location,
				meeting_date: meeting_date,
				client_address: client_address,
				remarks: remarks,
				assign_lat: assign_lat,
				assign_lng: assign_lng,
			})
			.then((res) => {
				const status = parseInt(res.data.status);
				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let utility = responseString.data;
					dispatch({
						type: Actions.ADD_TASK,
						payload: utility
					})
				}else{
					dispatch({
						type: Actions.ADD_TASK,
						payload: []
					})
				}
		});
};

export const UpdateTask = (postData) => (dispatch) => {
	const {  task_id,title,
		client_id,
		contact_person_name,
		company_phone,
		task_description,
		employee_id,
		task_priority,
		location,
		meeting_date,
		client_address,
		remarks,
		assign_lat,
		assign_lng } = postData;
		
		axios.defaults.baseURL = BASE_URL;
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
		axios
			.post('/task/edit/'+task_id, {
				title: title,
				client_id: client_id,
				contact_person_name: contact_person_name,
				company_phone: company_phone,
				task_description: task_description,
				employee_id: employee_id,
				task_priority: task_priority,
				location: location,
				meeting_date: meeting_date,
				client_address: client_address,
				remarks: remarks,
				assign_lat: assign_lat,
				assign_lng: assign_lng,
			})
			.then((res) => {
				const status = parseInt(res.data.status);
				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let utility = responseString.data;
					dispatch({
						type: Actions.ADD_TASK,
						payload: utility
					})
				}else{
					dispatch({
						type: Actions.ADD_TASK,
						payload: []
					})
				}
		});
};

export const RemoveTask = (postData) => (dispatch) => {

	const { id } = postData; 
	
		axios.defaults.baseURL = BASE_URL;
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
		axios
			.post('/task/delete/'+id, {
			})
			.then((res) => {
				const status = parseInt(res.data.status);
				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let tasks = responseString.data;
					dispatch({
						type: Actions.VIEW,
						payload: tasks
					})
				}else{
					dispatch({
						type: Actions.VIEW,
						payload: []
					})
				}
			});
};

export const DismissAlert = () => (dispatch) => {

	dispatch({
		type: Actions.DISMISS
	});
}
