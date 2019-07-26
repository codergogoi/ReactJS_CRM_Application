import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';


import Table from './ReportTable';
import Alert from '../Common/Alert';

//App Classes
import CardDiv from '../Common/CardDiv';

import { connect } from 'react-redux';
import { GetReports } from '../../store/actions/ReportActions';

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

	 
	componentWillMount() {
		this.props.GetReports('');
	} 

	onTapBack() {
		this.setState({ isAddNew: false, isEdit: false });
		this.props.GetReports('');
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
		 
	}

	onExecuteDeleteCommand() {
		const { id } = this.state;
		 
	}

	render() {

		const { classes, reports } = this.props;
		const {  showAlert, title, msg } = this.state;

 
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
						
							<Table
								onEditFields={this.onEditFields.bind(this)}
								onDeleteOffer={this.onDeleteOffer.bind(this)}
								data={reports}
							/>
						 
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
});

export default connect(mapToProps, { GetReports })(withStyles(styles,{ withTheme: true })(ReportManager));
