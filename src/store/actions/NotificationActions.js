import Actions from './Actions';
import { BASE_URL } from './AppConst';
import axios from 'axios';

export const GetNotifications = (postData) => (dispatch) => {
	axios.defaults.baseURL = BASE_URL;
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
	axios
		.post('', {
			action: 'view-notifications',
			currency: localStorage.getItem('currency')
		})
        .then((res) =>{

            console.log(JSON.stringify(res));

				const status = parseInt(res.data.status);
				if (status === 200) {
                    const responseString = JSON.parse(JSON.stringify(res.data));
					let notifications = responseString.data;
					dispatch({
						type: Actions.VIEW,
						payload: notifications
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
		type: Actions.DISMISS,
	})

}


export const NewNotification = (postData) => (dispatch) => {

	const {title,content,tnc, promocode,validity,section,country} = postData;

    axios.defaults.baseURL = BASE_URL;
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
	axios
		.post('', {
			action: 'add-notification',
			title: title,
			content: content,
			tnc: tnc,
			promocode: promocode,
			validity: validity,
			section: section,
			country: localStorage.getItem('currency'),
		})
        .then((res) =>{
				const status = parseInt(res.data.status);
				if (status === 200) {
                    const responseString = JSON.parse(JSON.stringify(res.data));
                    let notifications = responseString.data;
					dispatch({
						type: Actions.ADD,
						payload: notifications
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


export const RemoveNotification = (postData) => (dispatch) => {

	const { id } = postData; 
	
		axios.defaults.baseURL = BASE_URL;
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
		axios
			.post('', {
				action: 'delete-notification',
				id: id,
				currency: localStorage.getItem('currency')
			})
			.then((res) => {
				const status = parseInt(res.data.status);
				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let notifications = responseString.data;
					dispatch({
						type: Actions.VIEW,
						payload: notifications
					})
				}else{
					dispatch({
						type: Actions.VIEW,
						payload: []
					})
				}
			});
}
 