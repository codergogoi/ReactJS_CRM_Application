import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import Chip from '@material-ui/core/Chip';




import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
 

const styles = (theme) => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 2,
		boxShadow: 'none',
		backgroundColor: theme.palette.background.paper,
		position: 'relative',
		overflow: 'auto',
		maxHeight: 600,
	},
	 
	  listSection: {
		backgroundColor: 'inherit',
		
	  },
	  ul: {
		backgroundColor: 'inherit',
		padding: 0,
	  },
	  calHeader:{
		  display: 'flex',
		  fontSize: 30,
		  color: '#FFF',
		  fontWeight: 'bold',
		  backgroundColor: '#212F3C',
		  marginTop: 15,
		  marginBottom: 15,
	  },
	  identicalMark:{
		  display: 'flex',
		  backgroundColor: '#F1A570',
		  width: '100%',
		  height: '5px'
		},
	  attendee: {
		  display: 'flex',
		  flexDirection: 'column',
		  paddingLeft: 100,
		  width: '90%'
	  },
	  attendanceTable:{
		color: '#9A9A9A',
		display: 'flex',
		flexDirection: 'row',
		width: '90%',
		justifyContent: 'space-around',
		padding: 10,
		paddingLeft: 20,
		borderRadius: 20,
	  },

	  attendanceTableRed:{
		backgroundColor: '#FFE1E1',
		color: '#9A9A9A',
		display: 'flex',
		flexDirection: 'row',
		width: '90%',
		justifyContent: 'space-around',
		padding: 10,
		paddingLeft: 20,
		borderRadius: 20,
	  },

	  empName: {
		  display: 'flex',
		  width: '150px',
		  
	  },
	  clientName: {
		display: 'flex',
		width: '200px',
		
	},
	  chipBasic: {
		margin: theme.spacing.unit,
		fontSize: 20,
		fontWeight: 'bold',
		color: '#0E8367',
	  },
	  chipRed: {
		margin: theme.spacing.unit,
		backgroundColor: '#F16666',
		color: '#FFF'
	  },
	  chipGreen: {
		margin: theme.spacing.unit,
		backgroundColor: '#74AD75',
	  },
	  chipYellow: {
		margin: theme.spacing.unit,
		backgroundColor: '#D6B34E',
	  },




	checkIn:{
		color: '#74AD75'
	},
	checkOut:{
		color: '#D36760'
	}
});

class ReportTable extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			 
		};
	}


	render() {
		const { classes, data } = this.props;
		
		return (<List className={classes.root} subheader={<li />}>
			{data.map((n) => (
				<li key={n.emp_id} className={classes.listSection}>
				<ul className={classes.ul}>
					<ListSubheader className={classes.calHeader}>
						{`${n.emp} ${n.mobile}`}
					</ListSubheader>
						
						<div className={classes.attendee}>

							
							{n.report !== null &&  n.report.map((item) => (
								<div>
								<Divider />	
								<ListItem key={`${n.emp_id}-${item.id}`}>
									<div className={item.over_due ? classes.attendanceTableRed: classes.attendanceTable}>
										<ListItemText className={classes.empName} primary={`${item.title}`} />
										<ListItemText className={classes.clientName} primary={`${item.client}`} />
										<ListItemText>
												{item.priority == 3 && <Chip label="Urgent" className={classes.chipRed} /> }
												{item.priority == 2 && <Chip label="High" className={classes.chipYellow} color="default" /> }
												{item.priority == 1 && <Chip label="Medium"  color="default" /> }
												{item.priority == 0 && <Chip label="Medium"  color="default" /> }
										</ListItemText>
										<ListItemText primary={`${moment(item.deadline).format('Do MMM - ddd')}`} />
										<ListItemText>

											{item.status == 4 && <Chip label="Later Followup" className={classes.chipYellow}  color="default" /> }
												{item.status == 3 && <Chip label="Completed" className={classes.chipGreen}  color="secondary" /> }
												{item.status == 2 && <Chip label="On Progress" className={classes.chipYellow} color="default" /> }
												{item.status == 1 && <Chip label="Pending"  color="default" /> }
												{item.status == 0 && <Chip label="Pending"  color="default" /> }
										</ListItemText>			

										{item.over_due ? (
											<Chip  label="Over Due!!" className={classes.chipRed}/>
										): (<Chip  label="Waiting" />)}
									</div>
								</ListItem>
								</div>
								
							))}
						</div>
					<Divider />	
				</ul>
				</li>
			))}
		</List>);
	}
}

ReportTable.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ReportTable);
