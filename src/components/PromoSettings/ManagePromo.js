import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PromoIcon from '@material-ui/icons/Receipt';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';

// Icons
import Alert from '../Common/Alert';

//App Classes
import CardDiv from '../Common/CardDiv';

import { connect } from 'react-redux';
import { GetPromos, AddPromo } from '../../actions/PromoActions';

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
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit
	},
	bar: {
		backgroundColor: '#1a237e'
	},
	rightIcon: {
		marginLeft: theme.spacing.unit
	},
	btnRightA: {
		position: 'absolute',
		top: theme.spacing.unit * 12,
		right: theme.spacing.unit * 10
	},
	chip: {
		margin: theme.spacing.unit / 2
	}
});

class ManagePromo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			promoName: '',
			offers: [],
			currentOffer: '',
			value: 0,
			isAddNew: false,
			isEdit: false,
			promocodes: []
		};
	}

	handleChange = (event, value) => {
		this.setState({ value });
	};

	onTapDelete = (event) => {
		console.log('Unable to Delete! :)');
	};

	handleTextChanges = (event) => {
		if (event.target.id === 'promo-name') {
			this.setState({ promoName: event.target.value });
		}
	};

	componentWillMount() {
		this.fetchPromocodes();
	}

	fetchPromocodes = () => {
		this.setState({
			promocodes: []
		});
		this.props.GetPromos('');
	};

	didFetchPromocodes = () => {
		const promocodes = this.props.promocodes;

		if (promocodes.data !== undefined) {
			if (promocodes.data.status === 200) {
				const responseString = JSON.parse(JSON.stringify(promocodes.data));
				if (this.state.promocodes.length < 1) {
					this.setState({ promocodes: responseString.data });
				}
			}
		}
	};

	onTapAddNew() {
		this.setState({ isAddNew: true });
	}

	onTapUpdatePromo = () => {
		this.setState({
			isAddNew: false,
			promocodes: []
		});
		this.props.AddPromo(this.state.promoName);
	};

	render() {
		const { classes } = this.props;
		const { isAddNew, showAlert, title, msg, promoName } = this.state;

		this.didFetchPromocodes();

		return (
			<div>
				<Alert
					open={showAlert}
					onCancel={this.onDismiss.bind(this)}
					onOkay={this.onOkay.bind(this)}
					title={title}
					msg={msg}
				/>

				<CardDiv title={'Manage Promo'}>
					{isAddNew === true ? (
						<div className={classes.btnRightA}>
							<TextField
								id="promo-name"
								label="Promo Code Name"
								className={classes.selectionField}
								type="text"
								margin="normal"
								onChange={this.handleTextChanges.bind(this)}
								value={promoName}
							/>

							<Button variant="extendedFab" color="secondary" onClick={this.onTapUpdatePromo.bind(this)}>
								<SaveIcon />
							</Button>
						</div>
					) : (
						<Button
							variant="extendedFab"
							color="secondary"
							className={classes.btnRightA}
							onClick={this.onTapAddNew.bind(this)}
						>
							Add <PromoIcon className={classes.rightIcon} />
						</Button>
					)}

					{this.state.promocodes.map((data) => {
						let icon = null;

						if (data.label === 'React') {
							icon = <PromoIcon />;
						}

						return (
							<Chip
								key={data.id}
								onDelete={this.onTapDelete.bind(this)}
								icon={icon}
								label={data.promo}
								className={classes.chip}
							/>
						);
					})}
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

ManagePromo.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapToProps = (state) => ({
	promocodes: state.promoReducer.promocodes
});

export default connect(mapToProps, { GetPromos, AddPromo })(withStyles(styles)(ManagePromo));
