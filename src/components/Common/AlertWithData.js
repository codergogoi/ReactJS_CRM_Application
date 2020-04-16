
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Geocode from "react-geocode";
import { MAPKEY } from '../../store/actions/AppConst';

import DialogContentText from '@material-ui/core/DialogContentText';

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit,
  },
}))(MuiDialogActions);

class AlertWithData extends React.Component {

  constructor(props){
    super(props);
    this.state = {

    }

    Geocode.setApiKey(MAPKEY);
 
    // set response language. Defaults to english.
    Geocode.setLanguage("en");
    
    // set response region. Its optional.
    // A Geocoding request with region=es (Spain) will return the Spanish city.
    Geocode.setRegion("es");
  }


  componentWillMount(){

    
  }


  onCodeToAddress = (lat, lng, i) => {

    Geocode.fromLatLng(lat, lng).then(
      response => {
        const address = response.results[0].formatted_address;
        this.setState({[`place_${i}`]: address});
      },
      error => {
        console.error(error);
      }
    );

  }


	render() {

    const { locations } = this.props;
  
		return (
			<div>
				<Dialog
					open={this.props.open}
					onClose={this.props.onDismiss}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
					
					<DialogContent>
						
            <Typography gutterBottom>

              {locations.map((item, i) => {
                return (
                  <ListItem button>
                      <ListItemText primary={`${item.visited}`} secondary={this.state[`place_${i}`]}  />
                      {this.state[`place_${i}`] === undefined && this.onCodeToAddress(item.latitude, item.longitude, i)}
                  </ListItem>
                );
              })}
              
						</Typography>
						 
					</DialogContent>

					<DialogActions>		

            <Button onClick={this.props.onViewOnMap} color="primary" >
							View on Map
						</Button>

						<Button onClick={this.props.onOkay} color="primary" autoFocus>
							Close
						</Button>
            
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

export default AlertWithData;
