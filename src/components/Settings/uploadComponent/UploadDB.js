import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CardBoard from '../../Common/CardBoard';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Grid, CircularProgress, LinearProgress } from '@material-ui/core';
import axios from 'axios';
import { UPLOAD_URL } from '../../../store/actions/AppConst'
import { connect } from 'react-redux';
import Alert from '../../Common/Alert';


import { ExportDatabase, DismissAlert } from '../../../store/actions/SettingsActions';


const styles = theme => ({
  root: {
    width: '90%',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
  uploadContainer:  {
    padding: '20px',
    width: '100%',
    height: '300px',
    display: 'flex',
  },
  alertText: {
    display: 'flex',
    padding: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '150%',
    fontWeight: 'bold',
    color: '#9F1818'
  }

});

function getSteps() {
  return ['Import DB XLSX File', 'Process Data'];
}


class UploadDB extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      activeStep: 0,
      file: '',
      isUploading: false,
      uploaded: false,
      exported: false
    }
  } 

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
    
    this.props.ExportDatabase();

  };

 
  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  onTapFileBrowse = (e) => {
    this.refs.upload.click();
  }
 

  async onSubmit(e){
    e.preventDefault() 
    let res = await this.uploadFile(this.state.file);
    this.setState({ isUploading: false, uploaded: true});
}
onChange = (e) => {
    this.setState({file:e.target.files[0]});
    this.setState({
      isUploading: true
    });
    const button = this.refs.submitnow;
    setTimeout(function() { 
      button.click();
    }, 1000);

  }

async uploadFile(file){

  let app_token = localStorage.getItem('app_token');

  const formData = new FormData();

  formData.append('file',file)

  return  await axios.post(UPLOAD_URL+'upload-db', formData,{
      headers: {
          'Authorization':  app_token,
          'content-type': 'multipart/form-data'
      }
  });
}

  uploadUI = () => {
    
    const { classes } = this.props;

    return (
        <div className={classes.uploadContainer}>
          
          <Grid container spacing={24}>
            <Grid item xs={1}>
                <form onSubmit={ this.onSubmit.bind(this) } ref='uploadform'>
                <Fab color="primary" aria-label="Add" onClick={this.onTapFileBrowse.bind(this)} className={classes.fab}>
                    <AddIcon />
                </Fab>
                <input type="file" ref='upload' onChange={ this.onChange.bind(this)} style={{ display: 'none'}} />
                <button type="submit" ref='submitnow'  style={{ display: 'none'}} />
              </form>
            </Grid>
            <Grid item xs={1}>
                {this.state.isUploading && <CircularProgress className={classes.progress} /> }
            </Grid>
          </Grid>
        </div>
    );

  }

  exportUI = () => {

    const { classes } = this.props;

    return (
        <div className={classes.uploadContainer}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
                {!this.props.isExported && !this.state.exported ?
                <div> 
                    <LinearProgress /> 
                    <div className={classes.alertText}>
                      Please wait while importing Database. <br/>Do not close this window until finished the process!
                    </div>
                </div> :
                   <div className={classes.alertText}>
                      DB Process is Completed!
                   </div>
              }  
             </Grid>
          </Grid>
      </div>
    );
  }


  UISwitch =(value) =>{

    if(value == 1){
      return this.exportUI();
    }else{
      return this.uploadUI();
    }
  }

  //ALERT
	onDismiss = () => {
    this.setState({
      exported: true
    })
    this.props.DismissAlert();
    
	};

	onOkay = () => {
    this.setState({
      exported: true
    })
		this.props.DismissAlert();
	};


  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>

        <Alert
            open={this.props.isExported}
            onCancel={this.onOkay.bind(this)}
            onOkay={this.onOkay.bind(this)}
            title={"DB Import"}
            msg={"DB Importing Completed!"}
          />


        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                
                <Typography>
                    {this.UISwitch(activeStep)}
                </Typography>
                
                <div className={classes.actionsContainer}>
                  <div>
                    {this.state.uploaded &&  activeStep == 0 &&
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                    >
                      Export
                    </Button>}
                    
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </div>
    );
  }
}

UploadDB.propTypes = {
  classes: PropTypes.object,
};

const mapPropsToState = (state) => ({
  isExported: state.settingsReducer.isExported
});


export default connect(mapPropsToState, { ExportDatabase, DismissAlert })(withStyles(styles)(UploadDB));