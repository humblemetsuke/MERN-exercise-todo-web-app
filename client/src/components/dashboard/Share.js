import { FormControl, Grid, InputLabel, List, ListItem, ListItemText, MenuItem, Select, Typography, withStyles } from '@material-ui/core'
import React, { Component } from 'react'

const styles = theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 250,
    }
})

export class Share extends Component {
    render() {
        const { classes } = this.props;
        const users = this.props.users;
        const goals = this.props.goals;
        return (
            <Grid container>
                <Grid item xs={4}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Select a person</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.props.user}
                            onChange={this.props.handleChange}
                        >
                        {
                            users.map((user,index) => {
                                return(
                                    <MenuItem value={user._id} key={index}>{user.name}</MenuItem>
                                )
                            })
                        }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={8}>
                    <Grid item xs={12} style={{marginTop: '20px'}}>
                        <Typography>
                            Training goals(week {this.props.week.split("-")[1]}, {this.props.week.split("-")[0]})
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <List dense={true}>
                        {
                            goals.length>0 && goals.map((goal, i) => {
                                return(
                                    <ListItem key={i}>
                                        <ListItemText>
                                            {goal.goal}
                                        </ListItemText>
                                    </ListItem>
                                )
                            })
                        }
                        </List>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(Share)
