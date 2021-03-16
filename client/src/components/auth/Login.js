import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import { Button, Grid, Paper, TextField, withStyles } from "@material-ui/core";

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

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

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

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;
    const { classes } = this.props;
    console.log(errors)
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
                name='email'
                variant='outlined'
                size='small'
                label='Email'
                value={this.state.email}
                onChange={this.onChange}
                error={errors.email || errors.emailnotfound}
                helperText={(errors.email || errors.emailnotfound)?`${errors.email+errors.emailnotfound}`:''}
                fullWidth     
              />
              <TextField
                name='password'
                type='password'
                variant='outlined'
                size='small'
                label='Password'
                value={this.state.password}
                onChange={this.onChange}
                error={errors.password || errors.passwordincorrect}
                helperText={(errors.password || errors.passwordincorrect)?`${errors.password+errors.passwordincorrect}`:''}
                fullWidth
              />
              <p className="">
                Don't have an account? <Link to="/register">Register</Link>
              </p>              
              <Button
                variant='contained'
                color='primary'
                type='submit'
              >Login</Button>
            </form>
          </Paper>
          
        </Grid>        
      </Grid>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withStyles(styles)(Login));
