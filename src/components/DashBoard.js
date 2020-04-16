import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, Redirect,  } from 'react-router-dom';

//Common UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';

//Icons
import DashboardIcon from '@material-ui/icons/Home';
import TrackingIcon from '@material-ui/icons/GpsFixed';
import TaskIcon from '@material-ui/icons/Assignment';
import ClientIcon from '@material-ui/icons/Store';
import EmployeeIcon from '@material-ui/icons/AssignmentInd';
import ReportIcon from '@material-ui/icons/InsertChart';
import ExpensesIcon from '@material-ui/icons/AttachMoney';
import SettingsIcon from '@material-ui/icons/Settings';

import SignOutIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PromoIcon from '@material-ui/icons/Receipt';


//App Classes
import Applications from './Applications/Applications';
import axios from 'axios';
import { BASE_URL, COUNTRY } from '../store/actions/AppConst';
import TrackManager from './Track/TrackManeger';
import TaskManager from './Task/TaskManager';
import ClientManager from './Clients/ClientManager';
import EmpManager from './Employee/EmpManager';
import ReportManager from './Reports/ReportManager';
import SettingsManager from './Settings/SettingsManager';
import ExpensesManager from './Expenses/ExpensesManager';

import Users from './Users/NewUser';

import { connect } from 'react-redux';
import { DoLogin, ViewUsers } from '../store/actions/UserActions';

const drawerWidth = 240;

