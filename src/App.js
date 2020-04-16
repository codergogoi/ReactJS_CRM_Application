import React, { Component } from 'react';

//Common UI
import './App.css';

//App Classes & Network Calls
import axios from 'axios';
import Alert from './components/Common/Alert';
import Login from './components/Users/Login';
import Dashboard from './components/DashBoard';
import { connect } from 'react-redux';
import { DoLogin, DoLogout } from '../src/store/actions/UserActions';
import { BASE_URL } from '../src/store/actions/AppConst';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLogin: false,
			appSecret: '',
			currentUser: []
		};
		this.didLogout = this.didLogout.bind(this);

		
	}

	componentWillMount() {
		this.checkAuthorization();
	}

	componentWillReceiveProps() {
		this.checkAuthorization();
	}

	checkAuthorization = () => {
		axios.defaults.baseURL = BASE_URL;
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');

		this.setState({ currentUser: JSON.parse(localStorage.getItem('current_user')) });

		axios
			.post('/portal', {
			})
			.then((res) => {

				console.log('Response Data from authorization'+ JSON.stringify(res));
				const data = res.data.data;
				const status = parseInt(res.data.status);
				if (status === 200) {
					this.setState({ isLogin: true });
				}
			});
	};
	

	didLogout() {
		localStorage.setItem('app_token', null);
		this.setState({ isLogin: false });
		this.props.DoLogout();
	}


	onIsLogin = (userInfo) => {
		const responseString = JSON.parse(JSON.stringify(userInfo.data));
		let user = responseString.data;
		localStorage.setItem('app_token', user.token);
		this.setState({
			isLogin: true
		});
	};

	

	render() {
		const { showAlert, title, msg, isLogin, currentUser } = this.state;		

		if (isLogin) {
			return <Dashboard onLogout={this.didLogout} currentUser={currentUser} />;
		} else {
			return (
				<div>
					<Alert
						open={showAlert}
						onCancel={this.onOkay.bind(this)}
						onOkay={this.onOkay.bind(this)}
						title={title}
						msg={msg}
					/>
					<Login onCheckLogin={this.checkLogin} isLogin={this.onIsLogin.bind(this)} />
				</div>
			);
		}
	}

	//========================= UTILITY ===============================

	//ALERT
	onDismiss = () => {
		this.setState({ showAlert: false });
	};

	onOkay = () => {
		this.setState({ showAlert: false });
	};
}

const mapToProps = (state) => ({
	users: state.userReducer.users
});

export default connect(mapToProps, { DoLogin, DoLogout })(App);

//	"homepage": "/beta/", 
