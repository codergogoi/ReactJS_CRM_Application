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

import DesignationTable from './DesignationTable';
import RegionTable from './RegionTable';
import PolicyTable from './PolicyTable';

import AddSettings from './AddSettings';

import axios from 'axios';
import Alert from '../Common/Alert';

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
			isEdit: false
		};
	}

	handleChange = (event, value) => {
		this.setState({ value });
		if(value === 2){
			this.props.GetPolicies('');
		}if(value === 1){
			this.props.GetDesignations('');
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
		this.setState({ isAddNew: true });
	}

	onTapBack() {
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
			this.props.RemovePolicy({id});
		}if(this.state.value === 1){
			this.props.RemoveDesignation({id});
		}else{
			this.props.RemoveRegion({ id});
		}
	}

	//Region
	onTapAddNewRegion = () => {
		this.setState({
			type: 'REGION',
			isAddNew: true,
		});
	}
	
	onTapEditRegion = () => {



	}

	onTapDeleteRegion = () => {


	}

	 

	//Designation
	onTapAddNewDesignation = () => {
		this.setState({
			type: 'DESIGNATION',
			isAddNew: true,
		});
	}

	onTapEditDesignation = () => {
		
	}

	onTapDeleteDesignation = () => {


	}

	//Policy
	onTapAddNewPolicy = () => {
		this.setState({
			type: 'POLICY',
			isAddNew: true,
		});
	}


	onTapEditDesignation = () => {
		
	}

	onTapDeleteDesignation = () => {


	}

	render() {
		const { classes, regions, designations, policies } = this.props;
		const { value, isAddNew, isEdit, currentLegal, showAlert, title, msg, type } = this.state;

		if (isAddNew) {
			return (
				<CardDiv title={'Add Offers'}>
					<AddSettings type={type} onTapBack={this.onTapBack.bind(this)} />
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

					<CardDiv title={'Settings'}>
								
						<Tabs
							value={value}
							onChange={this.handleChange}
							scrollable
							scrollButtons="on"
							indicatorColor="secondary"
							textColor="secondary"
						>
							<Tab label="Region Settings" icon={<EmployeeIcon />} />
							<Tab label="Designation Settings" icon={<EmployeeIcon />} />
							<Tab label="Policy Settings" icon={<EmployeeIcon />} />
						</Tabs>

						{value === 0 && (
							<TabContainer>
								<Button
									variant="extendedFab"
									color="secondary"
									className={classes.btnRightA}
									onClick={ this.onTapAddNewRegion}
								>
								Add <AddOffersIcon className={classes.rightIcon} />
							</Button>
							{regions !== undefined && (<RegionTable
								onEditFields={this.onTapEditRegion.bind(this)}
								onDeleteRegion={this.onDeleteItem.bind(this)}
								data={regions}
							/>)}
							</TabContainer>
						)}
						{value === 1 && (
							<TabContainer>
								<Button
									variant="extendedFab"
									color="secondary"
									className={classes.btnRightA}
									onClick={this.onTapAddNewDesignation}

								>
								Add <AddOffersIcon className={classes.rightIcon} />
							</Button>
							{designations !== undefined && (<DesignationTable
								onEditFields={this.onTapEditDesignation.bind(this)}
								onDeleteDesignation={this.onDeleteItem.bind(this)}
								data={designations}
							/>)}
							</TabContainer>
						)}
						{value === 2 && (
							<TabContainer>
								<Button
									variant="extendedFab"
									color="secondary"
									className={classes.btnRightA}
									onClick={this.onTapAddNewPolicy.bind(this)}

								>
								Add <AddOffersIcon className={classes.rightIcon} />
							</Button>
							{policies !== undefined && (<PolicyTable
								onEditFields={this.onTapEditDesignation.bind(this)}
								onDeletePolicy={this.onDeleteItem.bind(this)}
								data={policies}
							/>)}
							
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
