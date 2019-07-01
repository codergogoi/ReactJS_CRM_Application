import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// Icons
import AddOffersIcon from '@material-ui/icons/CardGiftcard';

import Table from './UsersTable';
import Alert from '../Common/Alert';

//App Classes
import CardDiv from '../Common/CardDiv';
import AddUser from './AddUser';

import { connect } from 'react-redux';
import { ViewUsers, RemoveUser } from '../../store/actions/UserActions';

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

class NewUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			value: 0,
			isAddNew: false,
			isEdit: false
		};
	}

	handleChange = (event, value) => {
		this.setState({ value });
	};

	componentWillMount() {
		this.props.ViewUsers('');
	}
 
	onTapRegister() {
		this.setState({ isAddNew: true });
	}

	onTapBack() {
		this.setState({ isAddNew: false, isEdit: false });
		this.props.ViewUsers('');
	}

	onEditPaymentMode(mode) {
		let index = this.state.sdkData.findIndex((x) => x.id === mode.id);
		let modes = this.state.sdkData;
		modes[index] = mode;
		this.setState({
			sdkData: modes
		});
		this.props.UpdateChanges(mode);
	}

	onDeleteUser(email) {
		this.setState({
			email: email,
			showAlert: true,
			msg: 'Are you sure to delete the selected User ?',
			title: 'Delete Confirmation!'
		});
	}

	onExecuteDeleteCommand() {
		const { email } = this.state;
		this.props.RemoveUser({ email });
		
	}

	render() {

		const { classes, users } = this.props;
		const { value, isAddNew, showAlert, title, msg } = this.state;

		if (isAddNew) {
			return (
				<CardDiv title={'Add New User'}>
					<AddUser onTapBack={this.onTapBack.bind(this)} />
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

					<CardDiv title={'Manage Users'}>
						{value === 0 && (
							<div>
								<Button
									variant="extendedFab"
									color="secondary"
									className={classes.btnRightA}
									onClick={this.onTapRegister.bind(this)}
								>
									Add <AddOffersIcon className={classes.rightIcon} />
								</Button>
								{users !== undefined && (<Table
									onEditPaymentMode={this.onEditPaymentMode.bind(this)}
									onDeleteUser={this.onDeleteUser.bind(this)}
									data={users}
								/>)}
								
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

NewUser.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapToProps = (state) => ({
	users: state.userReducer.users
});

export default connect(mapToProps, { ViewUsers, RemoveUser })(withStyles(styles)(NewUser));
