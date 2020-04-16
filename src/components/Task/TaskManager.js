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
import GroupTaskTable from './ViewGroupTaskTable';

import { connect } from 'react-redux';
import { GetTask, RemoveTask, RemoveGroupedTask, GetGroupTask } from '../../store/actions/TaskActions';
import ViewTaskDetails from './ViewTaskDetails';

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
		top: theme.spacing.unit ,
		right: theme.spacing.unit
	},
	btnRightB: {
		position: 'absolute',
		bottom: theme.spacing.unit,
		left: theme.spacing.unit
	}
});

class TaskManager extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			tasks: [],
			value: 0,
			isGroupDelete: false,
			isAddNew: false,
			isViewTask: false,
			isEdit: false,
			current_task: null,
			isViewGroupTask: false,
			task: ''
		};
	}

	componentWillReceiveProps(){
		this.setState({ isAddNew: false, isEdit: false, isViewTask: false });
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
		this.setState({ isAddNew: false, isEdit: false, isViewTask: false });
		this.fetchTask();
	}

	onTapBackFromGroups() {
		this.setState({ isAddNew: false, isEdit: false, isViewGroupTask: false, isViewTask: false });
		this.fetchTask();
	}


	onEditPaymentMode = (mode) => {
		
		let index = this.state.sdks.findIndex((x) => x.id === mode.id);
		let modes = this.state.sdks;
		modes[index] = mode;
		this.setState({
			sdks: modes
		});

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

	onTapViewDetails  = (task) => {
		this.setState({
			isViewTask: true,
			current_task: task
		});
	}

	onEditTask = (task) => {
		this.setState({
			current_task: task,
			isEdit: true,
			isAddNew: true
		})
	}
	

	onDeleteGroupTask = (task) => {

			this.setState({
				task: task,
				showAlert: true,
				isGroupDelete: true,
				msg: 'Are you sure to delete the selected Task ?',
				title: 'Delete Confirmation!'
			});
	}




	onViewGroupTask = (task) => {

		const { group_id } = task;

		this.props.GetGroupTask({group_id});
		
		this.setState({
			isViewGroupTask: true,
		})
	}

	onExecuteDeleteCommand() {
		const { id } = this.state;
		this.props.RemoveTask({id});
	}

	

	onTapAdd = () => {

		this.setState({
			isAddNew: true
		});

	}

	render() {

		const { classes, tasks, groups } = this.props;

		const { value, isAddNew, showAlert, title, msg, current_task, isEdit,isViewGroupTask, isViewTask } = this.state;

		 if(isViewTask){
			return (
				<CardDiv title={ 'View Task Details'} isBack={true} onTapBack={this.onTapBack.bind(this)}>
					<ViewTaskDetails current_task={current_task} />
				</CardDiv>
			);
		}else if(isViewGroupTask && groups !== undefined){
			return (
				
				<CardDiv title={'View Group Task'} isBack={true} onTapBack={this.onTapBackFromGroups.bind(this)}>
					<Alert
						open={showAlert}
						onCancel={this.onDismiss.bind(this)}
						onOkay={this.onOkay.bind(this)}
						title={title}
						msg={msg}
					/>
					<GroupTaskTable 
						groupTaskData={groups}
						onTapViewDetails = {this.onTapViewDetails.bind(this)}
						onDeleteGroupTask={this.onDeleteGroupTask.bind(this)}
					/>
				</CardDiv>
			);
		}else if (isAddNew) {
			return (
				<CardDiv title={ isEdit !== true ? 'Add Task' : 'Edit Task'} isBack={true} onTapBack={this.onTapBack.bind(this)}>
					<AddTask  isEdit={isEdit} current_task={current_task} onTapBack={this.onTapBack.bind(this)} />
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
					<CardDiv title={'Manage Task'} isAdd={true} onTapAdd={this.onTapAdd.bind(this)}>
						{value === 0 && (
							<div>
								{tasks !== undefined && (
								<Table
									onEditPaymentMode={this.onEditPaymentMode.bind(this)}
									onTapGroupTask={this.onViewGroupTask.bind(this)}
									onDeleteSDK={this.onDeleteSDK.bind(this)}
									paymentModes={tasks}
									onEditTask={this.onEditTask.bind(this)}
									onTapViewDetails = {this.onTapViewDetails.bind(this)}
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
		if(this.state.isGroupDelete){
			this.setState({ isGroupDelete: false });
			this.props.RemoveGroupedTask(this.state.task);
		}else{
			this.onExecuteDeleteCommand();
		}
	};
}

TaskManager.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapToProps = (state) => ({
	tasks: state.taskReducer.tasks,
	groups: state.taskReducer.groups
});

export default connect(mapToProps, { GetTask, RemoveTask, RemoveGroupedTask,GetGroupTask })(withStyles(styles)(TaskManager));
