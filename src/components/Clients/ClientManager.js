import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

// Icons
import EmployeeIcon from '@material-ui/icons/SupervisorAccount';

import Table from './ClientTable';
import Alert from '../Common/Alert';
import NewClientsTable from './NewClients';

//App Classes
import CardDiv from '../Common/CardDiv';
import AddClient from './AddClient';

import { connect } from 'react-redux';
import { GetClients, GetNewClients, RemoveClient } from '../../store/actions/ClientActions';

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
			isEdit: false,
			current_client: null
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
		this.props.GetNewClients('');
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
	}


	onEditClient = (client) => {
		
		console.log(JSON.stringify(client));
		this.setState({
			current_client: client,
			isEdit: true,
			isAddNew: true
		})
	}

	onDeletePaymentMode(mode) {
		const { id } = mode;
		this.setState({
			id: id,
			showAlert: true,
			msg: 'Are you sure to delete the selected Client?',
			title: 'Delete Confirmation!'
		});
	}

	onExecuteDeleteCommand() {
		const { id } = this.state;
		 this.props.RemoveClient({id});
	}

	render() {
		const { classes, clients, new_clients } = this.props;
		const { value, isAddNew, showAlert, title, msg, isEdit, current_client } = this.state;
 
		if (isAddNew) {
			return (
				<CardDiv title={'Add Client'} isBack={true} onTapBack={this.onTapBack.bind(this)}>
					<AddClient isEdit={isEdit} current_client={current_client} />
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

					<CardDiv title={'Manage Clients'} isAdd={false} onTapAdd={this.onTapRegister.bind(this)}>
						 
						<Tabs
							value={value}
							onChange={this.handleChange}
							scrollable
							scrollButtons="on"
							indicatorColor="secondary"
							textColor="secondary"
						>
							<Tab label="New Clients" icon={<EmployeeIcon />} />							
							<Tab label="Clients" icon={<EmployeeIcon />} />

						</Tabs>

						{value === 0 && (
							<TabContainer>
								{new_clients !== undefined && <NewClientsTable
									onEditClient={this.onEditClient.bind(this)}
									onDeletePaymentMode={this.onDeletePaymentMode.bind(this)}
									clients={new_clients}
								/>}
								
							</TabContainer>
						)}

						{value === 1 && (
							<TabContainer>
								<Table
									onEditClient={this.onEditClient.bind(this)}
									onDeletePaymentMode={this.onDeletePaymentMode.bind(this)}
									paymentModes={clients}
								/>
							</TabContainer>
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
	new_clients: state.clientReducer.new_clients,
	isAddNew: state.clientReducer.isAddNew
});

export default connect(mapToProps, { GetClients, GetNewClients, RemoveClient })(withStyles(styles)(ClientManager));
