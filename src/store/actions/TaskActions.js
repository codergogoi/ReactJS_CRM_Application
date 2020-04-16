import Actions from './Actions';
import { BASE_URL } from './AppConst';
import axios from 'axios';


export const GetTaskUtility = (postData) => (dispatch) => {

	const { id } = postData;

	axios.defaults.baseURL = BASE_URL;
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
	axios
		.post('task/utility/'+id, {
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



export const GetGroupTaskClients = (postData) => (dispatch) => {

	const { id } = postData;

	axios.defaults.baseURL = BASE_URL;
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
	axios
		.post('task/group-task-clients/'+id, {
		})
		.then((res) =>
			{
				const status = parseInt(res.data.status);
				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let clients = responseString.data;
					dispatch({
						type: Actions.VIEW_GROUP_TASK_CLIENTS,
						payload: clients
					})
				}else{
					dispatch({
						type: Actions.VIEW_GROUP_TASK_CLIENTS,
						payload: []
					})
				}
			}
		)
		.catch((error) => console.log(' Error Encountered'));
};


export const GetTaskCity = (postData) => (dispatch) => {
	axios.defaults.baseURL = BASE_URL;
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
	axios
		.post('task/city', {
		})
		.then((res) =>
			{
				const status = parseInt(res.data.status);
				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let cities = responseString.data;
					dispatch({
						type: Actions.VIEW_CITY,
						payload: cities
					})
				}else{
					dispatch({
						type: Actions.VIEW_CITY,
						payload: []
					})
				}
			}
		)
		.catch((error) => console.log(' Error Encountered'));
};

export const keepLoading = () => (dispatch) => {
	dispatch({
		type: Actions.LOADING
	});
}

export const GetTaskLocation = (postData) => (dispatch) => {
	axios.defaults.baseURL = BASE_URL;
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
	axios
		.post('task/location', {
		})
		.then((res) =>
			{
				const status = parseInt(res.data.status);
				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let locations = responseString.data;
					dispatch({
						type: Actions.VIEW_LOCATION,
						payload: locations
					})
				}else{
					dispatch({
						type: Actions.VIEW_LOCATION,
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

export const GetGroupTask = (postData) => (dispatch) => {

	const { group_id } = postData;

	axios.defaults.baseURL = BASE_URL;
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
	axios
		.post('task/group/'+group_id, {
		})
		.then((res) =>
			{
				const status = parseInt(res.data.status);
				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));

					console.log(JSON.stringify(responseString));
					
					let tasks = responseString.data;
					dispatch({
						type: Actions.VIEW_ALL_GROUP_TASK,
						payload: tasks
					})
				}else{
					dispatch({
						type: Actions.VIEW_ALL_GROUP_TASK,
						payload: []
					})
				}
			}
		)
		.catch((error) => console.log(' Error Encountered'));
};




export const NewGroupTask = (postData) => (dispatch) => {

	const { title,
		task_description,
		employee_id,
		task_priority,
		start_date,
		end_date,
		current_clients,
		city_id	
		} = postData;
		
		var clients = []
		current_clients.map((item) => {
			clients.push(item.client_id);
		});
		
		axios.defaults.baseURL = BASE_URL;
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
		axios
			.post('/task/add-group', {
				title: title,
				clients: clients,
				task_description: task_description,
				employee_id: employee_id,
				task_priority: task_priority,
				start_date: start_date,
				end_date: end_date
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

export const NewTask = (postData) => (dispatch) => {

	const {  title,
		client_id,
		task_description,
		employee_id,
		task_priority,
		meeting_date,
		assign_lat,
		assign_lng,
		city_id } = postData;
		
		axios.defaults.baseURL = BASE_URL;
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
		axios
			.post('/task/add', {
				title: title,
				client_id: client_id,
				task_description: task_description,
				employee_id: employee_id,
				meeting_date: meeting_date,
				task_priority: task_priority,
				city_id: city_id
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
		task_description,
		employee_id,
		task_priority,
		meeting_date,
		city_id } = postData;
		
		axios.defaults.baseURL = BASE_URL;
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
		axios
			.post('/task/edit/'+task_id, {
				title: title,
				client_id: client_id,
				task_description: task_description,
				employee_id: employee_id,
				task_priority: task_priority,
				meeting_date: meeting_date,
				city_id: city_id
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


export const RemoveGroupedTask = (postData) => (dispatch) => {

	const { id, group_id } = postData; 
	
		axios.defaults.baseURL = BASE_URL;
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
		axios
			.post('/task/delete-group/'+id, {
				group_id: group_id
			})
			.then((res) => {
				const status = parseInt(res.data.status);
				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let tasks = responseString.data;
					dispatch({
						type: Actions.VIEW_ALL_GROUP_TASK,
						payload: tasks
					})
				}else{
					dispatch({
						type: Actions.VIEW_ALL_GROUP_TASK,
						payload: []
					})
				}
			});
};

export const UpdateGroupTask = (postData) => (dispatch) => {
	const {  
		group_id,
		title,
		task_description,
		task_priority,
		meeting_date,
		} = postData;
		
		axios.defaults.baseURL = BASE_URL;
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
		axios
			.post('/task/edit-group-task', {
				title: title,
				group_id: group_id,
				task_description: task_description,
				task_priority: task_priority,
				meeting_date: meeting_date,
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



export const DismissAlert = () => (dispatch) => {

	dispatch({
		type: Actions.DISMISS
	});
}
