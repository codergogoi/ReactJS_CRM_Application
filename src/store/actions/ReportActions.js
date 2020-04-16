import Actions from './Actions';
import { BASE_URL } from './AppConst';
import axios from 'axios';

export const GetReports = (postData) => (dispatch) => {
	axios.defaults.baseURL = BASE_URL;
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
	axios
		.post('/report/progress', {
			
		})
		.then((res) =>{

				const status = parseInt(res.data.status);

				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let reports = responseString.data;
					dispatch({
						type: Actions.VIEW,
						payload: reports
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


export const GetProgressRatio = (postData) => (dispatch) => {
	axios.defaults.baseURL = BASE_URL;
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
	axios
		.post('/report/view-ratio', {
			
		})
		.then((res) =>{

				const status = parseInt(res.data.status);

				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let reports = responseString.data;
					dispatch({
						type: Actions.VIEW_PROGRESS_RATIO,
						payload: reports
					})
				}else{
					dispatch({
						type: Actions.VIEW_PROGRESS_RATIO,
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
 
