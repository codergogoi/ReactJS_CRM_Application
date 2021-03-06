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
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

function getSorting(order, orderBy) {
	return order === 'desc'
		? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
		: (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

const columnData = [
	{ id: 'region', numeric: false, disablePadding: false, label: 'Region' },
	{ id: 'region_desc', numeric: false, disablePadding: false, label: 'Region Description' },
    { id: 'created', numeric: false, disablePadding: false, label: 'Created Date' },
    { id: 'created_by', numeric: false, disablePadding: false, label: 'Created By' },
	{ id: 'delete', numeric: false, disablePadding: false, label: 'Action' }
];

class RegionTableHeader extends React.Component {
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

RegionTableHeader.propTypes = {
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
	}
});

class RegionTable extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			order: 'desc',
			orderBy: 'ecb_id',
			selected: [],
			data: props.data,
			page: 0,
			rowsPerPage: 5
		};
	}

	handleRequestSort = (event, property) => {
		const orderBy = property;
		let order = 'desc';

		if (this.state.orderBy === property && this.state.order === 'desc') {
			order = 'asc';
		}

		this.setState({ order, orderBy });
	};

	onCloneClick = (offer) => {
		this.props.onEditItem(offer);
	};

	handleDelete = (item) => {
		this.props.onDeleteRegion(item);
	};

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

	isSelected = (id) => this.state.selected.indexOf(id) !== -1;

	render() {
		const { classes } = this.props;
		const { order, orderBy, selected, rowsPerPage, page } = this.state;

		const { data, isEdit } = this.props;

		const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

		return (
			<Paper className={classes.root}>
				<div className={classes.tableWrapper}>
					<Table className={classes.table} aria-labelledby="tableTitle">
						<RegionTableHeader
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={this.handleSelectAllClick}
							onRequestSort={this.handleRequestSort}
							rowCount={data.length}
						/>
						<TableBody>
							{data
								.sort(getSorting(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((n) => {
									return (
										<TableRow hover role="checkbox" tabIndex={-1} key={n.id}>
											<TableCell>{n.region}</TableCell>
											<TableCell>{n.region_desc}</TableCell>
											<TableCell>{n.created}</TableCell>
                                            <TableCell>{n.created_by}</TableCell>
											<TableCell>
												<IconButton
													className={classes.button}
													mini
													aria-label="Edit"
													onClick={(event) => this.handleDelete(n)}
												>
													<DeleteIcon />
												</IconButton>
												<IconButton
													className={classes.button}
													mini
													aria-label="Edit"
													onClick={(event) => this.onCloneClick(n)}
												>
													<EditIcon />
												</IconButton>
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
					count={data.length}
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

RegionTable.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RegionTable);
