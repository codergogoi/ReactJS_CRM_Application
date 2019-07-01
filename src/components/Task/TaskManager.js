import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// Icons
import AddOffersIcon from '@material-ui/icons/CardGiftcard';

import Table from './TaskTable';
import Alert from '../Common/Alert';

//App Classes
import CardDiv from '../Common/CardDiv';
import AddTask from './AddTask';

import { connect } from 'react-redux';
import { GetTask, RemoveTask } from '../../store/actions/TaskActions';

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

class TaskManager extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			tasks: [],
			value: 0,
			isAddNew: false,
			isEdit: false
		};
	}

	handleChange = (event, value) => {
		this.setState({ value });
	};

	componentWillMount() {
		this.fetchTask();
	}

	fetchTask() {
		this.props.GetTask('');
	}
 
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
		this.fetchTask();
	}

	onEditPaymentMode = (mode) => {
		
		let index = this.state.sdks.findIndex((x) => x.id === mode.id);
		let modes = this.state.sdks;
		modes[index] = mode;
		this.setState({
			sdks: modes
		});
		// this.props.UpdateChanges(mode);
	}

	onDeleteSDK(sdk) {
		const { id } = sdk;
		this.setState({
			id: id,
			showAlert: true,
			msg: 'Are you sure to delete the selected Task ?',
			title: 'Delete Confirmation!'
		});
	}

	onExecuteDeleteCommand() {
		const { id } = this.state;
		this.props.RemoveTask({id});
	}

	render() {

		const { classes, tasks } = this.props;
		const { value, isAddNew, showAlert, title, msg } = this.state;

		if (isAddNew) {
			return (
				<CardDiv title={'Add Task'}>
					<AddTask onTapBack={this.onTapBack.bind(this)} />
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

					<CardDiv title={'Manage Task'}>
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
								{tasks !== undefined && (
								<Table
									onEditPaymentMode={this.onEditPaymentMode.bind(this)}
									onDeleteSDK={this.onDeleteSDK.bind(this)}
									paymentModes={tasks}
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

TaskManager.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapToProps = (state) => ({
	tasks: state.taskReducer.tasks
});

export default connect(mapToProps, { GetTask, RemoveTask })(withStyles(styles)(TaskManager));
