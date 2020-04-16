import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import moment from 'moment';
import Avatar from '@material-ui/core/Avatar';
import tiny from '@material-ui/core/colors/green';
import little from '@material-ui/core/colors/deepOrange';
//Icons
import CopyIcon from '@material-ui/icons/ContentCopy';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import EditIcon from '@material-ui/icons/Edit';

import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Chip from '@material-ui/core/Chip';

function getSorting(order, orderBy) {
	return order === 'desc'
		? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
		: (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

const columnData = [
	{ id: 'title', numeric: false, disablePadding: false, label: 'Title' },
	{ id: 'deadline', numeric: false, disablePadding: false, label: 'Completion Date' },
	{ id: 'client_name', numeric: false, disablePadding: false, label: 'Client Name' },
	{ id: 'contact_person', numeric: false, disablePadding: false, label: 'Contact Person' },
	{ id: 'emp_name', numeric: false, disablePadding: false, label: 'Assigned To' },
	{ id: 'status', numeric: false, disablePadding: false, label: 'Status' },
	{ id: 'more', numeric: false, disablePadding: false, label: 'Action' }
];

class TaskTableHeader extends React.Component {
	createSortHandler = (property) => (event) => {
		this.props.onRequestSort(event, property);
	};

	render() {
		const { order, orderBy } = this.props;

		return (
			<TableHead>
				<TableRow>
					{columnData.map((column) => {
						return (
							<TableCell
								key={column.id}
								numeric={column.numeric}
								padding={column.disablePadding ? 'none' : 'default'}
								sortDirection={orderBy === column.id ? order : false}
							>
								<Tooltip
									title="Sort"
									placement={column.numeric ? 'bottom-end' : 'bottom-start'}
									enterDelay={300}
								>
									<TableSortLabel
										active={orderBy === column.id}
										direction={order}
										onClick={this.createSortHandler(column.id)}
									>
										{column.label}
									</TableSortLabel>
								</Tooltip>
							</TableCell>
						);
					}, this)}
				</TableRow>
			</TableHead>
		);
	}
}

TaskTableHeader.propTypes = {
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.string.isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired
};

const toolbarStyles = (theme) => ({
	root: {
		paddingRight: theme.spacing.unit
	},
	highlight:
		theme.palette.type === 'light'
			? {
					color: theme.palette.secondary.main,
					backgroundColor: lighten(theme.palette.secondary.light, 0.85)
				}
			: {
					color: theme.palette.text.primary,
					backgroundColor: theme.palette.secondary.dark
				},
	spacer: {
		flex: '1 1 100%'
	},
	actions: {
		color: theme.palette.text.secondary
	},
	title: {
		flex: '0 0 auto'
	}
});

let EnhancedTableToolbar = (props) => {
	const { numSelected, classes } = props;

	return (
		<Toolbar
			className={classNames(classes.root, {
				[classes.highlight]: numSelected > 0
			})}
		>
			<div className={classes.title}>
				{numSelected > 0 ? (
					<Typography color="inherit" variant="subheading">
						{numSelected} selected
					</Typography>
				) : (
					<Typography variant="title" id="tableTitle" />
				)}
			</div>
			<div className={classes.spacer} />
			<div className={classes.actions}>
				{numSelected > 0 ? (
					<Tooltip title="Delete">
						<IconButton aria-label="Delete">
							<DeleteIcon />
						</IconButton>
					</Tooltip>
				) : (
					<Tooltip title="Filter list">
						<IconButton aria-label="Filter list">
							<FilterListIcon />
						</IconButton>
					</Tooltip>
				)}
			</div>
		</Toolbar>
	);
};

EnhancedTableToolbar.propTypes = {
	classes: PropTypes.object.isRequired,
	numSelected: PropTypes.number.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = (theme) => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 2,
		boxShadow: 'none'
	},
	cat: {
		display: 'flex',
		flexDirection: 'row'
	},
	button: {
		width: 40,
		height: 40
	},
	activeUser: {
		margin: 2,
		width: 16,
		height: 16,
		fontSize: 10,
		color: '#fff',
		backgroundColor: tiny[500]
	},
	pendingUser: {
		margin: 2,
		width: 16,
		height: 16,
		fontSize: 10,
		color: '#fff',
		backgroundColor: '#FF0000'
	},
	disableUser: {
		margin: 2,
		width: 16,
		height: 16,
		fontSize: 10,
		color: '#fff',
		backgroundColor: little[500]
	},

	table: {
		minWidth: 1020,
		elevation: 0
	},
	tableWrapper: {
		overflowX: 'auto'
	},
	chipGroup:{
		margin: 5,
		backgroundColor: '#AEB6BF'
	},
	chipSelf:{
		margin: 5,
		backgroundColor: '#DC7633'
	}
});

class TaskTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			order: 'desc',
			orderBy: 'ecb_id',
			selected: [],
			paymentModes: [],
			page: 0,
			rowsPerPage: 5
		};
	}

	componentWillMount() {
		this.setState({
			paymentModes: this.props.data
		});
		console.log('Component will mount ' + JSON.stringify(this.state));
	}

	handleRequestSort = (event, property) => {
		const orderBy = property;
		let order = 'desc';

		if (this.state.orderBy === property && this.state.order === 'desc') {
			order = 'asc';
		}

		this.setState({ order, orderBy });
	};

	handleClick = (event, employee) => {
		this.props.onEditUser(employee);
	};

	onDeleteSDK = (sdk) => {
		this.props.onDeleteSDK(sdk);
	};

	onEditTask = (task) => {
		this.props.onEditTask(task);
	};


	onTapGroupTaskView = (task) => {

		this.props.onTapGroupTask(task);
	}

	handleChangePage = (event, page) => {
		this.setState({ page });
	};

	handleChangeRowsPerPage = (event) => {
		this.setState({ rowsPerPage: event.target.value });
	};

	activeCheck = (value) => {
		const { classes } = this.props;
		if (value === 'YES') {
			return <Avatar className={classes.activeUser}>A</Avatar>;
		} else {
			return <Avatar className={classes.pendingUser}>P</Avatar>;
		}
	};

	onTapViewDetails = (task) => {
		this.props.onTapViewDetails(task);
	}
	 

	isSelected = (id) => this.state.selected.indexOf(id) !== -1;

	selectedMode = (id) => {
		const { mode } = this.state.paymentModes[id];
		return mode.value;
	};

	render() {
		const { classes, paymentModes } = this.props;
		const { order, orderBy, selected, rowsPerPage, page } = this.state;

		const emptyRows = rowsPerPage - Math.min(rowsPerPage, paymentModes.length - page * rowsPerPage);

		return (
			<Paper className={classes.root}>
				<div className={classes.tableWrapper}>
					<Table className={classes.table} aria-labelledby="tableTitle">
						<TaskTableHeader
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={this.handleSelectAllClick}
							onRequestSort={this.handleRequestSort}
							rowCount={paymentModes.length}
						/>

						<TableBody>
							{paymentModes
								.sort(getSorting(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((n) => {
									return (
 
										<TableRow hover role="checkbox" tabIndex={-1} key={n.id}>
											<TableCell>
											{ n.title}
											{n.grouped == true && <Chip
													onClick={(event) => this.onTapGroupTaskView(n)}
													label="Group Task"
													className={classes.chipGroup}
												/>}
											{n.self_task == true && <Chip
													label="Self Task"
													className={classes.chipSelf}
												/>}	
											</TableCell>

											<TableCell>{moment(n.deadline).format('Do MMM YYYY') }</TableCell>
											<TableCell>
												{n.client_name}
											</TableCell>
											<TableCell>
												{n.contact_person}
											</TableCell>
											<TableCell>
												{n.assigned_emp}
											</TableCell>
											 
											<TableCell>
												{n.status == 4 && <Chip label="Later Followup" className={classes.chip}  color="default" /> }
												{n.status == 3 && <Chip label="Completed" onClick={(event) => this.onTapViewDetails(n)} className={classes.chip}  color="secondary" /> }
												{n.status == 2 && <Chip label="On Progress" className={classes.chip} color="default" /> }
												{n.status == 1 && <Chip label="Pending" className={classes.chip} color="default" /> }
												{n.status == 0 && <Chip label="Pending" className={classes.chip} color="default" /> }
											</TableCell>
											<TableCell>
												<IconButton
													className={classes.button}
													mini
													aria-label="Edit"
													onClick={(event) => this.onEditTask(n)}
												>
													<EditIcon />
												</IconButton>
												{n.grouped == true ? ("") : (<IconButton
													className={classes.button}
													mini
													aria-label="Edit"
													onClick={(event) => this.onDeleteSDK(n)}
												>
													<DeleteIcon />
												</IconButton>)}
												
											</TableCell>
										</TableRow>
									);
								})}
							{emptyRows > 0 && (
								<TableRow style={{ height: 49 * emptyRows }}>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
				<TablePagination
					component="div"
					count={paymentModes.length}
					rowsPerPage={rowsPerPage}
					page={page}
					backIconButtonProps={{
						'aria-label': 'Previous Page'
					}}
					nextIconButtonProps={{
						'aria-label': 'Next Page'
					}}
					onChangePage={this.handleChangePage}
					onChangeRowsPerPage={this.handleChangeRowsPerPage}
				/>
			</Paper>
		);
	}
}

TaskTable.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TaskTable);
