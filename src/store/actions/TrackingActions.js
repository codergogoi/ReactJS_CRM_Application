import Actions from './Actions';
import { BASE_URL } from './AppConst';
import axios from 'axios';


export const GetUsers = (postData) => (dispatch) => {
	axios.defaults.baseURL = BASE_URL;
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
	axios
		.post('user/tracking', {
		})
		.then((res) =>{

			console.log('Receiving Response: '+ JSON.stringify(res));
			
				const status = parseInt(res.data.status);

				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let users = responseString.data;
					console.log(JSON.stringify(users));
					dispatch({
						type: Actions.VIEW_TRACKING,
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


export const GetTrackDetails = (postData) => (dispatch) => {

	const { startDate, endDate, id } = postData;

	axios.defaults.baseURL = BASE_URL;
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
	axios
		.post('user/track-details/'+ id, {
			from: startDate,
			to: endDate
		})
		.then((res) =>{

			console.log('Receiving Response: '+ JSON.stringify(res));

				const status = parseInt(res.data.status);

				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let users = responseString.data;
					console.log(JSON.stringify(users));
					dispatch({
						type: Actions.VIEW_TRACK_DETAILS,
						payload: users
					})
				}else{
					dispatch({
						type: Actions.VIEW_TRACK_DETAILS,
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
 