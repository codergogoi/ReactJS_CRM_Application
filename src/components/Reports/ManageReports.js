import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


// Icons
import AddOffersIcon from '@material-ui/icons/CardGiftcard';
import CountryIcon from '@material-ui/icons/Flag';
import AirlinesIcon from '@material-ui/icons/Flight';


import Table from './PassportMandatTable';
import AirlinesTable from './PassportAirlinesManadatTable';
import axios from 'axios';
import Alert from '../Common/Alert';

//App Classes
import CardDiv from '../Common/CardDiv';
import { BASE_URL } from '../../store/actions/AppConst';

import { connect } from 'react-redux';
import { GetMandatForAirlines, GetMandatForCountry, UpdateCountryChanges, UpdateAirlinesChanges , RemoveAirlinesField, RemoveCountryField} from '../../store/actions/PassportActions';
import PassportAirlinesManadatTable from './PassportAirlinesManadatTable';

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

class ManageReports extends Component {
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
		this.setState({ value });

		if(value === 1){
			this.fetchAirlinesMandatFields();
			this.setState({
				isCountry: false
			});
		}else{
			this.setState({
				isCountry: true
			});
		}
	};

	componentWillMount() {
		this.fetchOffers();
	}

	fetchOffers = () => {
		this.props.GetMandatForCountry();
	};


	fetchAirlinesMandatFields = () => {
		this.props.GetMandatForAirlines();
	}

	 
	onTapAddNewFields() {
		this.setState({ isAddNew: true });
	}


	onTapBack() {
		this.setState({ isAddNew: false, isEdit: false });

		this.fetchAirlinesMandatFields();
		this.fetchOffers();
		/*
		if(this.state.isCountry){
			
		}else{
			
		}
		*/
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
		if(this.state.isCountry){
			this.props.UpdateCountryChanges(field);
		}else{
			this.props.UpdateAirlinesChanges(field);
		}
	}

	onExecuteDeleteCommand() {
		const { id } = this.state;
		if(this.state.isCountry){
			this.props.RemoveCountryField({ id });
		}else{
			this.props.RemoveAirlinesField({ id });
		}
	}

	render() {

		const { classes, country_fields, airlines_fields, theme ,} = this.props;
		const { value, isAddNew, isEdit, currentOffer, showAlert, title, msg, isCountry } = this.state;

		if (isAddNew) {
			return (
				<CardDiv title={'Add Offers'} />
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

					<CardDiv className={classes.root} title={'Passport Mandatory Fields'}>
						<Tabs
							value={value}
							onChange={this.handleChange}
							scrollable
							scrollButtons="on"
							indicatorColor="secondary"
							textColor="secondary"
						>
							<Tab label="For Country" icon={<CountryIcon />} />
							<Tab label="For Airlines" icon={<AirlinesIcon />} />
						</Tabs>

						{value === 0 && (
							<TabContainer>
								<Button
									variant="extendedFab"
									color="secondary"
									className={classes.btnRightA}
									onClick={ this.onTapAddNewFields.bind(this)}
								>
								Add <AddOffersIcon className={classes.rightIcon} />
							</Button>
							<Table
								onEditFields={this.onEditFields.bind(this)}
								onDeleteOffer={this.onDeleteOffer.bind(this)}
								data={country_fields}
							/>
							</TabContainer>
						)}
						{value === 1 && (
							<TabContainer>
								<Button
									variant="extendedFab"
									color="secondary"
									className={classes.btnRightA}
									onClick={this.onTapAddNewFields.bind(this)}

								>
								Add <AddOffersIcon className={classes.rightIcon} />
							</Button>
							<PassportAirlinesManadatTable
								onEditFields={this.onEditFields.bind(this)}
								onDeleteOffer={this.onDeleteOffer.bind(this)}
								isCountry={false}
								data={airlines_fields}
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

ManageReports.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,

};

const mapToProps = (state) => ({
	country_fields: state.passportReducer.country_fields,
	airlines_fields: state.passportReducer.airlines_fields
});

export default connect(mapToProps, { GetMandatForAirlines, 
	GetMandatForCountry, UpdateCountryChanges,
	UpdateAirlinesChanges, RemoveAirlinesField, RemoveCountryField })(withStyles(styles,{ withTheme: true })(ManageReports
	));
