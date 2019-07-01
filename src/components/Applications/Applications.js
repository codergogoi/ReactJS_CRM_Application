import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, Avatar } from '@material-ui/core';
import Button from '@material-ui/core/Button';

//Icons
import DashboardIcon from '@material-ui/icons/Home';
import NotificationIcon from '@material-ui/icons/NotificationsActive';
import OfferIcon from '@material-ui/icons/CardGiftcard';
import RoutingIcon from '@material-ui/icons/CallSplit';


import ReportIcon from '@material-ui/icons/PlaylistAddCheck';
import SDKIcon from '@material-ui/icons/PhonelinkSetup';
import SettingsIcon from '@material-ui/icons/Settings';
import SignOutIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PromoIcon from '@material-ui/icons/Receipt';
import PassportIcon from '@material-ui/icons/LineStyle'
import LegalIcon from '@material-ui/icons/Announcement';

// App Classes
// import ManageTask from '../Tasks/ManageTask';

//CSS Module
const styles = (theme) => ({
	container: {
		flex: 1,
		display: 'flex',
		flexWrap: 'wrap',
		flexDirection: 'row'
	},
	formControl: {
		margin: theme.spacing.unit
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: 300
	},
	button: {
		margin: theme.spacing.unit
	},
	leftIcon: {
		marginRight: theme.spacing.unit
	},
	rightIcon: {
		marginLeft: theme.spacing.unit
	},
	
	paper: {
		padding: theme.spacing.unit * 2,
		height: 80,
		textAlign: 'center',
		color: theme.palette.text.secondary,
		alignItems: 'center',
		justify: 'center',
		fontSize: '14',
	}
});

//Main Class
class Applications extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user_type: this.props.user_type,
			user: this.props.user,
			spacing: '16'
		};
	}

	profileUI = () => {
		const { classes } = this.props;
		const { user_type } = this.state;

		return (
			<div className={classes.root}>
				<Grid container spacing={12}>
						<Grid item xs={4}>
							<li>
								<Link to={`${process.env.PUBLIC_URL}/track`}>
									<Button className={classes.paper}>
										<NotificationIcon  className={classes.leftIcon}/> Track User
									</Button>
								</Link>
							</li>
						</Grid>
					 
					<Grid item xs={4}>
						<li>
							<Link to={`${process.env.PUBLIC_URL}/task`}>
								<Button className={classes.paper}>
								<OfferIcon  className={classes.leftIcon}/>Task
								</Button>
							</Link>
						</li>
					</Grid>

					<Grid item xs={4}>
						<li>
							<Link to={`${process.env.PUBLIC_URL}/clients`}>
								<Button className={classes.paper} onClick={this.onTapOptions}>
									<RoutingIcon  className={classes.leftIcon}/>
									Clients
								</Button>
							</Link>
						</li>
					</Grid>
					 
 
					
					<Grid item xs={4}>
						<li>
							<Link to={`${process.env.PUBLIC_URL}/employee`}>
								<Button className={classes.paper}>
								<SDKIcon  className={classes.leftIcon}/>
									Employee
								</Button>
							</Link>
						</li>
					</Grid>

				 
					<Grid item xs={4}>
						<li>
							<Link to={`${process.env.PUBLIC_URL}/reports`}>
								<Button className={classes.paper}>
								<ReportIcon  className={classes.leftIcon}/>Reports
								</Button>
							</Link>
						</li>
					</Grid>

					<Grid item xs={4}>
						<li>
							<Link to={`${process.env.PUBLIC_URL}/expenses`}>
								<Button className={classes.paper}>
								<ReportIcon  className={classes.leftIcon}/>Expenses
								</Button>
							</Link>
						</li>
					</Grid>

					<Grid item xs={4}>
						<li>
							<Link to={`${process.env.PUBLIC_URL}/settings`}>
								<Button className={classes.paper}>
									<SettingsIcon  className={classes.leftIcon}/>Settings
								</Button>
							</Link>
						</li>
					</Grid>

					 
				</Grid>

				<Switch>
					{/* <Route
						exact
						path="/manage_task"
						render={(props) => <ManageTask onLoadMenu={this.onCollapseMenu} {...props} />}
					/> */}
				</Switch>
			</div>
		);
	};

	render() {
		const { classes } = this.props;
		return (
			<div>
				<Card className={classes.card}>
					<CardContent>
						<Typography>{this.profileUI()}</Typography>
					</CardContent>
				</Card>
			</div>
		);
	}
}

Applications.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Applications);
