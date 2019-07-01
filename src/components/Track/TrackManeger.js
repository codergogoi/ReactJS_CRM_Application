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
import Table from './TrackUserTable';
import Alert from '../Common/Alert';

//App Classes
import CardDiv from '../Common/CardDiv';

import { connect } from 'react-redux';
import { GetOffers, RemoveOffers } from '../../store/actions/OfferActions';

import GMap from './GMap';

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

class TrackManager extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			currentOffer: '',
			value: 0,
			isAddNew: false,
			isEdit: false
		};
	}

	handleChange = (event, value) => {
		this.setState({ value });
	};

	componentWillMount() {
		this.fetchOffers();
	}

	fetchOffers = () => {
		this.props.GetOffers('');
	};

	 
	onTapAddNew() {
		this.setState({ isAddNew: true });
	}

	onTapBack() {
		this.setState({ isAddNew: false, isEdit: false });
		this.fetchOffers();
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

	onExecuteDeleteCommand() {
		const { id } = this.state;
		this.props.RemoveOffers({ id });
	}

	render() {
		const { classes, offer, offers } = this.props;
		const { value, isAddNew, isEdit, currentOffer, showAlert, title, msg } = this.state;

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

					<CardDiv title={'Track Live Users'}>
						<div> Search Text Field</div>
						<GMap />
			
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

TrackManager.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapToProps = (state) => ({
	offers: state.offerReducer.offers
});

export default connect(mapToProps, { GetOffers, RemoveOffers })(withStyles(styles)(TrackManager));
