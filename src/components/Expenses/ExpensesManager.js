import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// Icons
import AddOffersIcon from '@material-ui/icons/CardGiftcard';
import Table from './ExpensesTable';
import Alert from '../Common/Alert';

//App Classes
import CardDiv from '../Common/CardDiv';
import AddExpenses from './AddExpenses';

import { connect } from 'react-redux';
import { GetExpenses, RemoveExpenses } from '../../store/actions/ExpensesActions';

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

class ExpensesManager extends Component {
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
		this.fetchExpenses();
	}

	fetchExpenses = () => {
		this.props.GetExpenses('');
	};

	 
	onTapAddNew() {
		this.setState({ isAddNew: true });
	}

	onTapBack() {
		this.setState({ isAddNew: false, isEdit: false });
		this.fetchExpenses();
	}

	onEditExpenses(item) {
		// this.setState({ isAddNew: true, isEdit: true, currentOffer: offer });
	}

 
	onDeleteExpenses(offer) {
		const { id } = offer;
		this.setState({
			id: id,
			showAlert: true,
			msg: 'Are you sure to delete the Offer?',
			title: 'Delete Confirmation!'
		});
	}

	onExecuteDeleteCommand() {
		const { id } = this.state;
		this.props.RemoveExpenses({ id });
	}

	render() {

		const { classes, offer, expenses } = this.props;
		
		const { value, isAddNew, isEdit, currentOffer, showAlert, title, msg } = this.state;

		if (isAddNew) {
			return (
				<CardDiv title={'Add Expenses'}>
					<AddExpenses currentOffer={currentOffer} clone={isEdit} onTapBack={this.onTapBack.bind(this)} />
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

					<CardDiv title={'Expenses Report'}>
						<Button
							variant="extendedFab"
							color="secondary"
							className={classes.btnRightA}
							onClick={this.onTapAddNew.bind(this)}
						>
							Add <AddOffersIcon className={classes.rightIcon} />
						</Button>
						<Table
							onEditExpenses={this.onEditExpenses.bind(this)}
							onDeleteExpenses={this.onDeleteExpenses.bind(this)}
							data={expenses}
						/>
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

ExpensesManager.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapToProps = (state) => ({
	expenses: state.expensesReducer.expenses
});

export default connect(mapToProps, { GetExpenses, RemoveExpenses })(withStyles(styles)(ExpensesManager));