//Style Sheet
const styles = (theme) => ({
	
	root: {
		flexGrow: 1,
		zIndex: 1,
		overflow: 'hidden',
		position: 'relative',
		display: 'flex'
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create([ 'width', 'margin' ], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		backgroundColor: '#2a3853'
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create([ 'width', 'margin' ], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	flex: {
		flex: 1
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20
	},
	hide: {
		display: 'none'
	},
	drawerPaper: {
		position: 'relative',
		whiteSpace: 'nowrap',
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	drawerPaperClose: {
		overflowX: 'hidden',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		width: theme.spacing.unit * 7,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing.unit * 9
		}
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar
	},
	content: {
		flexGrow: 1,
		backgroundColor: '#ebeef1',
		padding: theme.spacing.unit * 3
	},
	row: {
		display: 'flex',
		justifyContent: 'center'
	},
	avatar: {
		margin: 0
	},
	avatarCountry: {
		height: 40,
		width: 40,
		margin: 5
	},
	quickaccess: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-end',
		marginRight: '1%',
		color: 'white'
	},
	margin: {
		margin: theme.spacing.unit * 2
	},
	padding: {
		padding: `0 ${theme.spacing.unit * 2}px`
	},
	button: {
		marginTop: theme.spacing.unit * 5,
		marginRight: theme.spacing.unit
	}
});

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			emp_id: '',
			open: false,
			isCollapse: '',
			anchorEl: null,
			alert: false,
			user_type: 'Admin',
			isCountry: false,
			alertTitle: 'User Logout',
			alertMsg: 'Are you sure to Log Out?',
			user: this.props.currentUser,
			settings: [],
			switchCountry: false,
			currentCountry: 'INR',
			country: 'INR'
		};
		this.onCollapseMenu = this.onCollapseMenu.bind(this);
		this.showAlert = this.showAlert.bind(this);
		this.closeAlert = this.closeAlert.bind(this);
		this.AlertModel = this.AlertModel.bind(this);
		this.cancelAlert = this.cancelAlert.bind(this);
		this.changeOptions = this.changeOptions.bind(this);
	}

	componentWillMount() {
		// this.fetchAppSettings();
		this.setCountryFlag(localStorage.getItem('currency'));
	}

	setCountryFlag = (code) => {

		// this.fetchAppSettings();
		if (code === 'KWD') {
			this.setState({
				country_flag: '/kwd.png'
			});
		}else if (code === 'AED') {
			this.setState({
				country_flag: '/aed.png'
			});
		} else {
			this.setState({
				country_flag: '/inr.png'
			});
		}
	}

	onCollapseMenu() {
		if (ReactDOM.findDOMNode(this.refs.toggleMnu) !== null) {
			ReactDOM.findDOMNode(this.refs.toggleMnu).click();
		}
	}

	updateOwnerName(name) {
		this.setState({
			ownerName: name
		});
	}

	handleDrawerOpen = () => {
		if (this.state.open === true) {
			this.setState({ open: false });
		} else {
			this.setState({ open: true });
		}
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};

	handleClick = (event) => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	showAlert() {
		this.setState({ anchorEl: null });
		this.setState({ alert: true });
	}

	// Switch Country
	onSwitchCountry = () => {
		this.setState({
			isCountry: true,
			anchorEl: null
		});
	};

	onTapIndia = () => {
		this.setState({ anchorEl: null, isCountry: false, country: 'INR', country_flag: '/inr.png' });
		localStorage.setItem('currency', 'INR');
		return <Redirect to='/dashboard' />
	};

	onTapUAE = () => {
		this.setState({ anchorEl: null, isCountry: false, country: 'AED', country_flag: '/aed.png' });
		localStorage.setItem('currency', 'AED');
		return <Redirect to='/dashboard' />
	};

	onTapKWD = () => {
		this.setState({ anchorEl: null, isCountry: false, country: 'KWD', country_flag: '/kwd.png' });
		localStorage.setItem('currency', 'KWD');
		return <Redirect to='/dashboard' />
	};

	closeAlert() {
		this.setState({ alert: false });
		this.props.onLogout();
	}

	cancelAlert() {
		this.setState({ anchorEl: null });
		this.setState({ alert: false });
	}

	changeOptions(val) {
		this.props.history.push('/control-panel');
	}

	//Network Calls
	fetchAppSettings = () => {
		axios.defaults.baseURL = BASE_URL;
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('app_token');
		axios
			.post('', {
				action: 'fetch-settings'
			})
			.then((res) => {
				const status = parseInt(res.data.status);
				if (status === 200) {
					const responseString = JSON.parse(JSON.stringify(res.data));
					let settingsData = responseString.data[0];
					this.setState({
						settings: settingsData
					});
				}
			});
	};

	onViewAccessLinks = (access) => {

		let linkAccess = "";
		
		

	}


	onViewAccessRoutes = (access) => {

		


	}


	// render UI
	render() {
		const { classes } = this.props;
		const { anchorEl, country_flag, user_type, country } = this.state;

		const { access  } =  this.props.currentUser;

			/*
			"track": false,
            "user_add": true,
            "user_view": true,
            "task_add": false,
            "task_view": false,
            "report": true,
            "view_attendance": true,
            "download_attendance": true,
            "edit_user": true,
            "delete_user": true,
            "accounts": false,
            "is_admin": false
			*/		

		return (
			<Router>
				<div className={classes.root}>
					<AppBar
						position="absolute"
						className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
					>
						<Toolbar disableGutters={!this.state.open}>
							<IconButton color="inherit" aria-label="open drawer" onClick={this.handleDrawerOpen}>
								<MenuIcon />
							</IconButton>
							<Typography variant="title" color="inherit" className={classes.flex}>
								Sales Companion : 1.0.1
							</Typography>
							<Avatar
								alt="country"
								src={process.env.PUBLIC_URL + country_flag}
								className={classes.avatarCountry}
							/>
							<div className={classes.quickaccess}>
								<IconButton
									color="inherit"
									aria-label="More"
									aria-owns={anchorEl ? 'long-menu' : null}
									aria-haspopup="true"
									onClick={this.handleClick}
									styles={{ color: 'white' }}
								>
									<MoreVertIcon />
								</IconButton>
								<Menu
									id="simple-menu"
									anchorEl={anchorEl}
									open={Boolean(anchorEl)}
									onClose={this.handleClose}
								>
								
									
									<MenuItem onClick={this.showAlert}>Logout</MenuItem>
								</Menu>
							</div>
						</Toolbar>
					</AppBar>

					<Drawer
						variant="permanent"
						classes={{
							paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose)
						}}
						open={this.state.open}
					>
						<List>
							<Link className="linkName" to={`${process.env.PUBLIC_URL}/profile`}>
								<ListItem button>
									<ListItemIcon>
										<Avatar
											alt="Jayanta"
											src={`${process.env.PUBLIC_URL}/profilepic.png`}
											className={classNames(classes.avatar)}
										/>
									</ListItemIcon>
									<ListItemText primary={'Hello ' + user_type} />
								</ListItem>
							</Link>
						</List>

						<List to={`${process.env.PUBLIC_URL}/dashboard`}>
							<Link className="linkName" to={`${process.env.PUBLIC_URL}/dashboard`}>
								<ListItem button>
									<ListItemIcon>
										<DashboardIcon />
									</ListItemIcon>
									<ListItemText primary="Dashboard" />
								</ListItem>
							</Link>
						</List>
						
						{access.track  &&  <List to={`${process.env.PUBLIC_URL}/track`}>
							<Link className="linkName" to={`${process.env.PUBLIC_URL}/track`}>
								<ListItem button>
									<ListItemIcon>
										<TrackingIcon />
									</ListItemIcon>
									<ListItemText primary="User Statistic" />
								</ListItem>
							</Link>
						</List> }
						
						{access.task_view && 
							<div>
								<List to={`${process.env.PUBLIC_URL}/task`}>
								<Link className="linkName" to={`${process.env.PUBLIC_URL}/task`}>
									<ListItem button>
										<ListItemIcon>
											<TaskIcon />
										</ListItemIcon>
										<ListItemText primary="Task" />
									</ListItem>
								</Link>
							</List>

								<List to={`${process.env.PUBLIC_URL}/cliens`}>
									<Link className="linkName" to={`${process.env.PUBLIC_URL}/clients`}>
										<ListItem button>
											<ListItemIcon>
												<ClientIcon />
											</ListItemIcon>
											<ListItemText primary="Clients" />
										</ListItem>
									</Link>
							</List>

							</div>
						 }

						{access.user_view && <List>
							<Link className="linkName" to={`${process.env.PUBLIC_URL}/employee`}>
									<ListItem button>
										<ListItemIcon>
											<EmployeeIcon />
										</ListItemIcon>
										<ListItemText primary="Employee" />
									</ListItem>
								</Link>
							</List>
						}
 
						{access.report && <List>
							<Link className="linkName" to={`${process.env.PUBLIC_URL}/reports`}>
								<ListItem button>
									<ListItemIcon>
										<ReportIcon />
									</ListItemIcon>
									<ListItemText primary="Reoports" />
								</ListItem>
							</Link>
						</List>
						}

						{access.accounts && <List>
							<Link className="linkName" to={`${process.env.PUBLIC_URL}/expenses`}>
								<ListItem button>
									<ListItemIcon>
										<ExpensesIcon />
									</ListItemIcon>
									<ListItemText primary="Expenses" />
								</ListItem>
							</Link>
						</List>}

						
						{access.is_admin && <List>
							<Link className="linkName" to={`${process.env.PUBLIC_URL}/settings`}>
								<ListItem button>
									<ListItemIcon>
										<SettingsIcon />
									</ListItemIcon>
									<ListItemText primary="Settings" />
								</ListItem>
							</Link>
						</List>
						}


						<List onClick={this.showAlert}>
							<ListItem button>
								<ListItemIcon>
									<SignOutIcon />
								</ListItemIcon>
								<ListItemText primary="Signout" />
							</ListItem>
						</List>
					</Drawer>
					<main className={classes.content}>
						<div className={classes.toolbar} />
						{this.AlertModel()}
						{this.countrySelection()}
						<Switch>
							{access.task_view && <Route
								path={`${process.env.PUBLIC_URL}/task`}
								render={(props) => (
									<TaskManager user_type={user_type} onLoadMenu={this.onCollapseMenu} {...props} />
								)}
							/>}

							{access.track  && 	<Route
								path={`${process.env.PUBLIC_URL}/track`}
								render={(props) => (
									<TrackManager user_type={user_type} onLoadMenu={this.onCollapseMenu} {...props} />
								)}
							/>}

							{access.task_view && <Route
								path={`${process.env.PUBLIC_URL}/clients`}
								render={(props) => (
									<ClientManager user_type={user_type} onLoadMenu={this.onCollapseMenu} {...props} />
								)}
							/>}

						 
							{access.user_view && <Route
								path={`${process.env.PUBLIC_URL}/employee`}
								render={(props) => (
									<EmpManager user_type={user_type} onLoadMenu={this.onCollapseMenu} access={access} {...props} />
								)}
							/>}
 

 							{access.report && <Route
								path={`${process.env.PUBLIC_URL}/reports`}
								render={(props) => (
									<ReportManager user_type={user_type} onLoadMenu={this.onCollapseMenu} {...props} />
								)}
							/> }

							{access.user_view && <Route
								path={`${process.env.PUBLIC_URL}/view-users`}
								render={(props) => (
									<Users user_type={user_type} onLoadMenu={this.onCollapseMenu} {...props} />
								)}
							/>}
							
							{access.accounts && <Route
								path={`${process.env.PUBLIC_URL}/expenses`}
								render={(props) => (
									<ExpensesManager user_type={user_type} onLoadMenu={this.onCollapseMenu} {...props} />
								)}
							/>}

							{access.is_admin &&
							<Route
								path={`${process.env.PUBLIC_URL}/settings`}
								render={(props) => (
									<SettingsManager user_type={user_type} onLoadMenu={this.onCollapseMenu} {...props} />
								)}
								/> }

							 <Route
								path="/"
								render={(props) => (
									<Applications user_type={user_type} onLoadMenu={this.onCollapseMenu} access={access} {...props} />
								)}
							/>
						</Switch>
					</main>
				</div>
			</Router>
		);
	}

	AlertModel() {
		return (
			<div>
				<Dialog
					open={this.state.alert}
					onClose={this.closeAlert}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">{this.state.alertTitle}</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">{this.state.alertMsg}</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.cancelAlert} color="primary">
							Cancel
						</Button>
						<Button onClick={this.closeAlert} color="primary" autoFocus>
							OK
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}

	countrySelection() {
		const { classes } = this.props;

		return (
			<div>
				<Dialog
					open={this.state.isCountry}
					onClose={this.closeAlert}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">Switch Country </DialogTitle>
					<DialogContent>
						<Button
							variant="extendedFab"
							color="secondary"
							className={classes.button}
							onClick={this.onTapIndia.bind(this)}
						>
							India
						</Button>
						<Button
							variant="extendedFab"
							color="secondary"
							className={classes.button}
							onClick={this.onTapUAE.bind(this)}
						>
							UAE
						</Button>
						<Button
							variant="extendedFab"
							color="secondary"
							className={classes.button}
							onClick={this.onTapKWD.bind(this)}
						>
							KWD
						</Button>
					</DialogContent>
				</Dialog>
			</div>
		);
	}
}

Dashboard.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired
};

const mapToProps = (state) => ({
	userInfo: state.userReducer.userInfo
});

export default connect(mapToProps, { DoLogin })(withStyles(styles, { withTheme: true })(Dashboard));
