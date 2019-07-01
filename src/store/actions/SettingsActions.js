import Actions from './Actions';
import { BASE_URL } from './AppConst';
import axios from 'axios';

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



export const NewRegion= (postData) => (dispatch) => {

	const { region_name,
        description,
        emp_id  } = postData;
		
		axios.defaults.baseURL = BASE_URL;
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
		axios
			.post('/settings/add-region', {
				region_name: region_name,
				description: description,
				emp_id: emp_id 
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



export const EditRegion = (postData) => (dispatch) => {
	const { legal_title, legal_content, legal_type, id } = postData;
		
		axios.defaults.baseURL = BASE_URL;
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
		axios
			.post('', {
				action: 'edit-legal',
				id: id,
				title: legal_title, 
				content: legal_content, 
				type: legal_type,
				currency: localStorage.getItem('currency')
			})
			.then((res) => {
				const status = parseInt(res.data.status);
				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let sdks = responseString.data;
					dispatch({
						type: Actions.ADD,
						payload: sdks
					})
				}else{
					dispatch({
						type: Actions.VIEW,
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
	const { legal_title, legal_content, legal_type, id } = postData;
		
		axios.defaults.baseURL = BASE_URL;
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
		axios
			.post('', {
				action: 'edit-legal',
				id: id,
				title: legal_title, 
				content: legal_content, 
				type: legal_type,
				currency: localStorage.getItem('currency')
			})
			.then((res) => {
				const status = parseInt(res.data.status);
				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let sdks = responseString.data;
					dispatch({
						type: Actions.ADD,
						payload: sdks
					})
				}else{
					dispatch({
						type: Actions.VIEW,
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
