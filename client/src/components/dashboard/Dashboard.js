import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { userFetchAll } from "../../actions/authActions";
import { ownGoalFetch, goalCreate, goalUpdate, goalDelete, otherGoalFetch } from "../../actions/goalActions";
import { Container, Divider, Grid, Paper, Typography, withStyles } from "@material-ui/core";
import Welcome from "./Welcome";
import Goal from "./Goal";
import Achievement from "./Achievement";

import weekNumbers from "../functions/weeknumber";
import Share from "./Share";

const styles = theme => ({
  root: {
    paddingTop: '80px'
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: '0px'
  },
  panelBody: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(3)
  }
})

class Dashboard extends Component {
  constructor(props){
      super(props);
      this.state = {
          goal: "",
          edit: "",
          goals: [],
          date: new Date(),
          users: [],
          user: "",
          linkedUser: "",
          otherGoals:[]
      }
  }

  componentDidMount(){
    this.props.ownGoalFetch({userId: this.props.auth.user.id, week: weekNumbers(this.state.date)});
    this.props.userFetchAll();
  }
  componentWillReceiveProps(nextProps){
    const { users } = nextProps.auth;
    const { user } = nextProps.auth
    for (let i = 0; i < users.length; i++) {
      if (users[i]._id==user.id) {
        users.splice(i, 1);
      }
    }
    this.setState({
      goals: nextProps.goals,
      users: users,
      otherGoals: nextProps.otherGoals
    })
  }
  // Goal Panel
  onChange = e => {
      this.setState({[e.target.name]: e.target.value});
  }
  addGoal = () => {
      let newGoal = {
        goal: this.state.goal,
        isComplete: false,
        isEdit: false,
        createTime: new Date(),
        completeTime: "",
        week: weekNumbers(this.state.date), //2021-3
        userId: this.props.auth.user.id,
        userName: this.props.auth.user.name
      }
      if (newGoal.goal!="") {
          const goals = this.state.goals.concat(newGoal);
          this.setState({
              edit: "",
              goal: "",
              goals: goals
          })
      }
      this.props.goalCreate(newGoal);
  }
  deleteGoal = (index, _id) =>{
      const goals = this.state.goals;
      goals.splice(index, 1);
      this.setState({
          goals: goals
      })
      this.props.goalDelete(_id);
  }
  editGoal = (index, _id) => {
      // previous data view
      const goals = this.state.goals.slice();
      this.setState({
          edit: goals[index].goal
      })
      // view update
      goals[index].isEdit = !goals[index].isEdit;
      goals[index].goal = this.state.edit;

      this.setState({
          goals: goals
      })
      // database update
      if (!goals[index].isEdit) {
        let updateGoal = {
          goal: this.state.edit,
          isComplete: false,
          isEdit: false,
          createTime: new Date(),
          completeTime: "",
          week: weekNumbers(this.state.date), //2021-3
          userId: this.props.auth.user.id,
          userName: this.props.auth.user.name
        }
        this.props.goalUpdate(_id, updateGoal);
      }
  }
  completeGoal = (index, _id) => {
    const goals = this.state.goals.slice();
    const now = new Date();
    goals[index].isComplete = !goals[index].isComplete;
    goals[index].time = now.toUTCString();
    this.setState({
      goals: goals
    })
    // database update
    let updateGoal = {
      goal: goals[index].goal,
      isComplete: true,
      isEdit: false,
      createTime: new Date(),
      completeTime: new Date(),
      week: weekNumbers(this.state.date), //2021-3
      userId: this.props.auth.user.id,
      userName: this.props.auth.user.name
    }
    this.props.goalUpdate(_id, updateGoal);
  } // Goal panel

  // welcome panel
  onChangeDate = e => {
    this.setState({
      date: e
    })
    this.props.ownGoalFetch({userId: this.props.auth.user.id, week: weekNumbers(e)});
    this.props.otherGoalFetch({userId: this.state.linkedUser, week: weekNumbers(e)});
  }   // welcome panel

  // share panel
  onChangeAnother = (event) => {
    this.setState({
      linkedUser: event.target.value
    })
    this.props.otherGoalFetch({userId: event.target.value, week: weekNumbers(this.state.date)});
    // console.log(this.props.otherGoals)
  };  // share panel
  

  render() {
    const { user } = this.props.auth;
    const { classes } = this.props;
    return (
      <Container>
        <Grid 
          className={ classes.root }
          container
          direction="row"
          justify="space-between"
          alignItems="flex-start"
        >
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <Typography variant='h6'>
                Welcome {user.name.split(" ")[0]} 
              </Typography>
              <Divider />
              <div className={classes.panelBody}>
                <Welcome
                  getDate={this.onChangeDate}
                  value={this.state.date}
                />
              </div>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <Typography variant='h6'>
                Training Goal 
              </Typography>
              <Divider />
              <div className={classes.panelBody}>
                <Goal
                  handleChange={this.onChange}
                  handleAdd={this.addGoal}
                  handleEdit={this.editGoal}
                  handleDelete={this.deleteGoal}
                  handleComplete={this.completeGoal}
                  goals={this.state.goals}
                  goal={this.state.goal}
                  edit={this.state.edit}
                  week={weekNumbers(this.state.date)}           
                />
              </div>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <Typography variant='h6'>
                Achievement
              </Typography>
              <Divider />
              <div className={classes.panelBody}>
                <Achievement
                  goals={this.state.goals}
                />
              </div>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography variant='h6'>
                Other people goals
              </Typography>
              <Divider />
              <div className={classes.panelBody}>
                <Share 
                  handleChange={this.onChangeAnother}
                  users={this.state.users}
                  user={this.state.linkedUser}
                  goals={this.state.otherGoals}
                  week={weekNumbers(this.state.date)}
                />
              </div>
            </Paper>
          </Grid>

        </Grid>
      </Container>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  ownGoalFetch: PropTypes.func.isRequired,
  goalCreate: PropTypes.func.isRequired,
  goalDelete: PropTypes.func.isRequired,
  goalUpdate: PropTypes.func.isRequired,
  userFetchAll: PropTypes.func.isRequired,
  otherGoalFetch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  goals: state.goals.list,
  otherGoals: state.goals.otherList,
});

export default connect(
  mapStateToProps,
  { ownGoalFetch, goalCreate, goalDelete, goalUpdate, userFetchAll, otherGoalFetch }
)(withStyles(styles)(Dashboard));
