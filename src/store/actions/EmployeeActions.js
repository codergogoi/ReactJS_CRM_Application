import Actions from './Actions';
import { BASE_URL } from './AppConst';
import axios from 'axios';





export const GetEmployees = (postData) => (dispatch) => {
	axios.defaults.baseURL = BASE_URL;
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
	axios
		.post('/user/employee', {
			action: ''
		})
		.then((res) =>

			{
				const status = parseInt(res.data.status);

				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let employee = responseString.data;					
					dispatch({
						type: Actions.VIEW,
						payload: employee
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



export const DownloadAttendance = (postData) => (dispatch) => {
	axios.defaults.baseURL = BASE_URL;
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
	axios
		.post('/user/attendance-download', {})
		.then((res) =>

			{
				const status = parseInt(res.data.status);

				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let employee = responseString.data;	
					dispatch({
						type: Actions.DOWNLOAD_ATTENDANCE,
						payload: employee
					})
				}else{
					dispatch({
						type: Actions.DOWNLOAD_ATTENDANCE,
						payload: []
					})
				}
			}

		)
		.catch((error) => console.log(' Error Encountered'));
};



export const GetAttendance = (postData) => (dispatch) => {
	axios.defaults.baseURL = BASE_URL;
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
	axios
		.post('/user/attendance', {
			action: ''
		})
		.then((res) =>

			{
				const status = parseInt(res.data.status);

				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let employee = responseString.data;					
					dispatch({
						type: Actions.VIEW_USER_ATTENDANCE,
						payload: employee
					})
				}else{
					dispatch({
						type: Actions.VIEW_USER_ATTENDANCE,
						payload: []
					})
				}
			}

		)
		.catch((error) => console.log(' Error Encountered'));
};

export const GetAttributes = (postData) => (dispatch) => {

	axios.defaults.baseURL = BASE_URL;
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
	axios
		.post('/user/attributes', {
			currency: localStorage.getItem('currency')
		})
		.then((res) =>{

				const status = parseInt(res.data.status);
				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let attributes = responseString.data;
					dispatch({
						type: Actions.GET_ATTRIBUTES,
						payload: attributes
					})

				}else{
					dispatch({
						type: Actions.GET_ATTRIBUTES,
						payload: []
					})
				}

			}
		)
		.catch((error) => console.log(' Error Encountered'));
};

export const UpdateEmp = (postData) => (dispatch) => {

		const { id, title,
			first_name,
			middle_name,
			last_name,
			emp_id,
			mobile,
			region,
			designation,
			email } = postData;
	
	
		axios.defaults.baseURL = BASE_URL;
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
	
		axios
			.post('/user/update/'+id, {
				title: title,
				first_name: first_name,
				middle_name: middle_name,
				last_name: last_name,
				emp_id: emp_id,
				mobile: mobile,
				region: region,
				designation: designation,
				email: email
			})
			.then((res) => {
				
				const status = parseInt(res.data.status);
				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let attributes = responseString.data;
					dispatch({
						type: Actions.ADD,
						payload: attributes
					})
				}else{
					dispatch({
						type: Actions.VIEW,
						payload: []
					})
				}
		});
};

export const RemoveEmp = (postData) => (dispatch) =>{

	const { id } = postData;

	axios.defaults.baseURL = BASE_URL;
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
		axios
			.post('/user/delete/'+id, {
				
			})
			.then((res) => 
				{
					const status = parseInt(res.data.status);

					if (status === 200) {
						const responseString = JSON.parse(JSON.stringify(res.data));
						let banks = responseString.data;
						dispatch({
							type: Actions.VIEW,
							payload: banks
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

export const NewEmp = (postData) => (dispatch) => {

	const { title,
		first_name,
		middle_name,
		last_name,
		emp_id,
		mobile,
		region,
		designation,
		email } = postData;


	axios.defaults.baseURL = BASE_URL;
	axios.defaults.headers.post['Content-Type'] = 'application/json';
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');

	axios
		.post('/user/add', {
			first_name: first_name,
			middle_name: middle_name,
			last_name: last_name,
			emp_id: emp_id,
			mobile: mobile,
			region: region,
			designation: designation,
			email: email,
			currency: localStorage.getItem('currency')
		})
		.then((res) => {
			
			const status = parseInt(res.data.status);
			if (status === 200) {
				const responseString = JSON.parse(JSON.stringify(res.data));
				let attributes = responseString.data;
				dispatch({
					type: Actions.ADD,
					payload: attributes
				})
			}else{
				dispatch({
					type: Actions.VIEW,
					payload: []
				})
			}
	});
}

export const DismissAlert = () => (dispatch) => {

	dispatch({
		type: Actions.DISMISS
	});

}