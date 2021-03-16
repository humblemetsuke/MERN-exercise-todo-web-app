import React, { Component } from "react";
import { Link } from "react-router-dom";

import store from "../../store";
import { logoutUser } from "../../actions/authActions";
import { Grid, AppBar, Button, withStyles } from "@material-ui/core";

const styles = theme => ({
  logo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    margin: theme.spacing(1),
    float: 'right'
  }
})

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    store.dispatch(logoutUser());
  };
  render() {
    const { classes } = this.props;
    return (
        <AppBar position="fixed" color='inherit'>
          <Grid container>
            <Grid item xs={2} className={classes.logo}>
              <Link
                to="/"
              >
                <img src={process.env.PUBLIC_URL + '/logo.png'} style={{width: '45px'}} /> 
              </Link>
            </Grid>
            <Grid item xs={10}>
              {
                localStorage.jwtToken?
                  <Button
                    className={classes.button}
                    onClick={this.onLogoutClick}
                  >Logout</Button>
                  :
                  <>
                    <Button className={classes.button}>
                      <Link
                        to="/register"
                        style={{
                          textDecoration: 'none'
                        }}
                      >
                        Register
                      </Link>
                    </Button>
                    <Button className={classes.button}>
                      <Link
                        to="/login"
                        style={{
                          textDecoration: 'none'
                        }}
                        className="btn btn-large btn-flat waves-effect white black-text"
                      >
                        Log In
                      </Link>
                    </Button>
                  </>
              }
              
            </Grid>
          </Grid>
        </AppBar>
    );
  }
}

export default withStyles(styles)(Navbar);
