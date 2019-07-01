import Actions from './Actions';
import { BASE_URL } from './AppConst';
import axios from 'axios';

export const GetMandatForCountry = (postData) => (dispatch) => {
	axios.defaults.baseURL = BASE_URL;
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
	axios
		.post('', {
			action: 'view-passport-country',
			currency: localStorage.getItem('currency')
		})
		.then((res) =>{

				const status = parseInt(res.data.status);

				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let offers = responseString.data;
					dispatch({
						type: Actions.VIEW_BY_COUNTRY,
						payload: offers
					})
				}else{
					dispatch({
						type: Actions.VIEW_BY_COUNTRY,
						payload: []
					})
				}
			}
			
		)
		.catch((error) => console.log(' Error Encountered'));
};

export const GetMandatForAirlines = (postData) => (dispatch) => {
	axios.defaults.baseURL = BASE_URL;
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
	axios
		.post('', {
			action: 'view-passport-airlines',
			currency: localStorage.getItem('currency')
		})
		.then((res) =>{

				const status = parseInt(res.data.status);

				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let offers = responseString.data;
					dispatch({
						type: Actions.VIEW_BY_AIRLINES,
						payload: offers
					})
				}else{
					dispatch({
						type: Actions.VIEW_BY_AIRLINES,
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

export const NewCountry = (postData) => (dispatch) => {

	const { country_name, country_code, airlines, date_of_birth, date_of_expiry, 
		visa_type,passport_number, place_of_issue, nationality } = postData;

	axios.defaults.baseURL = BASE_URL;
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
	axios
		.post('', {
			action: 'add-passport-country',
			country_name: country_name,
			country_code: country_code,
			airlines: airlines,
			date_of_birth: date_of_birth,
			date_of_expiry: date_of_expiry, 
			visa_type: visa_type,
			passport_number: passport_number,
			place_of_issue: place_of_issue,
			nationality: nationality ,
			currency: localStorage.getItem('currency')
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


export const NewAirline = (postData) => (dispatch) => {

	const { airlines, date_of_birth, date_of_expiry, 
		visa_type,passport_number, place_of_issue, nationality } = postData;

	axios.defaults.baseURL = BASE_URL;
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
	axios
		.post('', {
			action: 'add-passport-airline',
			airlines: airlines,
			date_of_birth: date_of_birth,
			date_of_expiry: date_of_expiry, 
			visa_type: visa_type,
			passport_number: passport_number,
			place_of_issue: place_of_issue,
			nationality: nationality ,
			currency: localStorage.getItem('currency')
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


export const RemoveCountryField = (postData) => (dispatch) => {

	const { id } = postData;

	axios.defaults.baseURL = BASE_URL;
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
	axios
		.post('', {
			action: 'remove-mandat-country-fields',
			id: id,
			currency: localStorage.getItem('currency')
		})
		.then((res) =>{

				const status = parseInt(res.data.status);

				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let offers = responseString.data;
					dispatch({
						type: Actions.VIEW_BY_COUNTRY,
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

	export const RemoveAirlinesField = (postData) => (dispatch) => {

		const { id } = postData;
	
		axios.defaults.baseURL = BASE_URL;
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
		axios
			.post('', {
				action: 'remove-mandat-airlines-fields',
				id: id,
				currency: localStorage.getItem('currency')
			})
			.then((res) =>{
	
					const status = parseInt(res.data.status);
	
					if (status === 200) {
						const responseString = JSON.parse(JSON.stringify(res.data));
						let offers = responseString.data;
						dispatch({
							type: Actions.VIEW_BY_AIRLINES,
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




export const UpdateCountryChanges = (postData) => (dispatch) => {
	const { id, date_of_birth, passport_number,place_of_issue, exp_date,nationality,visa_type } = postData;

	axios.defaults.baseURL = BASE_URL;
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
	axios
		.post('', {
			action: 'update-mandatory-country-fields',
			id: id,
			date_of_birth: date_of_birth,
        	passport_number: passport_number,
            place_of_issue: place_of_issue,
            exp_date: exp_date,
            nationality: nationality,
            visa_type: visa_type
		})
		.then((res) => {

			const status = parseInt(res.data.status);
			if (status === 200) {
				const responseString = JSON.parse(JSON.stringify(res.data));
				let sdks = responseString.data;
				dispatch({
					type: Actions.VIEW,
				})
			}else{
				dispatch({
					type: Actions.VIEW,
					payload: []
				})
			}
		})
		.catch((error) => console.log(' Error Encountered'));
};

export const UpdateAirlinesChanges = (postData) => (dispatch) => {
	const { id, date_of_birth, passport_number,place_of_issue, exp_date,nationality,visa_type } = postData;

	axios.defaults.baseURL = BASE_URL;
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
	axios
		.post('', {
			action: 'update-mandatory-airlines-fields',
			id: id,
			date_of_birth: date_of_birth,
        	passport_number: passport_number,
            place_of_issue: place_of_issue,
            exp_date: exp_date,
            nationality: nationality,
            visa_type: visa_type
		})
		.then((res) => {

			const status = parseInt(res.data.status);
			if (status === 200) {
				const responseString = JSON.parse(JSON.stringify(res.data));
				let sdks = responseString.data;
				dispatch({
					type: Actions.DEFAULT,
				})
			}else{
				dispatch({
					type: Actions.VIEW,
					payload: []
				})
			}
		})
		.catch((error) => console.log(' Error Encountered'));
};
