import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import classes from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';
import BackIcon from '@material-ui/icons/KeyboardArrowLeft';

const styles = (theme) => ({
	card: {
		flex: 1,
		backgroundColor: 'none'
	},
	title: {
		marginBottom: 16,
		fontSize: 14
	},
	media: {
		height: 0,
		paddingTop: '2%' // 16:9
	},
	actions: {
		display: 'flex'
	},
	expand: {
		transform: 'rotate(0deg)',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest
		}),
		marginLeft: 'auto'
	},
	expandOpen: {
		transform: 'rotate(180deg)'
	},
	avatar: {
		backgroundColor: red[500]
	}
});

class CardDiv extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			title: props.title,
			isAdd: props.isAdd,
			isBack: props.isBack
		};

		this.addButton = this.addButton.bind(this);
	}

	addButton() {}

	render() {
		const { classes } = this.props;

		return (
			<div>
				<Card className={classes.card}>
					<CardHeader action={this.addButton()} title={this.state.title} />
					<CardContent>
						<Typography component="p">{this.props.children}</Typography>
					</CardContent>
				</Card>
			</div>
		);
	}
}

CardDiv.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CardDiv);
