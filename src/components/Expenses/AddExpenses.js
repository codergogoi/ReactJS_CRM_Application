import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import NativeSelect from '@material-ui/core/NativeSelect';

// Icons
import AddEmployeeIcon from '@material-ui/icons/PersonAdd';
import BackIcon from '@material-ui/icons/ArrowBack';

// App Classes
import Alert from '../Common/Alert';

import { connect } from 'react-redux';
import { GetExpenses, DismissAlert } from '../../store/actions/ExpensesActions';

// CSS Module
const styles = (theme) => ({
	root: {
		width: '90%'
	},
	groupForm: {
		width: '100%',
		flexDirection: 'column'
	},
	formContent: {
		width: '45%',
		backgroundColor: '#66ffcc',
		display: 'flex'
	},
	button: {
		marginTop: theme.spacing.unit,
		marginRight: theme.spacing.unit
	},

	input: {
		display: 'none'
	},
	actionsContainer: {
		marginTop: 30,
		marginBottom: theme.spacing.unit * 2
	},
	resetContainer: {
		padding: theme.spacing.unit * 3
	},
	formControl: {
		width: '50%',
		backgroundColor: '#663354',
		display: 'flex',
		margin: theme.spacing.unit
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: 300
	},
	formInputs: {
		width: '90%',
		backgroundColor: '#FF3322',
		flexDirection: 'row'
	},
	groupInputs: {
		width: '90%',
		backgroundColor: '#dd6655'
	},
	selectEmpty: {
		marginTop: theme.spacing.unit * 2,
		marginLeft: 10
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

function getSteps() {
	return [ 'Offer Details', 'Finish' ];
}

class AddExtension extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			offer_id: 0,
			currentOffer: this.props.currentOffer,
			clone: this.props.clone,
			offer_content: '',
			promo: '',
			country: 'IN',
			
		};
	}

	componentWillMount() {
		const { clone, currentOffer } = this.state;

		if (clone) {
			this.setState({
				offer_content: currentOffer.msg,
				offer_type: currentOffer.from_sector,
				promo: currentOffer.to_sector,
				country: currentOffer.country,
			});
		}
	}

	handleNext = () => {
		const { activeStep } = this.state;

		if (activeStep === 0) {
			this.onTapNext();
		} else if (activeStep === 1) {
			this.onPostUpload();
		} else {
			this.handleReset();
		}
	};

	//ALERT
	onDismiss = () => {
		this.setState({ showAlert: false });
		this.props.DismissAlert();
	};

	onOkay = () => {
		this.setState({ showAlert: false });
		this.props.DismissAlert();
	};

	handleReset = () => {
		this.setState({
			activeStep: 0
		});
	};

	handlePlatform = (event) => {
		this.setState({ aui: event.target.value });
	};

	handleCountryChange = (event) => {
		this.setState({ country: event.target.value });
	};

	onTapBack = () => {
		this.props.onTapBack();
	};

	// Post data to Server
	onTapNext = () => {
		this.onTapAddNewOffer();
	};

	onTapAddNewOffer = () => {

		const { offer_content, offer_type, promo,country } = this.state;

		if (offer_content.length < 1) {
			this.setState({
				showAlert: true,
				msg: 'Please provide Offer Content text',
				title: 'Offers Content is Missing!'
			});
			return;
        }
        
        if (offer_type.length < 1) {
			this.setState({
				showAlert: true,
				msg: 'Please provide Offer Type text',
				title: 'Offers Type is Missing!'
			});
			return;
		}


		this.props.NewOffers({ offer_content, offer_type, promo,country  });
	};
	
	handleTextChanges = (event) => {
		if (event.target.id === 'offer-content') {
			this.setState({ offer_content: event.target.value });
		} else if (event.target.id === 'promo-type') {
			this.setState({ offer_type: event.target.value });
		} else if (event.target.id === 'promo-code') {
			this.setState({ promo: event.target.value });
		} 
	};

	//Add OfferUI
	addOfferUI = () => {
		const { classes } = this.props;
		const { offer_content, offer_type, promo, } = this.state;

		return (
			<Grid container spacing={24}>
				<Grid item xs={6}>
					<FormControl>
						<TextField
							id="offer-content"
							label="Offer Content"
							className={classes.textField}
							type="text"
							required="true"
							multiline="true"
							rows="5"
							margin="normal"
							onChange={this.handleTextChanges.bind(this)}
							value={offer_content}
						/>
						<TextField
							id="promo-type"
							label="Promo Type"
							className={classes.textField}
							type="text"
							autoComplete="From Sector"
							margin="normal"
							onChange={this.handleTextChanges.bind(this)}
							value={offer_type}
						/>
						<TextField
							id="promo-code"
							label="Promo Code"
							className={classes.textField}
							type="text"
							autoComplete="From Sector"
							margin="normal"
							onChange={this.handleTextChanges.bind(this)}
							value={promo}
						/>
						 
					</FormControl>
                    <Button
							variant="extendedFab"
							color="secondary"
							className={classes.button}
							onClick={this.onTapAddNewOffer.bind(this)}
						>
							Add Offer <AddEmployeeIcon className={classes.rightIcon} />
					</Button>
				</Grid>
				
			</Grid>
		);
	};

	render() {
		const { classes } = this.props;
		const { showAlert, title, msg } = this.state;

		return (
			<div className={classes.root}>
				<Button
					variant="extendedFab"
					color="secondary"
					className={classes.btnRightA}
					onClick={this.onTapBack.bind(this)}
				>
					Back <BackIcon className={classes.rightIcon} />
				</Button>

				<Alert
					open={this.props.isAdded}
					onCancel={this.onOkay.bind(this)}
					onOkay={this.onOkay.bind(this)}
					title= "Added Successfully"
					msg="Offer Added Successfully!"
				/>

				<Alert
					open={showAlert}
					onCancel={this.onOkay.bind(this)}
					onOkay={this.onOkay.bind(this)}
					title={title}
					msg={msg}
				/>
				
				{this.addOfferUI() }
				
			</div>
		);
	}
}

AddExtension.propTypes = {
	classes: PropTypes.object
};

const mapStateToProps = (state) => ({
	isAdded: state.expensesReducer.isAdded
});

export default connect(mapStateToProps, { GetExpenses, DismissAlert }) (withStyles(styles)(AddExtension));