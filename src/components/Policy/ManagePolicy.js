import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// Icons
import NotificationIcon from '@material-ui/icons/NotificationsActive';
import SaveIcon from '@material-ui/icons/Save';

import Table from './NotificationTable';
import axios from 'axios';
import Alert from '../Common/Alert';

//App Classes
import CardDiv from '../Common/CardDiv';
import AddNotification from './AddNotification';

import { GetNotifications, RemoveNotification } from '../../actions/NotificationActions';
import { connect } from 'react-redux';

function TabContainer(props) {
	return (
		<Typography component="div" style={{ padding: 8 * 3 }}>
			{props.children}
		</Typography>
	);
}

TabContainer.propTypes = {
	children: PropTypes.node.isRequired
};

const styles = (theme) => ({
	root: {
		flexGrow: 1,
		width: '100%'
	},
	bar: {
		backgroundColor: '#1a237e'
	},
	rightIcon: {
		marginLeft: theme.spacing.unit
	},
	btnRightA: {
		position: 'absolute',
		top: theme.spacing.unit * 13,
		right: theme.spacing.unit * 10
	},
	btnRightB: {
		position: 'absolute',
		bottom: theme.spacing.unit * 12,
		left: theme.spacing.unit * 13
	}
});

class ManagePolicy extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			notifications: [],
			value: 0,
			isAddNew: false,
			isEdit: false
		};
	}

	componentWillMount() {
		this.fetchNotifications();
	}

	fetchNotifications() {
		 this.props.GetNotifications('');
	}

	onTapSaveChanges = () => {
		this.setState({
			showAlert: true,
			msg: 'All changes will be update on Application API Instantly.',
			title: 'Changes Confirmation!'
		});
	};

	onTapAddNew = () => {
		this.setState({ isAddNew: true });
	};

	onTapBack() {
		this.setState({ isAddNew: false, isEdit: false });
		this.fetchNotifications();
	}

	onCloneNotification(notification) {
		this.setState({
			currentNotification: notification,
			isEdit: true,
			isAddNew: true
		});
	}

	onDeleteNotification(notification) {
		const { id } = notification;
		this.setState({
			id: id,
			showAlert: true,
			msg: 'Are you sure to delete the selected Notification?',
			title: 'Delete Confirmation!'
		});
	}

	onExecuteDeleteCommand() {
		const { id } = this.state;
		 this.props.RemoveNotification({ id});
	}

	render() {
		const { classes, notifications } = this.props;
		const { value, isAddNew, showAlert, title, msg, currentNotification, isEdit } = this.state;

		if (isAddNew) {
			return (
				<CardDiv title={'Add Notification'}>
					<AddNotification
						currentNotification={currentNotification}
						clone={isEdit}
						onTapBack={this.onTapBack.bind(this)}
					/>
				</CardDiv>
			);
		} else {
			return (
				<div>
					<Alert
						open={showAlert}
						onCancel={this.onDismiss.bind(this)}
						onOkay={this.onOkay.bind(this)}
						title={title}
						msg={msg}
					/>

					<CardDiv title={'Policy Settings'}>
						{value === 0 && (
							<div>
								<Button
									variant="extendedFab"
									color="secondary"
									className={classes.btnRightA}
									onClick={this.onTapAddNew.bind(this)}
								>
									Add <NotificationIcon className={classes.rightIcon} />
								</Button>
								<Table
									onCloneClick={this.onCloneNotification.bind(this)}
									onDeleteNotification={this.onDeleteNotification.bind(this)}
									data={notifications}
								/>
							</div>
						)}
					</CardDiv>
				</div>
			);
		}
	}

	//ALERT
	onDismiss = () => {
		this.setState({ showAlert: false });
	};

	onOkay = () => {
		this.setState({ showAlert: false });
		this.onExecuteDeleteCommand();
	};
}

ManagePolicy.propTypes = {
	classes: PropTypes.object.isRequired
};


const mapStateToProps = (state) =>({
	notifications: state.notificationReducer.notifications,
	
})

export default connect( mapStateToProps, { GetNotifications, RemoveNotification })(withStyles(styles)(ManagePolicy));
