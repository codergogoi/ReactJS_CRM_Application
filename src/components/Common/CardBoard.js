import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';

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
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		minHeight: 300,
		backgroundColor: '#FFFF',
		width: '100%',
		borderRadius: 10,
		padding: 10,
		paddingLeft: 20,
		paddingRight: 20,
		
	},
	 
});

class CardBoard extends React.Component {
	constructor(props) {
		super(props);
	}
 
	render() {
		const { classes, children } = this.props;
		return (
			<div  className={classes.card}>
				{children}
			</div>
		);
	}
}

CardBoard.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CardBoard);
