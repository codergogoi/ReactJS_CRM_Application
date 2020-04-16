import Actions from './Actions';
import { BASE_URL } from './AppConst';
import axios from 'axios';



export const ExportDatabase = (postData) => (dispatch) => {
	axios.defaults.baseURL = BASE_URL;
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
	axios
		.post('/export', {
			
		})
		.then((res) =>
			{
				const status = parseInt(res.data.status);
				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let export_data = responseString.data;
					dispatch({
						type: Actions.EXPORT_DB,
						payload: export_data
					})
				}else{
					dispatch({
						type: Actions.EXPORT_DB,
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
		.post('/settings/view-regions', {
			
		})
		.then((res) =>
			{
				const status = parseInt(res.data.status);
				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let regions = responseString.data;
					dispatch({
						type: Actions.VIEW_REGIONS,
						payload: regions
					})
				}else{
					dispatch({
						type: Actions.VIEW_REGIONS,
						payload: []
					})
				}
			}
		)
		.catch((error) => console.log(' Error Encountered'));
};


export const GetManagers = (postData) => (dispatch) => {
	axios.defaults.baseURL = BASE_URL;
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
	axios
		.post('/settings/view-managers', {
			
		})
		.then((res) =>
			{
				const status = parseInt(res.data.status);
				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let managers = responseString.data;
					dispatch({
						type: Actions.VIEW_MANAGERS,
						payload: managers
					})
				}else{
					dispatch({
						type: Actions.VIEW_MANAGERS,
						payload: []
					})
				}
			}
		)
		.catch((error) => console.log(' Error Encountered'));
};


export const NewRegion= (postData) => (dispatch) => {

	const {  region_id, region_manager, login_email, login_password   } = postData;
		
		axios.defaults.baseURL = BASE_URL;
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
		axios
			.post('/settings/add-region', {
				region_id: region_id, 
				region_manager: region_manager, 
				login_email: login_email,
				login_password: login_password 
			})
			.then((res) => {
				const status = parseInt(res.data.status);
				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let regions = responseString.data;
					dispatch({
						type: Actions.ADD_REGION_MANAGER,
						payload: regions
					})
				}else{
					dispatch({
						type: Actions.ADD_REGION_MANAGER,
						payload: []
					})
				}
		});
};



export const EditRegion = (postData) => (dispatch) => {

	const { region_id, region_name, description } = postData;
		
		axios.defaults.baseURL = BASE_URL;
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
		axios
			.post('/settings/update-region/'+region_id, {
				region_name: region_name,
				description: description,
			})
			.then((res) => {
				const status = parseInt(res.data.status);
				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let regions = responseString.data;
					dispatch({
						type: Actions.ADD_REGION,
						payload: regions
					})
				}else{
					dispatch({
						type: Actions.VIEW_REGIONS,
						payload: []
					})
				}
		});
};

export const RemoveRegion = (postData) => (dispatch) => {

	const { id } = postData; 
	
		axios.defaults.baseURL = BASE_URL;
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
		axios
			.post('/settings/delete-region/'+id, {
			
			})
			.then((res) => {
				const status = parseInt(res.data.status);
				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let managers = responseString.data;
					dispatch({
						type: Actions.VIEW_MANAGERS,
						payload: managers
					})
				}else{
					dispatch({
						type: Actions.VIEW_MANAGERS,
						payload: []
					})
				}
			});
};


//============ Designations
export const GetDesignations = (postData) => (dispatch) => {
	axios.defaults.baseURL = BASE_URL;
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
	axios
		.post('/settings/view-designations', {
			
		})
		.then((res) =>
			{
				const status = parseInt(res.data.status);
				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let designations = responseString.data;
					
					dispatch({
						type: Actions.VIEW_DESIGNATIONS,
						payload: designations
					})
				}else{
					dispatch({
						type: Actions.VIEW_DESIGNATIONS,
						payload: []
					})
				}
			}
		)
		.catch((error) => console.log(' Error Encountered'));
};

export const NewDesignation= (postData) => (dispatch) => {

	const { designation,
		description,policy_id,
		emp_id } = postData;
		
		axios.defaults.baseURL = BASE_URL;
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
		axios
			.post('/settings/add-designation', {
				designation: designation,
				description: description,
				policy_id: policy_id,
				emp_id: emp_id
			})
			.then((res) => {
				const status = parseInt(res.data.status);
				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let designations = responseString.data;
					dispatch({
						type: Actions.ADD_DESIGNATION,
						payload: designations
					})
				}else{
					dispatch({
						type: Actions.VIEW_DESIGNATIONS,
						payload: []
					})
				}
		});
};


