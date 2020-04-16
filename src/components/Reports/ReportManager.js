import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import Table from './ReportTable';
import Alert from '../Common/Alert';

//App Classes
import CardDiv from '../Common/CardDiv';

import EmployeeIcon from '@material-ui/icons/SupervisorAccount';

import { connect } from 'react-redux';
import { GetReports , GetProgressRatio } from '../../store/actions/ReportActions';

import ProgressReport from './ProgressReport';

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
		width: 500,

		// width: '100%'
	},
	bar: {
		backgroundColor: '#1a237e'
	},
	rightIcon: {
		marginLeft: theme.spacing.unit
	},
	btnRightA: {
		position: 'absolute',
		top: theme.spacing.unit * 20,
		right: theme.spacing.unit * 10
	},
});

class ReportManager extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			country_fields: [],
			value: 0,
			isAddNew: false,
			isEdit: false,
			isCountry: true,
		};
	}

	 
	handleChange = (event, value) => {
		
		this.setState({ value: value });

		// if(value === 2){
		// 	this.props.GetPolicies('');
		// }if(value === 1){
		// 	this.props.GetDesignations('');
		// }else{
		// 	this.props.GetRegions('');
		// }
	};

	componentWillMount() {
		this.props.GetProgressRatio();
		this.props.GetReports('');

	} 

	onTapBack() {
		this.setState({ isAddNew: false, isEdit: false });
		this.props.GetReports('');
	}

	onCloneClick(offer) {
		this.setState({ isAddNew: true, isEdit: true, currentOffer: offer });
	}

	onCloneNotification(offer) {
		this.setState({
			currentOffer: offer,
			isEdit: true,
			isAddNew: true
		});
	}

	onDeleteOffer(offer) {
		const { id } = offer;
		this.setState({
			id: id,
			showAlert: true,
			msg: 'Are you sure to delete the selected User?',
			title: 'Delete Confirmation!'
		});
	}

	onEditFields = (field) => {
		
		let index = this.state.country_fields.findIndex((x) => x.id === field.id);
		let fields = this.state.country_fields;
		fields[index] = field;
		this.setState({
			country_fields: fields
		});
		 
	}

	onExecuteDeleteCommand() {
		const { id } = this.state;
		 
	}

	render() {

		const { classes, reports, ratio, task } = this.props;
		const {  showAlert, title, msg, value } = this.state;

		 
 
			return (
				<div>
					<Alert
						open={showAlert}
						onCancel={this.onDismiss.bind(this)}
						onOkay={this.onOkay.bind(this)}
						title={title}
						msg={msg}
					/>

					<CardDiv className={classes.root} title={'Reports'}>
						
							
						 <Tabs
							value={value}
							onChange={this.handleChange}
							scrollable
							scrollButtons="on"
							indicatorColor="secondary"
							textColor="secondary"
						>
							<Tab label="Progress Report" icon={<EmployeeIcon />} />							
							<Tab label="User Report" icon={<EmployeeIcon />} />

						</Tabs>

								{value === 0 && (
									<TabContainer>
										{task !== undefined && ratio !== undefined && <ProgressReport  ratio={ratio} task={task}/>	}
									</TabContainer>
								)}

								{value === 1 && (
									<TabContainer>
										{reports !== undefined && <Table
											onEditFields={this.onEditFields.bind(this)}
											onDeleteOffer={this.onDeleteOffer.bind(this)}
											data={reports}
										/>}
									</TabContainer>
								)}
								
					</CardDiv>
				</div>
			);
		
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

ReportManager.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
};

const mapToProps = (state) => ({
	reports: state.reportReducer.reports,
	ratio: state.reportReducer.ratio,
	task: state.reportReducer.task
});

export default connect(mapToProps, { GetReports, GetProgressRatio })(withStyles(styles,{ withTheme: true })(ReportManager));
