import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// Icons
import EmployeeIcon from '@material-ui/icons/SupervisorAccount';
import AddOffersIcon from '@material-ui/icons/CardGiftcard';
import SaveIcon from '@material-ui/icons/Save';

import Table from './ClientTable';
import Alert from '../Common/Alert';

//App Classes
import CardDiv from '../Common/CardDiv';
import AddClient from './AddClient';

import { connect } from 'react-redux';
import { GetClients } from '../../store/actions/ClientActions';

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

class ClientManager extends Component {
	constructor(props) {
		super(props);
		this.state = {
			clients: [],
			value: 0,
			isAddNew: false,
			isEdit: false
		};
	}

	handleChange = (event, value) => {
		this.setState({ value });
	};

	componentWillMount() {
		this.fetchClients();
	}

	fetchClients = () => {
		this.props.GetClients(''); // set Currency
	};

	 

	onTapSaveChanges = () => {
		this.setState({
			showAlert: true,
			msg: 'All changes will be update on Application API Instantly.',
			title: 'Changes Confirmation!'
		});
	};

	onTapRegister() {
		this.setState({ isAddNew: true });
	}

	onTapBack() {
		this.setState({ isAddNew: false, isEdit: false });
		this.fetchClients();
	}

	onEditPaymentMode(mode) {
		let index = this.state.paymentModes.findIndex((x) => x.id === mode.id);
		let modes = this.state.paymentModes;
		modes[index] = mode;
		this.setState({
			paymentModes: modes
		});
		// this.props.UpdateRouting(mode);
	}

	onDeletePaymentMode(mode) {
		const { id } = mode;
		this.setState({
			id: id,
			showAlert: true,
			msg: 'Are you sure to delete the selected Payment Mode?',
			title: 'Delete Confirmation!'
		});
	}

	onExecuteDeleteCommand() {
		const { id } = this.state;
		// this.props.RemoveRoutes({id});

	}

	render() {
		const { classes, clients } = this.props;
		const { value, isAddNew, showAlert, title, msg } = this.state;
 
		if (isAddNew) {
			return (
				<CardDiv title={'Add Client'}>
					<AddClient onTapBack={this.onTapBack.bind(this)} />
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

					<CardDiv title={'Manage Clients'}>
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
								<Table
									onEditPaymentMode={this.onEditPaymentMode.bind(this)}
									onDeletePaymentMode={this.onDeletePaymentMode.bind(this)}
									isEdit={true}
									paymentModes={clients}
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

ClientManager.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapToProps = (state) => ({
	clients: state.clientReducer.clients,
	isAddNew: state.clientReducer.isAddNew
});

export default connect(mapToProps, { GetClients })(withStyles(styles)(ClientManager));
