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

	titleHeader: {
		display: 'flex',
		flexDirection: 'row',
		height: 60,
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#FFFF',
		borderRadius: 10,
	},
	content:{
		marginTop: 20,
		width: '100%',
	},
	title:{
		display: 'flex',
		marginLeft: 20,
		width: 400,
		height: 60,
		justifyContent: 'space-between',
		alignItems: 'center',
		color: '#900C3F',
		fontSize: 26,
	},
	btnAction:{
		width: 80,
		height: 60,
		marginRight: 50,
	},
	card: {
		flex: 1,
		backgroundColor: '#ebeef1',
		},
	 
	fab:{
		backgroundColor: '#900C3F'
	}
});

class CardDiv extends React.Component {
	constructor(props) {
		super(props);
	}

	onTapBack = () => {
		this.props.onTapBack();
	}

	onTapAdd = () => {
		this.props.onTapAdd();
	}


	onDisplayBackButton = () =>{

		const { classes, isAdd, isBack } = this.props;

		if(isAdd){
			return (
				<div className={classes.btnAction}>
					<Fab color="secondary" aria-label="Edit" className={classes.fab} onClick={this.onTapAdd.bind(this)}>
						<AddIcon />
					</Fab>
				</div>
			);
		}else if(isBack){
			return (
				<div className={classes.btnAction}>
					<Fab color="secondary" aria-label="Edit" className={classes.fab} onClick={this.onTapBack.bind(this)}>
						<BackIcon />
					</Fab>
				</div>
			);
		}else{
			return('');
		}
	}


	render() {
		const { classes, title, isAdd, isBack } = this.props;
		return (
			<div  className={classes.card}>
				<div className={classes.titleHeader}>
					<div className={classes.title}>{title} </div>
					{this.onDisplayBackButton()}
				</div>
				<div className={classes.content}>
					<Typography component="p">{this.props.children}</Typography>
				</div>
				
			</div>
		);
	}
}

CardDiv.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CardDiv);
