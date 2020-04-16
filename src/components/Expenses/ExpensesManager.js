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
			value: 0,
			isAddNew: false,
			isEdit: false,
			current_item: ''
		};
	}

	componentWillReceiveProps(){
		this.setState({ isAddNew: false, isEdit: false });
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

	onEditExpenses = (item) => {
		this.setState({ isAddNew: true, isEdit: true, current_item: item });
	}
 
	onDeleteExpenses(offer) {
		const { id } = offer;
		this.setState({
			id: id,
			showAlert: true,
			msg: 'Are you sure to delete the Expenses?',
			title: 'Delete Confirmation!'
		});
	}

	onExecuteDeleteCommand() {
		const { id } = this.state;
		this.props.RemoveExpenses({ id });
	}

	render() {

		const { classes, offer, expenses } = this.props;
		
		const { value, isAddNew, isEdit, current_item, showAlert, title, msg } = this.state;

		if (isAddNew) {
			return (
				<CardDiv title={'Add Expenses'} isBack={true} onTapBack={this.onTapBack.bind(this)}>
					<AddExpenses current_item={current_item} isEdit={isEdit} onTapBack={this.onTapBack.bind(this)} />
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

					<CardDiv title={'Expennses Details'} isAdd={false} onTapAdd={this.onTapAddNew.bind(this)}>
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