export const EditDesignation = (postData) => (dispatch) => {
	const { emp_id,
		designation,
		description,policy_id } = postData;

		axios.defaults.baseURL = BASE_URL;
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
		axios
			.post('/settings/update-designation/'+emp_id, {
				designation: designation,
				description: description,
				policy_id: policy_id,
			})
			.then((res) => {
				const status = parseInt(res.data.status);
				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let designations = responseString.data;
					dispatch({
						type: Actions.ADD_DESIGNATION,
						payload: designations
					})
				}else{
					dispatch({
						type: Actions.VIEW_DESIGNATIONS,
						payload: []
					})
				}
		});
};


export const RemoveDesignation = (postData) => (dispatch) => {

	const { id } = postData; 
	
		axios.defaults.baseURL = BASE_URL;
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
		axios
			.post('/settings/delete-designation/'+id, {
			
			})
			.then((res) => {
				const status = parseInt(res.data.status);
				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let designations = responseString.data;
					dispatch({
						type: Actions.VIEW_DESIGNATIONS,
						payload: designations
					})
				}else{
					dispatch({
						type: Actions.VIEW_DESIGNATIONS,
						payload: []
					})
				}
			});
};




export const GetPolicies = (postData) => (dispatch) => {
	axios.defaults.baseURL = BASE_URL;
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
	axios
		.post('/settings/view-policy', {
			
		})
		.then((res) =>
			{
				const status = parseInt(res.data.status);
				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let policies = responseString.data;
					
					dispatch({
						type: Actions.VIEW_POLICY,
						payload: policies
					})
				}else{
					dispatch({
						type: Actions.VIEW_POLICY,
						payload: []
					})
				}
			}
		)
		.catch((error) => console.log(' Error Encountered'));
};


export const NewPolicy= (postData) => (dispatch) => {

	const { policy,
		portal_access,
		app_access,
		track_user,
		add_user,
		view_user,
		add_task,
		view_task,
		reports, emp_id  } = postData;
		
		axios.defaults.baseURL = BASE_URL;
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
		axios
			.post('/settings/add-policy', {
					policy: policy,
					portal_access: portal_access,
					app_access: app_access,
					track_user: track_user,
					add_user: add_user,
					view_user: view_user,
					add_task: add_task,
					view_task: view_task,
					reports: reports,
					emp_id: emp_id
			})
			.then((res) => {
				const status = parseInt(res.data.status);
				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let policies = responseString.data;
					dispatch({
						type: Actions.ADD_POLICY,
						payload: policies
					})
				}else{
					dispatch({
						type: Actions.VIEW_POLICY,
						payload: []
					})
				}
		});
};



export const EditPolicy= (postData) => (dispatch) => {

	const { policy_id, policy,
		portal_access,
		app_access,
		track_user,
		add_user,
		view_user,
		add_task,
		view_task,
		reports  } = postData;
		
		axios.defaults.baseURL = BASE_URL;
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
		axios
			.post('/settings/update-policy/'+policy_id, {
					policy: policy,
					portal_access: portal_access,
					app_access: app_access,
					track_user: track_user,
					add_user: add_user,
					view_user: view_user,
					add_task: add_task,
					view_task: view_task,
					reports: reports,
			})
			.then((res) => {
				const status = parseInt(res.data.status);
				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let policies = responseString.data;
					dispatch({
						type: Actions.ADD_POLICY,
						payload: policies
					})
				}else{
					dispatch({
						type: Actions.VIEW_POLICY,
						payload: []
					})
				}
		});
};

export const RemovePolicy = (postData) => (dispatch) => {

	const { id } = postData; 
	
		axios.defaults.baseURL = BASE_URL;
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
		axios
			.post('/settings/delete-policy/'+id, {
			
			})
			.then((res) => {
				const status = parseInt(res.data.status);
				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let policies = responseString.data;
					dispatch({
						type: Actions.DELETE_POLICY,
						payload: policies
					})
				}else{
					dispatch({
						type: Actions.VIEW_POLICY,
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
