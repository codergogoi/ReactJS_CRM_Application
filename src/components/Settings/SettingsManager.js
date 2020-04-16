import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// Icons
import EmployeeIcon from '@material-ui/icons/SupervisorAccount';

import DesignationTable from './DesignationTable';
import PolicyTable from './PolicyTable';
import AdminSettings from './AdminSettings';

import AddSettings from './AddSettings';

import Alert from '../Common/Alert';
import { ROLE } from '../../store/actions/AppConst'

//App Classes
import CardDiv from '../Common/CardDiv';

import { connect } from 'react-redux';
import { GetRegions, GetDesignations, GetPolicies, RemoveRegion, RemoveDesignation, RemovePolicy } from '../../store/actions/SettingsActions';

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
		top: theme.spacing.unit * 20,
		right: theme.spacing.unit * 10
	}
});

class SettingsManager extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			currentOffer: '',
			value: 0,
			isAddNew: false,
			type: '',
			isEdit: false,
			current_item : '',
		};
	}
 
	handleChange = (event, value) => {
		
		this.setState({ value: value, current_item: '', isEdit: false });

		if(value === 2){
			this.props.GetDesignations('');
		}if(value === 1){
			this.props.GetPolicies('');
		}else{
			this.props.GetRegions('');
		}
	};

	componentWillMount() {
		this.fetchOffers();
	}

	fetchOffers = () => {
		this.props.GetRegions('');
	};

	 
	onTapAddNew() {

		const { value} = this.state;

		if(value === 2){
			this.setState({
				type: 'REGION',
				isAddNew: true,
			});
		}else if(value === 1){
			this.setState({
				type: 'POLICY',
				isAddNew: true,
			});
		}else{
			this.setState({
				type: 'DESIGNATION',
				isAddNew: true,
			});
		}

	}

	onTapBack = () => {
		this.setState({ isAddNew: false, isEdit: false, type: '' });
		if(this.state.value === 2){
			this.props.GetPolicies('');
		}if(this.state.value === 1){
			this.props.GetDesignations('');
		}else{
			this.props.GetRegions('');

		}
	}

	onCloneClick(legal) {
		this.setState({ isAddNew: true, isEdit: true, currentLegal: legal });
	}

	onCloneNotification(legal) {
		this.setState({
			currentLegal: legal,
			isEdit: true,
			isAddNew: true
		});
	}

	onDeleteItem(item) {
		const { id } = item;
		this.setState({
			id: id,
			showAlert: true,
			msg: 'Are you sure to delete the selected Item?',
			title: 'Delete Confirmation!'
		});
	}

	onExecuteDeleteCommand() {
		const { id } = this.state;
		if(this.state.value === 2){
			this.props.RemoveRegion({ id});
		}if(this.state.value === 1){
			this.props.RemovePolicy({id});
		}else{
			this.props.RemoveDesignation({id});
		}
	}

	onEdit = (item) =>{

		const { value} = this.state;

		if(value === 2){

			this.setState({
				type: 'REGION',
				isAddNew: true,
				current_item: item,
				isEdit: true,
			});

		}else if(value === 1){
			this.setState({
				type: 'POLICY',
				isAddNew: true,
				current_item: item,
				isEdit: true,
			});
		}else{
			this.setState({
				type: 'DESIGNATION',
				isAddNew: true,
				current_item: item,
				isEdit: true,
			});
		}

	}
  
	render() {
		const { classes, regions, designations, policies } = this.props;
		const { value, isAddNew, isEdit, currentLegal, showAlert, title, msg, type, current_item } = this.state;

		if (isAddNew) {
			return (
				<CardDiv title={'Add New '+ type } isBack={true} onTapBack={this.onTapBack.bind(this)}>
					<AddSettings isEdit={isEdit} type={type} current_item={current_item} />
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

					<CardDiv title={'Settings'} isAdd={true} onTapAdd={this.onTapAddNew.bind(this)}>
								
						<Tabs
							value={value}
							onChange={this.handleChange}
							scrollable
							scrollButtons="on"
							indicatorColor="secondary"
							textColor="secondary"
						>
							<Tab label="Designation Settings" icon={<EmployeeIcon />} />							
							<Tab label="Policy Settings" icon={<EmployeeIcon />} />

							{ROLE() === 'deny' && <Tab label="Admin Settings" icon={<EmployeeIcon />} />}

						</Tabs>

						{value === 0 && (
							<TabContainer>
								{designations !== undefined && (<DesignationTable
									onEditItem={this.onEdit.bind(this)}
									onDeleteDesignation={this.onDeleteItem.bind(this)}
									data={designations}
								/>)}
							</TabContainer>
						)}

						{value === 1 && (
							<TabContainer>
							{policies !== undefined && (<PolicyTable
								onEditItem={this.onEdit.bind(this)}
								onDeletePolicy={this.onDeleteItem.bind(this)}
								data={policies}
							/>)}
							</TabContainer>
						)}
						{value === 2 && (
							<TabContainer>
								<AdminSettings />
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

SettingsManager.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapToProps = (state) => ({
	designations: state.settingsReducer.designations,
	regions: state.settingsReducer.regions,
	policies: state.settingsReducer.policies,
});

export default connect(mapToProps, { GetRegions, GetDesignations, GetPolicies, RemoveDesignation, RemoveRegion, RemovePolicy })(withStyles(styles)(SettingsManager));
