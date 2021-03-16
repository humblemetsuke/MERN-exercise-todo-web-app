import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import { Grid, withStyles, Paper, TextField, Button } from "@material-ui/core";

const styles = theme => ({
  pos: {
    paddingTop: '96px'
  },
  paper: {
    padding: theme.spacing(3)
  },
  root: {
    '& .MuiTextField-root': {
      marginTop: theme.spacing(3),
      textAlign: 'center'
    },
  },
})
class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;
    const {classes} = this.props;

    return (
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className = {classes.pos}
        >
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <form noValidate onSubmit={this.onSubmit} className={classes.root}>
                  <TextField 
                    name='name'
                    variant='outlined'
                    size='small'
                    label='Name'
                    value={this.state.name}
                    onChange={this.onChange}
                    fullWidth
                    error={errors.name}
                    helperText={errors.name?`${errors.name}`:''}
                  />
                  <TextField 
                    name='email'
                    variant='outlined'
                    size='small'
                    label='Email'
                    value={this.state.email}
                    onChange={this.onChange}
                    fullWidth
                    error={errors.email}
                    helperText={errors.email?`${errors.email}`:''}
                  />
                  <TextField 
                    name='password'
                    variant='outlined'
                    size='small'
                    type='password'
                    label='Password'
                    value={this.state.password}
                    onChange={this.onChange}
                    fullWidth
                    error={errors.password}
                    helperText={errors.password?`${errors.password}`:''}
                  />
                  <TextField 
                    name='password2'
                    variant='outlined'
                    size='small'
                    type='password'
                    label='Confirm Password'
                    value={this.state.password2}
                    onChange={this.onChange}
                    fullWidth
                    error={errors.password2}
                    helperText={errors.password2?`${errors.password2}`:''}
                  />                  
                  <p className="grey-text text-darken-1">
                    Already have an account? <Link to="/login">Log in</Link>
                  </p>
                  <Button
                    variant='contained'
                    color='primary'
                    type='submit'
                  >Sign up</Button>
              </form>
            </Paper>
          </Grid>  
        </Grid>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(withStyles(styles)(Register)));
